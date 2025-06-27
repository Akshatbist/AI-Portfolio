/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SAFELY read the env var without crashing if it's undefined
const base = process.env.VITE_BASE_PATH || "/AI-Portfolio";

export default defineConfig({
  plugins: [react()],
  base: base
});