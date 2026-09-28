import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import path from 'path';

// Two self-contained libraries, each built on its own so neither imports a
// shared chunk (a file you can drop into a page as-is):
//   `vite build`                  -> dist/gbajs.*  bring your own BIOS
//   `vite build --mode embedded`  -> dist/gba.*    BIOS built in
const LIBS = {
  production: { entry: 'src/index.js', name: 'GBA', file: 'gbajs' },
  embedded: { entry: 'src/index-embedded.js', name: 'GBA', file: 'gba' },
};

// The audio worklet as its own file, for pages whose CSP won't load it from a
// blob: URL. Pass its URL as the `audioWorkletUrl` option.
function audioWorklet() {
  return {
    name: 'gba-audio-worklet',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'gba-audio-worklet.js',
        source: readFileSync(path.resolve(__dirname, 'src/audio-worklet.js'), 'utf8'),
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {};
  }
  const lib = LIBS[mode];
  if (!lib) {
    throw new Error(`unknown build mode "${mode}", expected one of ${Object.keys(LIBS).join(', ')}`);
  }
  return {
    plugins: [audioWorklet()],
    build: {
      lib: {
        entry: path.resolve(__dirname, lib.entry),
        name: lib.name,
        fileName: (format) => `${lib.file}.${format === 'umd' ? 'umd.cjs' : 'js'}`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        output: {
          // UMD consumers get the named exports; the default is also `.default`
          exports: 'named',
        },
      },
      sourcemap: true,
      // The first build clears dist/, the second adds to it
      emptyOutDir: mode === 'production',
    },
  };
});
