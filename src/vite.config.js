import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
    // Carrega as variáveis de ambiente do ficheiro .env apropriado
    const env = loadEnv(mode, process.cwd(), '');

    const serverConfig = {
        host: '0.0.0.0',
        port: parseInt(env.VITE_PORT) || 5173,
    };

    // --- A MAGIA ESTÁ AQUI ---
    // Só adiciona a configuração de HMR se estivermos em modo de desenvolvimento
    if (command === 'serve') {
        serverConfig.hmr = {
            host: new URL(env.APP_URL).hostname,
        };
    }

    return {
        plugins: [
            laravel({
                input: 'resources/js/app.jsx',
                refresh: true,
            }),
            react(),
        ],
        // A configuração do servidor só é aplicada quando necessária
        server: serverConfig,
    };
});