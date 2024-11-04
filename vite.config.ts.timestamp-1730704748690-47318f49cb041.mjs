// vite.config.ts
import path from "path";
import vue from "file:///D:/a/vite-ts-vue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import minimist from "file:///D:/a/vite-ts-vue3/node_modules/minimist/index.js";
import { visualizer } from "file:///D:/a/vite-ts-vue3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import AutoImport from "file:///D:/a/vite-ts-vue3/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/a/vite-ts-vue3/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///D:/a/vite-ts-vue3/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///D:/a/vite-ts-vue3/node_modules/vite/dist/node/index.js";
import viteCompression from "file:///D:/a/vite-ts-vue3/node_modules/vite-plugin-compression/dist/index.mjs";
import replace from "file:///D:/a/vite-ts-vue3/node_modules/vite-plugin-filter-replace/dist/index.mjs";
var vite_config_default = () => {
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      replace(
        [
          {
            filter: /\.ts$/,
            replace: {
              from: "./routes",
              to: "./dev.routerConfig.ts"
            }
          }
        ],
        {
          apply(config, { command }) {
            const { _ } = minimist(process.argv.slice(2));
            return command === "serve" && _.includes("--moduleLoad");
          }
        }
      ),
      {
        ...viteCompression(),
        apply: "build"
      },
      visualizer({ open: true })
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        // @代替src
        "#": path.resolve("./types"),
        // #代替types
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    server: {
      host: "0.0.0.0",
      port: 8080,
      open: true,
      proxy: {
        "/api": {
          target: "your https address",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks: {
            vue: ["vue", "pinia", "vue-router"],
            elementIcons: ["@element-plus/icons-vue"]
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";'
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhXFxcXHZpdGUtdHMtdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYVxcXFx2aXRlLXRzLXZ1ZTNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Evdml0ZS10cy12dWUzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7IC8vXHU4RkQ5XHU0RTJBcGF0aFx1NzUyOFx1NTIzMFx1NEU4Nlx1NEUwQVx1OTc2Mlx1NUI4OVx1ODhDNVx1NzY4NEB0eXBlcy9ub2RlXG5cbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICd2aXRlLXBsdWdpbi1maWx0ZXItcmVwbGFjZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICB9KSxcbiAgICAgIHJlcGxhY2UoXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmaWx0ZXI6IC9cXC50cyQvLFxuICAgICAgICAgICAgcmVwbGFjZToge1xuICAgICAgICAgICAgICBmcm9tOiAnLi9yb3V0ZXMnLFxuICAgICAgICAgICAgICB0bzogJy4vZGV2LnJvdXRlckNvbmZpZy50cycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHtcbiAgICAgICAgICBhcHBseShjb25maWcsIHsgY29tbWFuZCB9KSB7XG4gICAgICAgICAgICBjb25zdCB7IF8gfSA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSk7XG4gICAgICAgICAgICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdUZGMENcdTVFNzZcdTRFMTRcdTUzMDVcdTU0MkJcdTU0MkZcdTUyQThcdTUzQzJcdTY1NzAtLW1vZHVsZUxvYWRcbiAgICAgICAgICAgIHJldHVybiBjb21tYW5kID09PSAnc2VydmUnICYmIF8uaW5jbHVkZXMoJy0tbW9kdWxlTG9hZCcpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICAge1xuICAgICAgICAuLi52aXRlQ29tcHJlc3Npb24oKSxcbiAgICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB9LFxuICAgICAgdmlzdWFsaXplcih7IG9wZW46IHRydWUgfSksXG4gICAgXSxcbiAgICAvL1x1OEZEOVx1OTFDQ1x1OEZEQlx1ODg0Q1x1OTE0RFx1N0Y2RVx1NTIyQlx1NTQwRFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYycpLCAvLyBAXHU0RUUzXHU2NkZGc3JjXG4gICAgICAgICcjJzogcGF0aC5yZXNvbHZlKCcuL3R5cGVzJyksIC8vICNcdTRFRTNcdTY2RkZ0eXBlc1xuICAgICAgICAndnVlLWkxOG4nOiAndnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanMnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcG9ydDogODA4MCxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICd5b3VyIGh0dHBzIGFkZHJlc3MnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICB2dWU6IFsndnVlJywgJ3BpbmlhJywgJ3Z1ZS1yb3V0ZXInXSxcbiAgICAgICAgICAgIGVsZW1lbnRJY29uczogWydAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZSddLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvaW5kZXguc2Nzc1wiOycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMk8sT0FBTyxVQUFVO0FBRTVQLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxhQUFhO0FBRXBCLElBQU8sc0JBQVEsTUFBTTtBQUNuQixTQUFPLGFBQWE7QUFBQSxJQUNsQixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRDtBQUFBLFFBQ0U7QUFBQSxVQUNFO0FBQUEsWUFDRSxRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixJQUFJO0FBQUEsWUFDTjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTSxRQUFRLEVBQUUsUUFBUSxHQUFHO0FBQ3pCLGtCQUFNLEVBQUUsRUFBRSxJQUFJLFNBQVMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBRTVDLG1CQUFPLFlBQVksV0FBVyxFQUFFLFNBQVMsY0FBYztBQUFBLFVBQ3pEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHLGdCQUFnQjtBQUFBLFFBQ25CLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxXQUFXLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxJQUMzQjtBQUFBO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxPQUFPO0FBQUE7QUFBQSxRQUN6QixLQUFLLEtBQUssUUFBUSxTQUFTO0FBQUE7QUFBQSxRQUMzQixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBaUJBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUN0RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixjQUFjO0FBQUEsWUFDWixLQUFLLENBQUMsT0FBTyxTQUFTLFlBQVk7QUFBQSxZQUNsQyxjQUFjLENBQUMseUJBQXlCO0FBQUEsVUFDMUM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
