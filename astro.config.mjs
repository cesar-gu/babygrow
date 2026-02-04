import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://cesar-gu.github.io/babygrow',
  base: '/babygrow',
  integrations: [vue(), tailwind()],
  output: 'static',
  vite: {
    ssr: {
      external: ['chart.js'],
    },
    json: {
      stringify: true,
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
        '@modules': '/src/modules',
        '@types': '/src/types',
        '@data': '/src/data',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
        '@interfaces': '/src/types',
      },
    },
  },
});
