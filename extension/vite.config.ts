import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
// @ts-ignore
import manifest from './manifest.json';
// @ts-ignore
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    (obfuscatorPlugin as any)({
      include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'],
      apply: 'build', // Only obfuscate on production build
      debugger: false,
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75
      }
    })
  ],
});
