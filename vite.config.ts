import path from 'path'; //这个path用到了上面安装的@types/node

import vue from '@vitejs/plugin-vue';
import minimist from 'minimist';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import replace from 'vite-plugin-filter-replace';

export default () => {
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      replace(
        [
          {
            filter: /\.ts$/,
            replace: {
              from: './routes',
              to: './dev.routerConfig.ts',
            },
          },
        ],
        {
          apply(config, { command }) {
            const { _ } = minimist(process.argv.slice(2));
            // 开发环境，并且包含启动参数--moduleLoad
            return command === 'serve' && _.includes('--moduleLoad');
          },
        },
      ),
      {
        ...viteCompression(),
        apply: 'build',
      },
      visualizer({ open: true }),
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
        '#': path.resolve('./types'), // #代替types
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      proxy: {
        '/api': {
          target: 'your https address',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            elementIcons: ['@element-plus/icons-vue'],
            echarts: ['echarts'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
  });
};
