const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react').default

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
