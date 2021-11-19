const workletsById = new Map<String, AudioWorkletProcessor>();

class StoppableAudioWorkletProcessor extends AudioWorkletProcessor {
  running = true;
  readonly id: String;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);
    this.id = options?.processorOptions?.id;

    if (workletsById.has(this.id) && workletsById.get(this.id) !== this) {
      throw new Error(`Why is this happening? ${this.id}`);
    }

    this.port.onmessage = event => {
      if (event.data === "stop") {
        this.stop();
      }
    };
  }

  stop() {
    this.running = false;
    if (this.id && workletsById.get(this.id) === this) {
      workletsById.delete(this.id);
    }
  }
}

export default StoppableAudioWorkletProcessor;
