<template>
  <div class="main-container">
    <div  class="home-container">
      <div class="middle">
      <img src="@/assets/image/grid.png" alt="">
    </div>
    <div class="bottom">
      <div>
        <img class="mokuaihua" src="@/assets/image/icon_mokuaihua_nor.png" alt="" @click="routerChange('/program')"/>
        <h2 style="text-align: center;">编程</h2>
      </div>
      <div>
        <img class="kongzhi" src="@/assets/image/icon_kongzhi_nor.png" alt="" @click="routerChange('/control')"/>
        <h2 style="text-align: center;">控制模式</h2>
      </div>
      <div>
        <img class="home" src="@/assets/image/icon_home_sel.png" alt="" @click="routerChange('/home')"/>
        <h2 style="text-align: center;">主页</h2>
      </div>
      <div>
        <img class="safe" src="@/assets/image/icon_safe_nor.png" alt="" @click="routerChange('/safety')"/>
        <h2 style="text-align: center;">系统安全</h2>
      </div>
      <div>
        <img class="state" src="@/assets/image/icon_state_nor.png" alt="" @click="routerChange('/status')"/>
        <h2 style="text-align: center;">系统状态</h2>
      </div>
        
    </div>
    </div>
    <div class="control-container">
      <controlMode> </controlMode> 
    </div>
    
  </div>
</template>

<script setup>
import { ref,onMounted,reactive,computed,toRaw,watch, onBeforeUnmount, } from "vue";
import { useRouter,onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';
import * as api from '@/api/index.js'
import controlMode from "@/views/control/index.vue"
const router= useRouter()
const store = useStore();
const isControl = ref(false)
const data = reactive({
  
})
onMounted(() => {
  // isControl.value = true
  // console.log("首页",isControl.value);
  
});
const controlModeShow = computed(() => { return store.state.tagView.controlModeShow }  //  /home
)
watch(controlModeShow, (nV) => {
  if (nV) {
    let ele = document.querySelector('div.control-container')
    let homeEle = document.querySelector('div.home-container')
    ele.style.top = 0
    ele.style.zIndex = 10
    ele.style.visibility = 'visible'
    homeEle.style.display = 'none'
  } else {
    let ele = document.querySelector('div.control-container')
    let homeEle = document.querySelector('div.home-container')
    //visibility: hidden
    ele.style.visibility = 'hidden'
    ele.style.top = '120%'
    homeEle.style.display = 'block'
  }
})
const routerChange = (path) => {
  store.commit('tagView/setLogoShow',false);
  if(path === '/control'){
    // console.log("path === '/control'");
    
    store.commit('tagView/setControlModeShow',true);
  }else{
    router.push(path)
    store.commit('tagView/setControlModeShow',false);
  }
}

onBeforeRouteLeave((to, from)=> {
  // console.log(to, from);
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },)

// onBeforeUnmount(() => {
//   console.log("即将销毁");
// })

</script>

<style lang="less" scoped>
.main-container{
  width: 100%;
  height: 100%;
  position: relative;
  .home-container{
    width: 100%;
   height: 100%;
    .middle{
    width: 100%;
  height: 80%;
  background: #ffffff;
  }
  .bottom{
    width: 100%;
  height: 20%;
  padding: 0 100px;
  display: flex;
       justify-content: space-between;
       align-items: center;
  }
  }
  .control-container{
    position: absolute;
    top: 120%;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
}

</style>