import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => ({
  plugins: [
    // copyPublicDirDeps(),
    react(),
    libInjectCss(),
    dts(),
    svgr()
  ],
  build: {}
}))
