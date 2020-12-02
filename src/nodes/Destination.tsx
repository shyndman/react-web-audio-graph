import React, { useContext, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "nodes/Node";

const Destination = ({ id, type }: NodeProps) => {
  // AudioNode
  const context = useContext(AudioContext);
  const node = context.destination;
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  return <Node id={id} inputs={["input"]} type={type} />;
};

export default React.memo(Destination);