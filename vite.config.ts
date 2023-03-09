/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // "global": '({})'
    "global": {}
  },
  // optimizeDeps: {
  //   include: [
  //     // 'uuid',
  //     // 'vis-util',
  //     // 'vis-data',
  //     // 'vis-network',
  //     // 'react-graph-vis',
  //     // 'vis-dev-utils',
  //   ],
  // },
  test: {


  }
})
