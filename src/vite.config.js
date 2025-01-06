import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

import fs from 'fs';
import path from 'path';


export default defineConfig({

    server: {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'certs/privkey.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
        },
        // Make sure the server is accessible over the local network
        host: 'agilizando.local.dev',
    },

    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),      
        
    ],
});
