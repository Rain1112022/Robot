<template>
  <div class="control-mode">
    <div class="control-mode-tabs">
      <button class="manual" @click="handleClick">手动控制</button>
      <button class="IO" @click="handleClick">IO控制</button>
      <button class="teach" @click="handleClick">示教控制</button>
    </div>

    <div class="control-mode-content">
        <div class="tab-manual" v-show="data.activeManual">
            <canvas class="Base3d"></canvas>
            <div class="tab-manual-left" v-show="data.isManual">
              <jointPosition @setJogMove="setJogMove" ref="jointPositionRef" />
            </div>

            <div class="tab-manual-right" v-show="data.isManual">
              <jointSpace ref="jointSpaceRef" :jointDisabled="data.jointDisabled"
                @moveToParams="moveToParams" />
              <tcpSpace ref="tcpSpaceRef" :tcpDisabled="data.tcpDisabled"
                @moveToParams="moveToParams" />
            </div>
        </div>

        <div class="tab-IO" v-if="data.isIO">
          <h1>IO控制</h1>
          <packingPosition ref="packingPositionRef" />
        </div>

        <div class="tab-teach" v-if="data.isTeach">
          <teach-control></teach-control>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref,reactive, onMounted, computed, toRaw, watch} from "vue";
import jointPosition from "./components/Menu/jointPosition.vue";
import packingPosition from "./components/Menu/packingPosition.vue";
import jointSpace from "./components/Menu/jointSpace.vue";
import tcpSpace from "./components/Menu/tcpSpace.vue";
import teachControl from "./components/Menu/teachControl.vue";
import jointBase3d from "./components/jointBase3d.js"
import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
  base3d: {},
  activeManual: true,
  isManual:true,
  isTeach: false,
  isIO:false ,
  isManualFirstShow: true,
  isAccurateFirstShow:true,
  jointDisabled: true,
  tcpDisabled: true,
  jogMoveFlag:false,
  initState:[],
  socketLink:{},
  JointInfo :[],//vuex中关节信息
})

data.JointInfo = computed(() => {
  return store.state.stateInfo.JointInfo
})

watch(
  () => data.JointInfo,
  (newVal, oldVal) => {
    if (Array.isArray(newVal)) {
      // console.log("JointInfo变化", newVal);
      if (data.jogMoveFlag || store.state.stateInfo.websocketLinkFlag) {
        setRotation(toRaw(newVal))
      }
    }
  }
)

const setRotation = (val) => { 
  // console.log("关节位置设置");
  if(data.activeManual){
    data.base3d.setRobotRotation(val)
  }
}

const setJogMove = (val) => {
  // console.log("jog");
  if(val.info){
    data.jogMoveFlag = true
  }
}
//收到要运行至目标点的消息
const moveToParams = (sendFlag) => {
  if(sendFlag){
    data.jointDisabled = false
    data.tcpDisabled = false
  }else{
    data.jointDisabled = true
    data.tcpDisabled = true
  }
 
}

const handleClick = (e) => {
  // console.log(e.target,e.target.textContent); //<button class="manual"> 手动控制
    let targetManual = document.querySelector("button.manual")
    let targetTeach = document.querySelector("button.teach")
    let targetIO = document.querySelector("button.IO")
  if(e.target.textContent == '手动控制') {
    targetManual.style.background = 'rgb(22, 138, 233)'
    targetTeach.style.background = ' #ffffff'
    targetIO.style.background = ' #ffffff'
    data.activeManual = true
    data.isManual = true
    data.isTeach = false
    data.isIO = false
  }else if(e.target.textContent  == '示教控制'){
    targetTeach.style.background = ' rgb(22, 138, 233)'
    targetManual.style.background = '#ffffff'
    targetIO.style.background = ' #ffffff'
    data.isTeach = true
    data.isManual = false
    data.activeManual = false
    data.isIO = false
  }else {
    targetTeach.style.background = ' #ffffff'
    targetManual.style.background = '#ffffff'
    targetIO.style.background = ' rgb(22, 138, 233)'
    data.activeManual = false
    data.isTeach =  false
    data.isManual = false
    data.isIO = true
  }
}

onMounted( () => {
    data.initState = store.state.stateInfo.JointInfo
    console.log("机械臂同步",toRaw(data.initState));
    data.base3d = new jointBase3d(document.querySelector('canvas.Base3d'), toRaw(data.initState) || [])
})
</script>

<style lang="less" scope>
.control-mode{
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
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
    .teach{
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
    // background-color: cadetblue;
    .tab-manual{
      width: 100%;
      height: 100%;
      position: relative;
      .tab-manual-left{
        position: absolute;
        left: 0;
        top: 20px;
        opacity: 0.8;
        width: 360px;
        height: 80%;
      }
      .tab-manual-right {
        position: absolute;
        right: 0;
        top: 20px;
        opacity: 0.8;
        width: 400px;
        height: 80%;
      }
    }
    .tab-IO{
      width: 100%;
      height: 100%;
    }
    .tab-teach{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
