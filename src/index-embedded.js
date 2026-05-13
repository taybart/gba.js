import { GameBoyAdvance } from './gba.js';
import { BIOS_BASE64 } from './bios-data.js';

function decodeBase64(b64) {
	var str = atob(b64);
	var buf = new ArrayBuffer(str.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i < str.length; i++) {
		view[i] = str.charCodeAt(i);
	}
	return buf;
}

export var BIOS = decodeBase64(BIOS_BASE64);

export function GameBoyAdvanceEmbedded(options) {
	GameBoyAdvance.call(this, options);
	this.setBios(BIOS);
}

GameBoyAdvanceEmbedded.prototype = Object.create(GameBoyAdvance.prototype);
GameBoyAdvanceEmbedded.prototype.constructor = GameBoyAdvanceEmbedded;

export { GameBoyAdvance };
export default GameBoyAdvanceEmbedded;
