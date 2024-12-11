import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), mkcert()],
  server: {
    port: 8000,
    host: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    // alias: {
    //   '@components': path.resolve(__dirname, './src/components'),
    //   'assets': path.resolve(__dirname, './src/assets'),
    //   'utilies' : path.resolve(__dirname, './src/utilies'),
    //   'models' : path.resolve(__dirname, './src/models'),
    // },
  },
});
