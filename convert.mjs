import fs from 'fs';
import path from 'path';

const jsDir = 'js';
const srcDir = 'src';

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Mapping of file -> exported names
const exportsMap = {
  'util.js': ['hex', 'Serializer'],
  'arm.js': ['ARMCoreArm'],
  'thumb.js': ['ARMCoreThumb'],
  'core.js': ['ARMCore'],
  'mmu.js': ['MemoryView', 'MemoryBlock', 'ROMView', 'BIOSView', 'BadMemory', 'GameBoyAdvanceMMU'],
  'savedata.js': ['SRAMSavedata', 'FlashSavedata', 'EEPROMSavedata'],
  'video.js': ['GameBoyAdvanceVideo'],
  'audio.js': ['GameBoyAdvanceAudio'],
  'io.js': ['GameBoyAdvanceIO'],
  'irq.js': ['GameBoyAdvanceInterruptHandler'],
  'keypad.js': ['GameBoyAdvanceKeypad'],
  'sio.js': ['GameBoyAdvanceSIO'],
  'gpio.js': ['GameBoyAdvanceGPIO', 'GameBoyAdvanceRTC'],
  'gba.js': ['GameBoyAdvance'],
};

// Dependencies: file -> [importFile, importNames]
const importsMap = {
  'core.js': [
    ['arm.js', 'ARMCoreArm'],
    ['thumb.js', 'ARMCoreThumb'],
  ],
  'mmu.js': [
    ['savedata.js', 'SRAMSavedata, FlashSavedata, EEPROMSavedata'],
  ],
  'savedata.js': [
    ['mmu.js', 'MemoryView'],
  ],
  'video.js': [
    ['video/software.js', 'GameBoyAdvanceSoftwareRenderer'],
  ],
  'audio.js': [],
  'io.js': [],
  'irq.js': [],
  'keypad.js': [],
  'sio.js': [],
  'gpio.js': [],
  'gba.js': [],
};

function transform(content, file) {
  // Remove Object.prototype.inherit
  content = content.replace(/Object\.prototype\.inherit\s*=\s*function\(\)\s*\{[\s\S]*?\};?\s*\n?/, '');
  
  // Remove this.inherit() calls
  content = content.replace(/^\s*this\.inherit\(\);\s*\n?/gm, '');

  // Fix window.URL in gba.js -> globalThis.URL
  if (file === 'gba.js') {
    content = content.replace(/window\.URL\b/g, 'globalThis.URL');
    content = content.replace(/window\.queueFrame\b/g, 'globalThis.queueFrame');
    content = content.replace(/window\.setTimeout\b/g, 'setTimeout');
    content = content.replace(/window\.open\b/g, 'globalThis.open');
    content = content.replace(/window\.localStorage\b/g, 'globalThis.localStorage');
  }

  // Fix window.AudioContext in audio.js
  if (file === 'audio.js') {
    content = content.replace(/window\.AudioContext\b/g, 'globalThis.AudioContext');
    content = content.replace(/window\.webkitAudioContext\b/g, 'globalThis.webkitAudioContext');
  }

  // Fix window.addEventListener in keypad.js -> make optional via globalThis
  if (file === 'keypad.js') {
    content = content.replace(/window\.addEventListener/g, 'globalThis.addEventListener');
    content = content.replace(/window\.removeEventListener/g, 'globalThis.removeEventListener');
  }

  // Fix video/software.js accidental `window` shadowing bug in writeWindow
  if (file === 'video/software.js') {
    // Replace var window = this.windows[index] with var win
    content = content.replace(
      /GameBoyAdvanceSoftwareRenderer\.prototype\.writeWindow = function\(index, value\) \{\n\s*var window = this\.windows\[index\];/,
      "GameBoyAdvanceSoftwareRenderer.prototype.writeWindow = function(index, value) {\n\tvar win = this.windows[index];"
    );
    // Replace references to window.enabled/window.special within that function
    // Since the function is small and the variable is local, do a targeted replacement
    content = content.replace(/window\.enabled\[(\d+)\] = value & 0x(\w+);/g, 'win.enabled[$1] = value & 0x$2;');
    content = content.replace(/window\.special = value & 0x(\w+);/, 'win.special = value & 0x$1;');
  }

  // Add imports
  const imports = importsMap[file] || [];
  let importLines = '';
  for (const [impFile, names] of imports) {
    const relPath = impFile.replace(/\.js$/, '.js').replace(/^video\//, './video-');
    importLines += `import { ${names} } from '${relPath}';\n`;
  }
  if (importLines) {
    content = importLines + '\n' + content;
  }

  // Add exports
  const exports = exportsMap[file];
  if (exports) {
    content += '\nexport { ' + exports.join(', ') + ' };\n';
  }

  return content;
}

const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
  const transformed = transform(content, file);
  const outName = file.replace(/\//g, '-');
  fs.writeFileSync(path.join(srcDir, outName), transformed);
}

// Handle nested video/software.js
const videoDir = path.join(jsDir, 'video');
if (fs.existsSync(videoDir)) {
  const videoFiles = fs.readdirSync(videoDir).filter(f => f.endsWith('.js'));
  for (const file of videoFiles) {
    const content = fs.readFileSync(path.join(videoDir, file), 'utf8');
    const transformed = transform(content, 'video/' + file);
    const outName = 'video-' + file;
    fs.writeFileSync(path.join(srcDir, outName), transformed);
  }
}

console.log('Conversion complete!');
