
const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
