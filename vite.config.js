import { defineConfig } from 'vite';
import * as path from 'node:path';

const root = path.resolve(__dirname);
const outDir = path.resolve(__dirname, 'dist');

export default defineConfig({
  base: "./",
  build: {
    outDir,
    rollupOptions: {
      input: {
        index: path.resolve(root, 'index.html'),
        indexJp: path.resolve(root, 'index-jp.html'),
      }
    }
  }
});
