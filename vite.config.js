// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/', // Adjust if deployed in a subdirectory
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//       },
//     },
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/app/',
  server: {
    proxy: {
      '/tinymce': 'https://cdn.tiny.cloud',
    },
  },
  build: {
    target: 'esnext',
  },
});
