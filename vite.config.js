import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig,loadEnv  } from 'vite';

// const env = loadEnv("mode",process.cwd());
export default defineConfig({
  sourcemap: true,
  base :'/backup/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('xml') || tag.includes('block') || tag.includes('field') || tag.includes('sep') || tag.includes('value') || tag.includes('field') || tag.includes('mutation') || tag.includes('shadow')  || tag.includes('category')
        }
      }
    })
  ],
  css: {
     // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    minify: 'terser',
    outDir:  'dist',
  },
  
  server: {
    // host: '0.0.0.0',
    // port: 8000,
    proxy: {
      // cors: true, 
      //4.16,7.32
      // 选项写法
      '/api': {
        target: 'http://192.169.7.32:9999',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
  
});


