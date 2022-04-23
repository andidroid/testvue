import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          home: ["./src/pages/Home.vue", "./src/pages/About.vue"],
          admin: ["./src/pages/Admin.vue"],
          test: ["./src/pages/Test.vue"],
          routing: ["./src/pages/Places.vue"],
          errors: [
            "./src/pages/errors/NotFound.vue",
            "./src/pages/errors/Forbidden.vue",
            "./src/pages/errors/NetworkError.vue",
          ],
        },
      },
    },
  },
});
