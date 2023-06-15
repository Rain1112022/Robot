//想在vite.config.js中使用环境变量，要用vite提供的loadEnv(mode, process.cwd())
//单页面应用在src目录下项目中用环境变量可以使用import.meta.env查看.env文件中的自定义环境变量，或者使用import.meta.glob(类似webpack的require.context)读取文件，但是在vite.config.ts配置文件中import.meta是空的
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite';
const root = process.cwd();
console.log("root", root);
function pathResolve(dir) {
  return resolve(root, '.', dir)
}
 //loadEnv的第一参数mode的获取：
 //1，直接在vite.config.ts中将defineConfig参数写成函数，函数就有mode参数可用；
 //2，mode值也可以配合scripts命令从process.argv中拿，实际上defineConfig的mode参数也是拿的这个；注意下面的 --mode development命令在最后面，方便process.argv取其值；
export default defineConfig(({command, mode }) => {
  let env = {}
  const isBuild = command === 'build'
  if (!isBuild) {
    //设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root,'')
  } else {
    env = loadEnv(mode, root,'')
  }
  return {
    sourcemap: true,
    base: env.VITE_BASE_PATH,
    //define，定义全局常量；
    define: {
      'process.env': env
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 将所有带短横线的标签名都视为自定义元素
            isCustomElement: (tag) => tag.includes('xml') || tag.includes('block') || tag.includes('field') || tag.includes('sep') || tag.includes('value') || tag.includes('field') || tag.includes('mutation') || tag.includes('shadow') || tag.includes('category')
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
      //alias可多个配置
      alias: [
      // {
      //   '@': path.resolve(__dirname, 'src'), //两种
      // },
      {
        find: /\@\//,
        replacement: `${pathResolve('src')}/`
      }
    ],
    },
    build: {
      //vite中内置了移除console的设置，只需配置一下
      minify: 'terser',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          //是否移除debugger、console
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      }
    },
    server: {
      // host: '0.0.0.0',
      // port: 8000,
      proxy: {
        // cors: true, 
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          // target: 'http://192.169.4.16:9999',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    },
  }
});