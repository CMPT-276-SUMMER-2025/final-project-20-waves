import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global variables like `describe`, `it`, etc.
    environment: "jsdom", // Sets the testing environment to jsdom
  },
});
