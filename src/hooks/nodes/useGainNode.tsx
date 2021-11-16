import { useEffect } from "react";
import { useNode } from "context/NodeContext";

interface Options {
  gain?: number;
  instant?: boolean;
}

function useGainNode(id: string, { gain = 1, instant = false }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createGain());

  // AudioParam
  useEffect(() => {
    if (instant) {
      node.gain.value = gain;
    } else {
      node.gain.setTargetAtTime(gain, node.context.currentTime, 0.015);
    }
  }, [node, gain]);

  return node;
}

export default useGainNode;
