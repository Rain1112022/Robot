
<template>
  <div class="common-layout">
    <div class="container">
      <div class="header">
        <Header></Header>
      </div>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>
</template>


<script setup>
import Header from '@/components/Header/index'
import { ref, reactive,toRaw, onMounted,computed,inject} from "vue";
import { useStore } from 'vuex';

const store = useStore();
const data = reactive({
  base3dRobot: {},
  initState:[],
})

onMounted(() => {
  data.initState = store.state.stateInfo.JointInfo
  // data.base3dRobot = new jointBase3d(document.querySelector('canvas.Base3d'), toRaw(data.initState) || [])
  // console.log("App.vue mounted");
  // console.log("关节角度",toRaw(store.state.stateInfo.JointInfo));
        // console.log("末端状态",toRaw(store.state.stateInfo.CartInfo));
})

</script>



<style lang="less">

* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
div{
  box-sizing: border-box;
}
.common-layout{
  height: 100%;
  width: 100%;
  background: #ECF0F5;
  .container{
    height: 100%;
    width: 100%;
    .header{
      width: 100%;
      height: 10%;
      padding: 10px 20px;
    }
    .main{
      width: 100%;
      height: calc(100% - 10%);
      padding:10px  0px;
    }
  }
}

</style>
