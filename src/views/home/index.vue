<template>
  <div class="main-container">
    <div class="middle">
      <h2>{{data.currentRouter}}</h2>
      <canvas class="Base3d"></canvas>
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
</template>

<script setup>
import { ref,onMounted,reactive,computed,toRaw } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as api from '@/api/index.js'
import gridHelper from "./gridHelper.js"
import SocketService from '@/config/websocket/websocket.js'

const router= useRouter()
const store = useStore();
// const socketLink = {}
const data = reactive({
  base3d: {},
  socketLink:{},
})
onMounted(async () => {
  // console.log("首页");
  data.base3d = new gridHelper(document.querySelector('canvas.Base3d'))
});

const routerChange = (path) => {
  router.push(path)
}

</script>

<style lang="less" scoped>
.main-container{
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
  padding: 10px 100px 0 100px;
  display: flex;
       justify-content: space-between;
       align-items: center;
  }
}

</style>