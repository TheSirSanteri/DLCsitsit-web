import adapter from '@deno/svelte-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // Jos haluat edelleen prerenderöidä joitain reittejä:
    // prerender: { entries: [] } // älä käytä ['*'] jos haluat SSR:n
  }
};

export default config;