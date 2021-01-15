import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import Note from "components/Note";
import { useNode } from "context/NodeContext";
import { getNoteFrequency, getNoteName } from "utils/notes";
import Node from "components/Node";

function OscillatorNote({ data, id, selected, type: nodeType }: NodeProps) {
  const { detune = 0, octave = 4, onChange, twelfth = 0, type = "sine" } = data;
  const frequency = getNoteFrequency(octave, twelfth);

  // AudioNode
  const node = useNode(id, context => context.createOscillator());
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  // AudioParam
  useEffect(() => void (node.detune.value = detune ?? 0), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.type = type ?? "sine"), [node, type]);

  return (
    <Node
      id={id}
      inputs={["detune"]}
      outputs={["output"]}
      title={<Note detune={detune} octave={octave} twelfth={twelfth} />}
      type={nodeType}
    >
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max={100}
              min={-100}
              onChange={e => onChange({ detune: +e.target.value })}
              step={1}
              style={{ width: "100%" }}
              title={`Detune: ${detune} cents`}
              type="range"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <select
              onChange={e => onChange({ twelfth: +e.target.value })}
              style={{ width: "50%" }}
              title="Note"
              value={twelfth}
            >
              {Array(12)
                .fill(0)
                .map((_, twelfth) => (
                  <option key={twelfth} value={twelfth}>
                    {getNoteName(twelfth)}
                  </option>
                ))}
            </select>
            <select
              onChange={e => onChange({ octave: +e.target.value })}
              style={{ width: "50%" }}
              title="Octave"
              value={octave}
            >
              {Array(11)
                .fill(0)
                .map((_, octave) => (
                  <option key={octave} value={octave}>
                    {octave}
                  </option>
                ))}
            </select>
          </div>
          <div className="customNode_item">
            <select
              onChange={e => onChange({ type: e.target.value })}
              style={{ width: "100%" }}
              title="Wave"
              value={type}
            >
              <option value="sawtooth">sawtooth</option>
              <option value="square">square</option>
              <option value="sine">sine</option>
              <option value="triangle">triangle</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(OscillatorNote);
