import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

dotenv.config();

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET)
  }
};

export default config;
