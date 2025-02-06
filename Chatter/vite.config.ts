import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.ts",
      manifest: {
        name: "Chatter AI",
        short_name: "Chatter",
        description: "An AI-powered chatbot",
        theme_color: "#8c52ff",
        background_color: "#8c52ff",
        display: "fullscreen",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
