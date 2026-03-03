import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
        forks: {
            singleFork: true,
        },
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            include: ['src/features/contact/hooks/**', 'src/features/contact/utils/**', 'src/lib/**', '!src/lib/i18n/**'],
            thresholds: {
                branches: 70,
                functions: 80,
                lines: 80,
                statements: 80
            }
        },
    },
});
