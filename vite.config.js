import { defineConfig } from 'vite'

export default defineConfig({
  // Required configuration for Storybook
  optimizeDeps: {
    include: ['@storybook/html-vite']
  }
})
