import { defineConfig } from "vite";
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  esbuild: { jsx: "automatic" },
  server: { host: "0.0.0.0" },
  build: { target: "es2020" },
});
