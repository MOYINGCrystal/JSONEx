import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: '/src' }]
    },
    build: {
        outDir: 'dist',
        lib: {
            entry: path.resolve(__dirname, 'src/JSONEx.ts'),
            formats: ['es'],
        }
    }
});
