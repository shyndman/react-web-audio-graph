import { Mode } from "worklets/rectifier-processor.types";

class RectifierProcessor extends AudioWorkletProcessor {
  mode: Mode;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.mode = options?.processorOptions.mode ?? Mode.HalfWave;
  }

  // Depending on the mode, either blocks or inverts negative amplitudes.
  // 1) in Full-wave mode inverts negative amplitides, i.e. changes sign to positive
  // 2) in Half-wave mode blocks negative amplitudes, i.e. returns as 0
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0];
    const step = this.mode === Mode.HalfWave ? this.stepHalfWave : this.stepFullWave;

    for (let channel = 0; channel < input.length; ++channel) {
      const sampleFrames = input[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        output[channel][i] = step(input[channel][i]);
      }
    }

    return true;
  }

  stepFullWave(value: number): number {
    return value > 0 ? value : -value;
  }

  stepHalfWave(value: number): number {
    return value > 0 ? value : 0;
  }
}

registerProcessor("rectifier-processor", RectifierProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
