import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index-embedded.js'),
      name: 'GBA',
      fileName: (format) => `gba.${format === 'umd' ? 'umd.cjs' : 'js'}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
      },
    },
    sourcemap: true,
    emptyOutDir: false,
  },
});
