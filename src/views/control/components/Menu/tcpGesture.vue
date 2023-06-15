<template>
  <div class="tcp-gesture">
    <el-card class="tcp-gesture-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 28px;font-weight: 600;">Tcp姿态控制</span>
      </div>
    </template>
    <div class="card-body">
      <el-row class="top">
      <el-col :span="8" v-for="item in data.angleArr" :key="item" >
        <p style="font-size: 14px;color: #0075FF; text-align: center;width: 110px;">{{item.name}}</p>
        <el-row>
          <el-col :span="21">
            <el-input-number v-model="item.num" :precision="3" :controls="false" style="width: 110px;"/>
          </el-col>
          <el-col :span="3">
            <span style="font-size: 14px; vertical-align: top;">{{'&deg;'}}</span>
          </el-col>
        </el-row>
          
      </el-col>
     </el-row>
     <el-row class="bottom">
      <el-col :span="12">
        <div class="handle-rz">
          <button @click="clickControl(2, 'arrow-left-rz',true)" class="arrow-left-rz" id="arrow-left-rz"></button>
          <button @click="clickControl(2, 'arrow-right-rz',false)" class="arrow-right-rz" id="arrow-right-rz"></button>
          <img style="height: 50%;" src="@/assets/image/handle_rz.png" alt="">
        </div>
        
      </el-col>
      <el-col :span="12">
        <div class="handle-rxry">
          <button @click="clickControl(1, 'arrow-up-rxry',true)" class="arrow-up-rxry" id="arrow-up-rxry"></button>
          <button @click="clickControl(1, 'arrow-down-rxry',false)" class="arrow-down-rxry" id="arrow-down-rxry"></button>
          <button @click="clickControl(0, 'arrow-left-rxry',true)" class="arrow-left-rxry" id="arrow-left-rxry"></button>
          <button @click="clickControl(0, 'arrow-right-rxry',false)" class="arrow-right-rxry" id="arrow-right-rxry"></button>
          <img style="height: 80%" src="@/assets/image/handle_rxry.png" alt="">
        </div>
        
      </el-col>
     </el-row>
    </div>
  </el-card>
</div>
  
</template>

<script setup>
import { ref,reactive, onMounted,computed,toRaw,inject,watch } from "vue";
import { ElMessage } from 'element-plus'
import * as api from '@/api/control.js'
import {_throttle} from '@/utils/util.js'
import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
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
  isSuccess:true,
  reqMoveArr: [0,0,0,0,0,0], //请求的tcp位置信息
  resMoveArr :[{ //响应的关节位置信息
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
  CartInfo:[],
})
const emit = defineEmits(["setRotation"]);
data.CartInfo = computed(() => {
    return store.state.stateInfo.CartInfo
  })
watch(
  () => data.CartInfo,
  (newVal, oldVal) => {
    // console.log("监听CartInfo", toRaw(newVal));
    data.CartInfo.forEach((item, index) => {
      if (index < 3) {
        data.reqMoveArr[index] = item
      } else {
        data.reqMoveArr[index] = item
        data.angleArr[index - 3].num = item
      }
    })
  }
)
const clickControl = _throttle((i, val, flag) => {
  let arrowTemp = document.getElementById(val)
  arrowTemp.style.opacity = 0.5
  setTimeout(()=>{
    arrowTemp.style.opacity = 0
  },100)
  data.reqMoveArr[i] = flag ? ++data.reqMoveArr[i] : --data.reqMoveArr[i]
  let params = {movj: data.reqMoveArr}
  api.tcpGesture(params).then((res) => {
    console.log("tcp姿态步进", res)
    if (res.STATUS == 'SUCCESS') {
       // 响应成功，返回成功后的关节信息，然后把关节信息（resMoveArr）传入函数，使模型转动
      emit("setRotation", flag ? data.resMoveArr[i].num : -data.resMoveArr[i].num, data.resMoveArr[i].joint, data.resMoveArr[i].direction );

      // data.angleArr[i].num = flag ?  ++data.angleArr[i].num :  --data.angleArr[i].num
      //处理响应的关节位置信息
      ElMessage({
        message: `${ data.angleArr[i].name}运动完成`,
        type: 'success',
        duration: 1000,
      })
    }
  }).catch((error) => {
    console.log(error);
  })
},2000,1)



// onMounted(async () => {
//   // console.log("tcp姿态控制");
//   data.CartInfo = computed(() => {
//     return store.state.stateInfo.CartInfo
//   })
//   data.CartInfo.forEach((item, index) => {
//     if (index < 3) {
//       data.reqMoveArr[index] = item
//     } else {
//       data.reqMoveArr[index] = item
//       data.angleArr[index - 3].num = item
//     }
//   })
//   // console.log("末端状态",toRaw(data.CartInfo),);
//   // console.log(toRaw(data.angleArr));
//   // console.log(toRaw(data.reqMoveArr));
// });


</script>

<style lang="less" scope>
.tcp-gesture-card {
  width: 430px;
  height: 320px;
  .el-card__header{
    padding: 10px;
  }
  .el-card__body{
    width: 100%;
    height: calc(100% - 60px);
    .card-body{
    width: 100%;
    height: 100%;
    .bottom{
      margin-top: 10px;
      .el-col{
        display: flex;
      justify-content: center;
      align-items: center;
      .handle-rz{
          position: relative;
          width: fit-content;
          height: fit-content;
          .arrow-left-rz{
            position: absolute;
            top: 20px;
            left: 0;
            width: 60px;
            height: 45px;
            outline: none;
            border-radius: 200px 0 0 20px;
            opacity: 0;
            border: 0;
            background-color: cadetblue;
          }
          .arrow-right-rz{
            position: absolute;
            top: 20px;
            right: 0;
            width: 60px;
            height: 45px;
            outline: none;
            border-radius: 0 200px 20px 0 ;
            opacity: 0;
            border: 0;
            background-color: cadetblue;
          }
        }
        .handle-rxry{
          position: relative;
          width: fit-content;
          height: fit-content;
          .arrow-up-rxry{
            position: absolute;
            top: 0px;
            left: 50px;
            width: 60px;
            height: 60px;
            outline: none;
            border-radius: 50px 50px 0 0;
            opacity: 0;
            border: 0;
            background-color: cadetblue;
          }
          .arrow-down-rxry{
            position: absolute;
            bottom: 10px;
            left: 50px;
            width: 60px;
            height: 60px;
            outline: none;
            border-radius: 0 0 50px 50px ;
            opacity: 0;
            border: 0;
            background-color: cadetblue;
          }
          .arrow-left-rxry{
            position: absolute;
            top: 50px;
            left: 0;
            width: 60px;
            height: 60px;
            outline: none;
            border-radius: 50px 0 0 50px ;
            opacity: 0;
            border: 0;
            background-color: cadetblue;
          }
          .arrow-right-rxry{
            position: absolute;
            top: 50px;
            right: 0;
            width: 60px;
            height: 60px;
            outline: none;
            border-radius: 0 50px 50px 0  ;
            opacity: 0;
            border: 0;
            background-color: cadetblue;
          }
        }
      }
      
    }
  }
}
}
</style>
