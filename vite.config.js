import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "index.html",
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.html") {
            return assetInfo.name;
          }
          const ext = path.extname(assetInfo.name);
          return `assets/[name]${ext}`;
        },
      },
    },
  },
});
