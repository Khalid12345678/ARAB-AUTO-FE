import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to copy assets
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const sourceDir = path.resolve(__dirname, "attached_assets");
      const targetDir = path.resolve(__dirname, "dist");
      
      if (fs.existsSync(sourceDir)) {
        // Create assets directory if it doesn't exist
        const assetsDir = path.join(targetDir, "assets");
        if (!fs.existsSync(assetsDir)) {
          fs.mkdirSync(assetsDir, { recursive: true });
        }
        
        // Copy all files from attached_assets to dist/assets
        const files = fs.readdirSync(sourceDir);
        files.forEach(file => {
          const sourceFile = path.join(sourceDir, file);
          const targetFile = path.join(assetsDir, file);
          
          if (fs.statSync(sourceFile).isFile()) {
            fs.copyFileSync(sourceFile, targetFile);
            console.log(`Copied: ${file} to assets/`);
          }
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copyAssetsPlugin(),
    // Only load cartographer plugin if we're in development and have REPL_ID
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID
      ? [
          // Use dynamic import with error handling
          (async () => {
            try {
              const { cartographer } = await import("@replit/vite-plugin-cartographer");
              return cartographer();
            } catch (error) {
              console.warn("Cartographer plugin not available:", error.message);
              return null;
            }
          })(),
        ].filter(Boolean)
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "attached_assets"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client", "index.html"),
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
