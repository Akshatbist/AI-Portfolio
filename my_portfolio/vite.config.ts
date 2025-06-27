/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Safely get the env var or fallback to "/AI-Portfolio"
const basePath = typeof import.meta.env.VITE_BASE_PATH === "string" ? import.meta.env.VITE_BASE_PATH : "/AI-Portfolio";

export default defineConfig({
  plugins: [react()],
  base: basePath,
});
