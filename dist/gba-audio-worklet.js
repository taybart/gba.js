// The AudioWorkletProcessor that plays the emulator's output. It runs on the
// audio rendering thread, so it can't import anything or touch the emulator.
//
// It's loaded one of two ways (see GameBoyAdvanceAudio.prototype.initWorklet):
// from its own URL, as dist/gba-audio-worklet.js, when the page passes
// `audioWorkletUrl`; or from a Blob URL of this file's source, which needs a
// CSP that allows blob: scripts.
class GameBoyAdvanceAudioProcessor extends AudioWorkletProcessor {
	constructor(options) {
		super();
		var opts = options.processorOptions;
		this.size = opts.bufferSize;
		this.mask = this.size - 1;
		this.left = new Float32Array(this.size);
		this.right = new Float32Array(this.size);
		this.writePointer = 0;
		this.readPointer = 0;
		this.resampleRatio = opts.resampleRatio;
		this.prebuffer = opts.prebuffer;
		this.maxBuffered = opts.maxBuffered;
		this.buffering = true;
		this.port.onmessage = (e) => this.push(e.data.left, e.data.right);
	}

	available() {
		return (this.writePointer - (this.readPointer | 0)) & this.mask;
	}

	push(left, right) {
		var w = this.writePointer;
		for (var i = 0; i < left.length; ++i) {
			this.left[w] = left[i];
			this.right[w] = right[i];
			w = (w + 1) & this.mask;
		}
		this.writePointer = w;
		// If the emulator has gotten ahead of playback, skip forward so latency doesn't grow
		if (this.available() > this.maxBuffered) {
			this.readPointer = (w - this.prebuffer) & this.mask;
		}
	}

	process(inputs, outputs) {
		var left = outputs[0][0];
		var right = outputs[0][1] || left;
		var i = 0;
		if (this.buffering && this.available() >= this.prebuffer) {
			this.buffering = false;
		}
		if (!this.buffering) {
			var o = this.readPointer;
			for (; i < left.length; ++i, o += this.resampleRatio) {
				if (o >= this.size) {
					o -= this.size;
				}
				if ((o | 0) == this.writePointer) {
					this.buffering = true;
					break;
				}
				left[i] = this.left[o | 0];
				right[i] = this.right[o | 0];
			}
			this.readPointer = o;
		}
		for (; i < left.length; ++i) {
			left[i] = 0;
			right[i] = 0;
		}
		return true;
	}
}
registerProcessor('gba-audio', GameBoyAdvanceAudioProcessor);
