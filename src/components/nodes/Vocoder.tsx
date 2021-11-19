/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Node from "components/Node";
import { nodeCleanup } from "components/Nodes";
import { useNode } from "context/NodeContext";
import useAnalyserNode from "hooks/nodes/useAnalyserNode";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import useBiquadFilterNode from "hooks/nodes/useBiquadFilterNode";
import useGainNode from "hooks/nodes/useGainNode";
import useAnimationFrame from "hooks/useAnimationFrame";
import React, { useCallback, useEffect, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import { TBiquadFilterType } from "utils/audioContext";
import { generateArray } from "utils/collections";
import { Parameters } from "worklets/envelope-follower.types";

interface FilterDescription {
  frequency: number;
  type: TBiquadFilterType;
  gain: number;
  q: number;
}

const FFT_SIZE = 4096;
const FFT_SIZE_EXP = Math.log2(FFT_SIZE);
const BIN_COUNT = FFT_SIZE / 2;

const FILTER_BANDS: FilterDescription[] = [
  {
    frequency: 3330,
    type: "highpass",
    gain: -2.13,
    q: 0.88,
  },
  { frequency: 2546, type: "bandpass", gain: -2.8, q: 4.48 },
  { frequency: 2001, type: "bandpass", gain: -3.15, q: 5.16 },
  { frequency: 1495, type: "bandpass", gain: -3.4, q: 3.2 },
  { frequency: 1013, type: "bandpass", gain: -2.8, q: 3.9 },
  { frequency: 720, type: "bandpass", gain: -2.8, q: 3.7 },
  { frequency: 542, type: "bandpass", gain: -3.12, q: 3.75 },
  { frequency: 395, type: "bandpass", gain: -2.5, q: 3.7 },
  { frequency: 285, type: "bandpass", gain: -3, q: 3.55 },
  { frequency: 208, type: "bandpass", gain: -2.4, q: 4 },
  { frequency: 154, type: "bandpass", gain: -2.4, q: 2.96 },
  { frequency: 101, type: "lowpass", gain: -2.55, q: 0.55 },
];

export function Vocoder({ id, type }: NodeProps) {
  // Interface
  const modulationNode = useGainNode(`${id}_modulate`, {});
  const carrierNode = useGainNode(`${id}_carrier`, {});
  const outputNode = useGainNode(`${id}_output`, {});

  const modulatorNodes = FILTER_BANDS.map(({ frequency, type, gain, q }) => {
    // While illegal by rules of hooks, the bands array is never changed in
    // runtime so hook call order is preserved
    const gainNode = useGainNode(`${id}_modulate_gain_${frequency}`, {
      gain: 1 / gain,
    });

    const biquadNode = useBiquadFilterNode(`${id}_modulate_filter1_${frequency}`, {
      frequency,
      gain: 0,
      type,
      Q: q,
    });

    const envelopeFollower = useAudioWorkletNode(
      `${id}_modulate_envelope_${frequency}`,
      "envelope-follower",
      {
        parameterData: {
          [Parameters.AttackTime]: 0,
          [Parameters.ReleaseTime]: 0.0003,
        },
      }
    );

    return {
      filter: biquadNode,
      gain: gainNode,
      envelopeFollower: envelopeFollower,
    };
  });

  const carrierNodes = FILTER_BANDS.map(({ frequency, type, q }) => {
    // While illegal by rules of hooks, the bands array is never changed in
    // runtime so hook call order is preserved
    const filterNode1 = useBiquadFilterNode(`${id}_carrier_filter1_${frequency}`, {
      frequency,
      gain: 0,
      type,
      Q: q,
    });
    const filterNode2 = useBiquadFilterNode(`${id}_carrier_filter2_${frequency}`, {
      frequency,
      gain: 0,
      type,
      Q: q,
    });

    const gainNode = useGainNode(`${id}_carrier_gain_${frequency}`, {
      gain: 0,
    });

    const analyserNode = useAnalyserNode(`${id}_carrier_analyser_${frequency}`, {
      fftSizeExp: FFT_SIZE_EXP,
    });

    return {
      filter1: filterNode1,
      filter2: filterNode2,
      gain: gainNode,
      analyser: analyserNode,
    };
  });

  const flatModulatorNodes = modulatorNodes.map(nodes => Object.values(nodes)).flat(1);
  const flatCarrierNodes = carrierNodes.map(nodes => Object.values(nodes)).flat(1);

  useEffect(() => {
    for (const { gain, filter, envelopeFollower } of modulatorNodes) {
      // Connect up the chain
      const binModulatorNodes = [filter, gain, envelopeFollower];
      binModulatorNodes.reduce((acc, node) => {
        return acc ? (node ? acc.connect(node) : acc) : node;
      });
      modulationNode.connect(binModulatorNodes[0]!);
    }

    for (const [i, { filter1, filter2, gain, analyser }] of carrierNodes.entries()) {
      const binCarrierNodes = [filter1, filter2, gain, analyser];

      // Connect up the chain
      binCarrierNodes.reduce((acc, node) => {
        return !!acc ? (node ? acc.connect(node) : acc) : node;
      });

      // Connect the carrier to the chain
      carrierNode.connect(filter1);

      // Modulate the carrier gain from the equivalent modulation node
      modulatorNodes[i].envelopeFollower.connect(gain.gain);

      // And connect the carrier to the output
      gain.connect(outputNode);
    }
  }, [modulationNode, carrierNode, outputNode, ...flatModulatorNodes, ...flatCarrierNodes]);

  useNode(
    id,
    () => ({
      carrier: carrierNode,
      modulation: modulationNode,
      input: undefined,
      output: outputNode,
      stop() {},
      disconnect() {
        nodeCleanup(carrierNode);
        nodeCleanup(modulationNode);
        nodeCleanup(outputNode);
      },
    }),
    [modulationNode, outputNode]
  );

  const carrierFrequencyDataByFilter = useRef([] as Uint8Array[]);
  const carrierAnalyserCanvasRef = useRef<HTMLCanvasElement>(null);

  const getData = useCallback(() => {
    const filtersFrequencies = generateArray(FILTER_BANDS.length, i => {
      const freqBins = new Uint8Array(BIN_COUNT);
      const analyserNode = carrierNodes[i].analyser!;
      analyserNode.getByteFrequencyData(freqBins);
      return freqBins;
    });

    carrierFrequencyDataByFilter.current = filtersFrequencies;
    return carrierNode.context.sampleRate;
  }, [carrierNode.context.sampleRate, ...carrierNodes]);

  const draw = useCallback((sampleRate: number) => {
    const canvas = carrierAnalyserCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    drawFrequencyData(context, carrierFrequencyDataByFilter.current, {
      sampleRate: sampleRate,
      min: 0,
      max: 3330,
    });
  }, []);

  const tick = useCallback(() => {
    const sampleRate = getData();
    draw(sampleRate);
  }, [draw, getData]);

  useAnimationFrame(tick);

  return (
    <Node
      id={id}
      inputs={["carrier", "modulation"]}
      outputs={["output"]}
      title="Vocoder"
      type={type}
    >
      <canvas
        ref={carrierAnalyserCanvasRef}
        style={{ display: "block", width: 500, height: 300 }}
        width="1000"
        height="600"
      />
    </Node>
  );
}

function drawFrequencyData(
  context: CanvasRenderingContext2D,
  filterBands: Uint8Array[],
  {
    min,
    max,
    sampleRate,
  }: {
    min: number;
    max: number;
    sampleRate: number;
  }
) {
  const height = context.canvas.height;
  const width = context.canvas.width;
  context.imageSmoothingEnabled = false;
  context.fillStyle = "#001400";
  context.fillRect(0, 0, width, height);

  if (!filterBands.length) {
    return;
  }

  const bandwidthPerBin = sampleRate / filterBands[0]!.length;
  const rangeStart = Math.floor(min / bandwidthPerBin);
  const rangeEnd = Math.ceil(max / bandwidthPerBin);
  const rangeLength = rangeEnd - rangeStart;
  const heightsPerBin = generateArray(rangeLength, () => 0);

  let x = 0;
  const barWidth = width / rangeEnd - rangeStart;

  for (const [i, data] of filterBands.entries()) {
    x = 0;
    context.fillStyle = getBandColor(i);
    const freqRange = data.subarray(rangeStart, rangeEnd);
    for (let i = 0; i < rangeLength; i++) {
      const barHeight = height * (freqRange[i] / 255.0);
      const y = height - barHeight - heightsPerBin[i];
      context.fillRect(x, y, barWidth + 0.8, barHeight);
      x += barWidth;
      heightsPerBin[i] += barHeight;
    }
  }
}

const BAND_COLORS = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
];

function getBandColor(index: number) {
  return BAND_COLORS[index % BAND_COLORS.length];
}

export default React.memo(Vocoder);
