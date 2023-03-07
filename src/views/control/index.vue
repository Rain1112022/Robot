<template>
  <div class="control-mode">
    <div class="control-mode-tabs">
      <button class="manual" @click="handleClick">手动控制</button>
      <button class="accurate" @click="handleClick">精确定位</button>
      <button class="IO" @click="handleClick">IO控制</button>
    </div>
    
    <div class="control-mode-content">
      <keep-alive>
        <div class="tab-manual" v-show="data.activeManual">
        <canvas class="Base3d"></canvas>
        <div class="tab-manual-left" v-show="data.isManual">
          <tcpPosition ref="tcpPositionRef" />
          <tcpGesture ref="tcpGestureRef" />
        </div>
    
        <div class="tab-manual-right" v-show="data.isManual">
          <jointPosition @setRotation="setRotation"  ref="jointPositionRef" />
        </div>
        <div class="tab-accurate-left" v-show="data.isAccurate">
          <packingPosition ref="packingPositionRef" />
        </div>
        <div class="tab-accurate-right" v-show="data.isAccurate">
          <jointSpace ref="jointSpaceRef" @setRotation="setRotation" />
          <tcpSpace  ref="tcpSpaceRef" @setRotation="setRotation" />
        </div>
      </div>
      </keep-alive>

      <div class="tab-IO" v-show="!data.activeManual">
        <h1>IO控制</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive, onMounted, computed, toRaw} from "vue";
import tcpPosition from "./components/Menu/tcpPosition.vue";
import tcpGesture from "./components/Menu/tcpGesture.vue";
import jointPosition from "./components/Menu/jointPosition.vue";
import packingPosition from "./components/Menu/packingPosition.vue";
import jointSpace from "./components/Menu/jointSpace.vue";
import tcpSpace from "./components/Menu/tcpSpace.vue";
import jointBase3d from "./components/jointBase3d.js"
import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
  base3d: {},
  activeManual: true,
  isManual:true,
  isAccurate: false,
  isIO:false ,
  isManualFirstShow: true,
  isAccurateFirstShow:true,
  initState:[],
})

onMounted(async () => {
    data.initState = computed(()=> {
      return store.state.stateInfo.JointInfo
    })
    // console.log("机械臂同步",toRaw(data.initState));
    data.base3d = new jointBase3d(document.querySelector('canvas.Base3d'), toRaw(data.initState) || [])
})

const setRotation = (val, name, direction) => {
  // console.log("关节位置设置");
  if(data.activeManual){
    data.base3d.setRobotRotation(val, name, direction)
  }
}

const handleClick = (e) => {
  // console.log(e.target,e.target.textContent); //<button class="manual"> 手动控制
    let targetManual = document.querySelector("button.manual")
    let targetAccurate = document.querySelector("button.accurate")
    let targetIO = document.querySelector("button.IO")
  if(e.target.textContent == '手动控制') {
    targetManual.style.background = 'rgb(22, 138, 233)'
    targetAccurate.style.background = ' #ffffff'
    targetIO.style.background = ' #ffffff'
    data.activeManual = true
    data.isManual = true
    data.isAccurate = false
    
  }else if(e.target.textContent  == '精确定位'){
    targetAccurate.style.background = ' rgb(22, 138, 233)'
    targetManual.style.background = '#ffffff'
    targetIO.style.background = ' #ffffff'
    data.isAccurate = true
    data.isManual = false
    data.activeManual = true
  }else {
    targetAccurate.style.background = ' #ffffff'
    targetManual.style.background = '#ffffff'
    targetIO.style.background = ' rgb(22, 138, 233)'
    data.activeManual = false
  }
}

</script>

<style lang="less" scope>
.control-mode{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  .control-mode-tabs{
    width: 100%;
    height: 60px;
    button{
      font-size: 26px;
    }
    .manual {
        width: calc(100% / 3);
        height: 100%;
        background-color:rgb(22, 138, 233) ;
      }
    .accurate{
      width: calc(100% / 3);
        height: 100%;
    }
    .IO{
      width: calc(100% / 3);
        height: 100%;
    }
  }
  .control-mode-content{
    width: 100%;
    height: calc(100% - 60px);
    background-color: cadetblue;
    .tab-manual{
      width: 100%;
      height: 100%;
      position: relative;
      .tab-manual-left{
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.8;
      }
      .tab-manual-right {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.8;
      }
      .tab-accurate-left{
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.8;
      }
      .tab-accurate-right {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.8;
      }
    }
    .tab-IO{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
