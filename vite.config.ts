import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/auth/login/login.html'),
        registro: resolve(__dirname, 'src/pages/auth/registro/registro.html'),
        adminHome: resolve(__dirname, 'src/pages/admin/home.html'),
        clientHome: resolve(__dirname, 'src/pages/client/home/home.html'),
        clientCarrito: resolve(__dirname, 'src/pages/client/carrito/carrito.html'),
      },
    },
  },
});