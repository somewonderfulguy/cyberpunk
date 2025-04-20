import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export const alias = {
  // keep in alphabetical order
  '~hooks': '/hooks',
  '~types': '/types',
  '~utils': '/utils'
}

export default defineConfig({
  plugins: [react(), libInjectCss(), dts()],
  resolve: {
    alias
  }
})
