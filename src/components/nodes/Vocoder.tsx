/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import useAnimationFrame from "@restart/hooks/useAnimationFrame";
import Node from "components/Node";
import { nodeCleanup } from "components/Nodes";
import { useNode } from "context/NodeContext";
import useAnalyserNode from "hooks/nodes/useAnalyserNode";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import useBiquadFilterNode from "hooks/nodes/useBiquadFilterNode";
import useGainNode from "hooks/nodes/useGainNode";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import {
  IAudioContext,
  IAudioWorkletNode,
  IBiquadFilterNode,
  IGainNode,
  TBiquadFilterType,
} from "utils/audioContext";
import { first, generate, generateArray, zip } from "utils/collections";
import { Parameters } from "worklets/envelope-follower.types";

interface FilterDescription {
  frequency: number;
  type: TBiquadFilterType;
  gain: number;
  q: number;
}

const FFT_SIZE = 1024;
const FFT_SIZE_EXP = Math.log2(FFT_SIZE);
const BIN_COUNT = FFT_SIZE / 2;

const RESPONSE_STEPS = 240;
const MIN_HZ = 0;
const MAX_HZ = 4000;

const FILTER_BANDS: FilterDescription[] = [
  { frequency: 101, type: "lowpass", gain: -2.55, q: 0.55 },
  { frequency: 154, type: "bandpass", gain: -2.4, q: 2.96 },
  { frequency: 208, type: "bandpass", gain: -2.4, q: 4 },
  { frequency: 285, type: "bandpass", gain: -3, q: 3.55 },
  { frequency: 395, type: "bandpass", gain: -2.5, q: 3.7 },
  { frequency: 542, type: "bandpass", gain: -3.12, q: 3.75 },
  { frequency: 720, type: "bandpass", gain: -2.8, q: 3.7 },
  { frequency: 1013, type: "bandpass", gain: -2.8, q: 3.9 },
  { frequency: 1495, type: "bandpass", gain: -3.4, q: 3.2 },
  { frequency: 2001, type: "bandpass", gain: -3.15, q: 5.16 },
  { frequency: 2546, type: "bandpass", gain: -2.8, q: 4.48 },
  {
    frequency: 3330,
    type: "highpass",
    gain: -2.13,
    q: 0.88,
  },
];

interface BandResponse {
  frequencies: Float32Array;
  magResponse: Float32Array;
  phaseResponse: Float32Array;
}

export function Vocoder({ id, type }: NodeProps) {
  // Interface
  const modulationNode = useGainNode(`${id}_modulate`, {});
  const carrierNode = useGainNode(`${id}_carrier`, {});
  const outputNode = useGainNode(`${id}_output`, {});
  const sampleRate = modulationNode.context.sampleRate;

  // Sets whether the graph is connected to its inputs
  const [paused, setPaused] = useState(false);

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

  // Calculate filter responses
  const responsesByBand = useMemo(() => {
    return measureFrequencyResponse(modulatorNodes);
  }, [first(modulatorNodes)!.filter]);

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
    }

    for (const [i, { filter1, filter2, gain, analyser }] of carrierNodes.entries()) {
      const binCarrierNodes = [filter1, filter2, gain, analyser];

      // Connect up the chain
      binCarrierNodes.reduce((acc, node) => {
        return !!acc ? (node ? acc.connect(node) : acc) : node;
      });

      // Modulate the carrier gain from the equivalent modulation node
      modulatorNodes[i].envelopeFollower.connect(gain.gain);

      // And connect the carrier to the output
      gain.connect(outputNode);
    }
  }, [outputNode, ...flatModulatorNodes, ...flatCarrierNodes]);

  // Connect or disconnect from input when `active` changes
  useEffect(() => {
    for (const { filter } of modulatorNodes) {
      // Connect to the modulator
      if (paused) modulationNode.disconnect(filter);
      else modulationNode.connect(filter);
    }

    for (const { filter1 } of carrierNodes) {
      // Connect the carrier to the chain
      if (paused) carrierNode.disconnect(filter1);
      else carrierNode.connect(filter1);
    }
  }, [
    paused,
    modulationNode,
    carrierNode,
    ...modulatorNodes.map(({ filter }) => filter),
    ...carrierNodes.map(({ filter1 }) => filter1),
  ]);

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
    [carrierNode, modulationNode, outputNode]
  );

  const freqResponseCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = freqResponseCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    drawFrequencyResponse(context, responsesByBand);
  }, [responsesByBand]);

  const carrierBandBins = useRef([] as { frequency: number; freqBins: Uint8Array }[]);
  const carrierAnalyserCanvasRef = useRef<HTMLCanvasElement>(null);

  const getFrequencyData = useCallback(() => {
    const filtersFrequencies = generateArray(FILTER_BANDS.length, i => {
      const freqBins = new Uint8Array(BIN_COUNT);
      const analyserNode = carrierNodes[i].analyser!;
      analyserNode.getByteFrequencyData(freqBins);
      return { frequency: FILTER_BANDS[i].frequency, freqBins };
    });

    carrierBandBins.current = filtersFrequencies;
    return sampleRate;
  }, [sampleRate, ...carrierNodes]);

  const draw = useCallback((sampleRate: number) => {
    const canvas = carrierAnalyserCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    drawBins(context, carrierBandBins.current, {
      sampleRate: sampleRate,
      min: MIN_HZ,
      max: MAX_HZ,
    });
  }, []);

  const raf = useAnimationFrame();
  const tick = useCallback(() => {
    const sampleRate = getFrequencyData();
    draw(sampleRate);
    raf.request(tick);
  }, [draw, getFrequencyData]);

  useEffect(() => {
    if (paused) raf.cancel();
    else raf.request(true, tick);
  }, [paused, tick]);

  return (
    <Node
      id={id}
      inputs={["carrier", "modulation"]}
      outputs={["output"]}
      title="Vocoder"
      type={type}
    >
      <div className="vocoderNode_canvasHost">
        <canvas
          ref={carrierAnalyserCanvasRef}
          style={{ display: "block", width: 800, height: 400 }}
          width="800"
          height="400"
        />
        <canvas
          ref={freqResponseCanvasRef}
          className="vocoderNode_overlayCanvas"
          width="800"
          height="400"
        />
        <button className="vocoderNode_overlayPause" onClick={() => setPaused(!paused)}>
          {paused ? "Run" : "Pause"}
        </button>
      </div>
    </Node>
  );
}

function measureFrequencyResponse(
  modulatorNodes: {
    filter: IBiquadFilterNode<IAudioContext>;
    gain: IGainNode<IAudioContext>;
    envelopeFollower: IAudioWorkletNode<IAudioContext>;
  }[]
) {
  const stepCount = RESPONSE_STEPS;
  const stepSize = (MAX_HZ - MIN_HZ) / stepCount;
  const frequencies = Float32Array.from(generate(stepCount, i => i * stepSize + MIN_HZ));

  const responseEntries = modulatorNodes.map(({ filter }) => {
    const magResponse = new Float32Array(frequencies.length);
    const phaseResponse = new Float32Array(frequencies.length);

    filter.getFrequencyResponse(frequencies, magResponse, phaseResponse);
    return [filter.frequency.value, { frequencies, magResponse, phaseResponse }] as [
      number,
      { frequencies: Float32Array; magResponse: Float32Array; phaseResponse: Float32Array }
    ];
  });

  return new Map(responseEntries);
}

function drawFrequencyResponse(
  context: CanvasRenderingContext2D,
  bandResponses: Map<number, BandResponse>
) {
  const height = context.canvas.height;
  const width = context.canvas.width;

  context.clearRect(0, 0, width, height);

  const responseStepWidth = width / RESPONSE_STEPS;
  const responsePreferredHeight = height / 3;

  // Then draw the response lines on top
  for (const [i, { frequency }] of FILTER_BANDS.entries()) {
    const { magResponse } = bandResponses.get(frequency)!;
    const { responseColor } = BAND_COLORS[i]!;

    context.strokeStyle = responseColor;
    context.lineWidth = 2;
    context.beginPath();
    let lineStarted = false;

    let x = 0;
    const frequencyCount = magResponse.length;
    for (let i = 0; i < frequencyCount; i++) {
      const y = height - responsePreferredHeight * magResponse[i];

      if (!lineStarted) {
        context.moveTo(x, y);
        lineStarted = true;
      } else {
        context.lineTo(x, y);
      }

      x += responseStepWidth;
    }
    context.stroke();
  }
}

function drawBins(
  context: CanvasRenderingContext2D,
  bandBins: { frequency: number; freqBins: Uint8Array }[],

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

  context.clearRect(0, 0, width, height);

  if (!bandBins.length) {
    return;
  } else if (bandBins.length > BAND_COLORS.length) {
    console.error("Not enough frequency colors");
    return;
  }

  const bandwidth = sampleRate / 2;
  const binRangeStart = Math.floor(BIN_COUNT * (min / bandwidth));
  const binRangeEnd = Math.ceil(BIN_COUNT * (max / bandwidth));
  const binRangeLength = binRangeEnd - binRangeStart;

  const binBarWidth = width / binRangeLength;
  const unclippedHeight = height - 60;
  const cumulativeHeightsPerBin = generateArray(binRangeLength, () => 0);

  // Draw the frequency bins for this passband
  for (const [i, { freqBins }] of bandBins.entries()) {
    const { freqColor } = BAND_COLORS[i]!;
    context.fillStyle = freqColor;

    let x = 0; // Reset x
    const freqRange = freqBins.subarray(binRangeStart, binRangeEnd);
    for (let i = 0; i < binRangeLength; i++) {
      const barHeight = unclippedHeight * (freqRange[i] / 255.0);
      const y = height - barHeight - cumulativeHeightsPerBin[i];
      context.fillRect(x, y, binBarWidth, barHeight);

      x += binBarWidth;
      cumulativeHeightsPerBin[i] += barHeight;
    }
  }
}

const FREQUENCY_COLORS = [
  "#769db1",
  "#004d84",
  "#81ad5c",
  "#007000",
  "#c66a6b",
  "#a80000",
  "#c78f41",
  "#c55000",
  "#9982a5",
  "#3b116b",
  "#cacc69",
  "#7c2d00",
];

const FREQUENCY_RESPONSE_COLORS = [
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

const BAND_COLORS = zip(FREQUENCY_COLORS, FREQUENCY_RESPONSE_COLORS).map(
  ([freqColor, responseColor]) => ({
    freqColor,
    responseColor,
  })
);

export default React.memo(Vocoder);
