<template>
  <div class="joint-space">
    <el-card class="joint-space-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 28px;font-weight: 600;">Tcp空间</span>
        </div>
      </template>
      <div class="card-body">
        <el-row class="card-body-top" style="height: 30%;">
          <el-col :span="16">
            <span :style="spanStyle"></span>
            <span style = "font-size: 24px; color: #0262D3;">工具坐标系</span>
          </el-col>
          <el-col :span="8">
            <el-button v-if="data.disabled"  color="#0075FF" type="primary" round>
              <img src="@/assets/image/icon_position.png" alt="" >
              <span @click="moveTo()">运行至</span>
            </el-button>
            <el-button v-else color="#0075FF" type="primary" disabled round>
              <img src="@/assets/image/icon_position.png" alt="" >
              <span>运行至</span>
            </el-button>
          </el-col>
        </el-row>
  
       <el-row class="card-body-bottom" style="height: 35%">
        <el-col :span="8" v-for="(item, index) in data.axleArr" >
          <p style="font-size: 14px;color: #0075FF; text-align: center;width: 110px;">{{item.name}}</p>
          <el-row>
            <el-col :span="20">
              <el-input-number v-model="item.num" :precision="6" :controls="false" style="width: 110px;"/>
            </el-col>
            <el-col :span="4" style="display: flex; align-items: center;">
              <span style="font-size: 14px;">mm</span>
            </el-col>
          </el-row>
        </el-col>
       </el-row>
  
       <el-row class="card-body-bottom" style="height: 35%">
        <el-col :span="8" v-for="(item, index) in data.angleArr" >
          <p style="font-size: 14px;color: #0075FF; text-align: center;width: 110px;">{{item.name}}</p>
          <el-row>
            <el-col :span="20">
              <el-input-number v-model="item.num" :precision="6"  :controls="false" style="width: 110px;"/>
            </el-col>
            <el-col :span="4">
              <span style="font-size: 14px;vertical-align: top;">{{'&deg;'}}</span>
            </el-col>
          </el-row>
            
        </el-col>
       </el-row>
      </div>
    </el-card>
  </div>
  </template>
  
  <script setup>
  import { ref,reactive,onMounted,toRaw,computed,inject,watch } from "vue";
  import emitter from "@/utils/bus.js";
  import { useStore } from 'vuex';
  const store = useStore();
  const spanStyle = {
    'display': 'inline-block',
    'width': '14px',
    'height': '14px',
    'background-color': '#0075FF',
    'transform': 'rotate(45deg)',
    'margin-right' : '10px'
  }
  const data = reactive({
    axleArr: [{
      name: 'X',
      num: 0,
    }, {
      name: 'Y',
      num: 0,
    }, {
      name: 'Z',
      num: 0,
    },],
    angleArr: [{
      name: 'Rx',
      num: 0,
    }, {
      name: 'Ry',
      num: 0,
    }, {
      name: 'Rz',
      num: 0,
    },],
    jointArrMove :[{
      name: '关节一',
      joint: 'J1' ,
      direction:'z',
      num: 0
    }, {
      name: '关节二',
      joint: 'J2' ,
      direction:'x',
      num: 0
    }, {
      name: '关节三',
      joint: 'B2' ,
      direction:'x',
      num: 0
    }, {
      name: '关节四',
      joint: 'J5' ,
      direction:'x',
      num: 0
    }, {
      name: '关节五',
      joint: 'J6' ,
      direction:'z',
      num: 0
    }, {
      name: '关节六',
      joint: 'T1',
      direction:'x',
      num: 0
    },],
    disabled:true,
    currentSend:'',
    movInfo:[],
    jointStateInfo:[],
    socketLink: {},
    CartInfo: [], //vuex中末端信息
    JointInfo :[],
  })
  const emit = defineEmits(["setRotation"]);
  //计算按钮状态
  data.disabled = computed(() => {
    return store.state.stateInfo.buttonUsable
  })
  
  data.currentSend =  computed(() => {
      return store.state.stateInfo.currentSend
   })
  
  //如果此时有运动，且运动不是关tcp空间，调用changeState()显示tcp信息,调用setRotation，机械臂运动
  watch(
    () => data.currentSend,
    (newVal, oldVal) => {
      if (newVal) {
        // console.log("currentSend",toRaw(newVal));
        if (newVal == 'jointSpace') {
          changeState()
        }
      }
    })
  
  function changeState() {
    // console.log(111);
    data.CartInfo = computed(() => {
      return store.state.stateInfo.CartInfo
    })
    data.JointInfo = computed(() => {
      return store.state.stateInfo.JointInfo
    })
    watch(
      () => data.CartInfo,
      (newVal, oldVal) => {
        data.axleArr.forEach((item, index) => {
          item.num = newVal[index]
        })
        data.angleArr.forEach((item, index) => {
          item.num = newVal[index + 3]
        })
        data.jointArrMove.forEach((item, i) => {
          item.num = data.JointInfo[i]
        })
        emit("setRotation", toRaw(data.jointArrMove),null,null);
      }
    )
    
  
  }
  
  function moveTo() {
    let paramsAxle = []
    let paramsAngle = []
    toRaw(data.axleArr).forEach((item) => {
      paramsAxle.push(item.num)
    })
    toRaw(data.angleArr).forEach((item) => {
      paramsAngle.push(item.num)
    })
    let params = { "tcpSpace": [...paramsAxle, ...paramsAngle] }
    store.dispatch("stateInfo/getSendDataParams",params)
  }
  
  onMounted(() => {
    // console.log("Tcp空间");
    // emitter.on('tcpStateInfo', (val) => {
    //   // console.log('tcpStateInfo',val);
    //   data.axleArr.forEach((item, index) => {
    //     item.num =val[index]
    //   })
    //   data.angleArr.forEach((item, index) => {
    //     item.num = val[index + 3]
    //   })
    // })
  });
  
  </script>
  
  <style lang="less" scope>
  .tcp-space-card {
    width: 480px;
    height: 320px;
    border: 1px solid #696b6d;
  
    .el-card__header {
      padding: 10px;
      background: #F7FAFD;
    }
  
    .el-card__body {
      width: 100%;
      height: calc(100% - 60px);
  
      .card-body {
        width: 100%;
        height: 100%;
      }
    }
   
  }
  </style>
  