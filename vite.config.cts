const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react').default
const path = require('path')

module.exports = defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@features': path.resolve(__dirname, './src/features'),
            '@lib': path.resolve(__dirname, './src/lib'),
            '@config': path.resolve(__dirname, './src/config'),
            '@locales': path.resolve(__dirname, './src/locales'),
            '@context': path.resolve(__dirname, './src/context'),
        },
    },
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
