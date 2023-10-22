import { ViteDevServer, defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const twigRefreshPlugin = () => ({
  name: 'twig-refresh',
  configureServer({ watcher, ws }: ViteDevServer) {
    watcher.add(resolve(root, 'templates/**/*.twig'));
    watcher.on('change', (path: string) => {
      if (path.endsWith('.twig')) {
        ws.send({
          type: 'full-reload',
        });
      }
    });
  },
});

export default defineConfig({
  root: './assets',
  base: '/assets/',
  plugins: [twigRefreshPlugin()],
  server: {
    port: 3000,
    watch: {
      disableGlobbing: false,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  build: {
    assetsDir: '',
    manifest: true,
    outDir: '../public/assets/',
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable vendor chunk
      },
      input: {
        app: resolve(root, 'assets/app.ts'),
      },
    },
  },
});
