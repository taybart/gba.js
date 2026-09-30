// The AudioWorkletProcessor that plays the emulator's output. It runs on the
// audio rendering thread, so it can't import anything or touch the emulator.
//
// It's loaded one of two ways (see GameBoyAdvanceAudio.prototype.initWorklet):
// from its own URL, as dist/gba-audio-worklet.js, when the page passes
// `audioWorkletUrl`; or from a Blob URL of this file's source, which needs a
// CSP that allows blob: scripts.
// How far playback may speed up or slow down to follow the buffer (see rate),
// how hard it steers, and how smoothly it reads the fill
var MAX_ADJUST = 0.01;
var GAIN = 0.02;
var SMOOTHING = 0.005;

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
		// Where playback steers the buffer's fill to: see process
		this.target = opts.target || this.prebuffer * 1.5;
		this.smoothedFill = this.prebuffer;
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

	// The emulator is paced by timers, and never makes sound at exactly the
	// rate this plays it: a hair slow and the buffer drains until it runs dry
	// (a gap), a hair fast and it fills until it has to skip (a click). So
	// playback follows the buffer instead, up to MAX_ADJUST faster or slower
	// as the fill sits above or below the target, and settles rather than
	// ever running out. At these sizes that's a pitch change nobody hears.
	rate() {
		// Smoothed, since the fill jumps a batch at a time as the emulator posts
		this.smoothedFill += (this.available() - this.smoothedFill) * SMOOTHING;
		var error = (this.smoothedFill - this.target) / this.target;
		var adjust = Math.max(-MAX_ADJUST, Math.min(MAX_ADJUST, error * GAIN));
		return this.resampleRatio * (1 + adjust);
	}

	process(inputs, outputs) {
		var left = outputs[0][0];
		var right = outputs[0][1] || left;
		var i = 0;
		var ratio = this.rate();
		if (this.buffering && this.available() >= this.prebuffer) {
			this.buffering = false;
		}
		if (!this.buffering) {
			var o = this.readPointer;
			for (; i < left.length; ++i, o += ratio) {
				if (o >= this.size) {
					o -= this.size;
				}
				var at = o | 0;
				var next = (at + 1) & this.mask;
				// Interpolating needs the sample after this one too
				if (next == this.writePointer || at == this.writePointer) {
					this.buffering = true;
					break;
				}
				var t = o - at;
				left[i] = this.left[at] + (this.left[next] - this.left[at]) * t;
				right[i] = this.right[at] + (this.right[next] - this.right[at]) * t;
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
