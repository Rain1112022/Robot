import router from './router'
import store from "@/store/index"

const whiteList = ['/home'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
    if (to.path === '/') {
      next({ path: '/home' })
  } else {
    store.commit('tagView/setNavigation',to.path);
    next()
    // if (whiteList.indexOf(to.path) == -1) {
    //   //说明不在home页面
    //   // console.log(to.path);
    //   store.commit('tagView/setNavigation',to.path);
    //   next()
    // }
  }
})

router.afterEach((to, from) => {
  
 
})


