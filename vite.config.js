import { defineConfig } from 'vite'

export default defineConfig({
  // Storybook için gerekli konfigürasyon
  optimizeDeps: {
    include: ['@storybook/html-vite']
  }
})
