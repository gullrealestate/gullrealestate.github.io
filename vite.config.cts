const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react').default
const prerender = require('vite-plugin-prerender')
const path = require('path')

module.exports = defineConfig({
    plugins: [
        react(),
    ],
    build: {
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    icons: ['lucide-react'],
                },
            },
        },
    },
})
