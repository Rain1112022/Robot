<template>
  <div class="joint-position">
    <el-card class="joint-position-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 28px;font-weight: 600;">关节位置控制</span>
      </div>
    </template>
    <div class="card-body">
      <el-row v-for="(item, index) in data.jointArr" :key="item" class="card-body-item">
        <el-col class="joint" :span="12">
          <p style="font-size: 14px;color: #0075FF; text-align: center;width: 120px;">{{ item.name }}</p>
          <el-row>
            <el-col :span="16">
            <el-input-number v-model="item.num" :precision="3" :step="1" :controls="false" style="width: 120px;"/>
          </el-col>
          <el-col :span="8">
            <span style="font-size: 14px;vertical-align: top;">{{'&deg;'}}</span>
          </el-col>
          </el-row>
          
        </el-col>
        <el-col :span="12">
          <div class="handle">
            <button @click="clickControl(index, true)" class="arrow-left" :id="'arrow-left' + index"></button>
            <button @click="clickControl(index, false)" class="arrow-right" :id="'arrow-right' + index"></button>
            <img src="@/assets/image/handle.png" alt="">
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</div>
</template>

<script setup>
import { ref, reactive,toRaw, onMounted,computed,inject,watch} from "vue";
import { ElMessage } from 'element-plus'
import * as api from '@/api/control.js'
import {_throttle} from '@/utils/util.js'
import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
  jointArr :[{
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
  clickStep:1,
  isSuccess:true,
  reqMoveArr: [0,0,0,0,0,0],
  JointInfo:[],
});
const emit = defineEmits(["setRotation"]);
data.JointInfo = computed(() => {
  return store.state.stateInfo.JointInfo
})
watch(
  () => data.JointInfo,
  (newVal, oldVal) => {
    // console.log("监听JointInfo", toRaw(newVal));
    data.JointInfo.forEach((item, index) => {
      data.jointArr[index].num = item
      data.reqMoveArr[index] = item
    })
  }
)

onMounted(async () => {
  // console.log("关节位置控制");
  // data.JointInfo = computed(() => {
  //   return store.state.stateInfo.JointInfo
  // })
  // data.JointInfo.forEach((item, index) => {
  //   data.jointArr[index].item = index
  //   data.reqMoveArr[index] = item
  // })
  // console.log("末端状态",toRaw(data.JointInfo),);
  // console.log(toRaw(data.jointArr));
  // console.log(toRaw(data.reqMoveArr));
  
});

const clickControl = _throttle((i, flag)=> {
//发送http请求时，websocket回中断，所以重新建立
if (flag) {
    let arrowLeft = document.getElementById('arrow-left' + i)
    arrowLeft.style.opacity = 0.5
    ++data.reqMoveArr[i]
    setTimeout(function () {
      arrowLeft.style.opacity = 0
    }, 100)
  }else{
    let arrowRight = document.getElementById("arrow-right" + i)
    arrowRight.style.opacity = 0.5
    --data.reqMoveArr[i]
    setTimeout(function () {
      arrowRight.style.opacity = 0
    }, 100)
  }
 
  let params = {movj: data.reqMoveArr}
  // console.log(toRaw(params));
  api.jointPosition(params).then((res) => {
    console.log("joint位置步进", res)
    if (res.STATUS == 'SUCCESS') {
      emit("setRotation", flag ? data.clickStep : -data.clickStep, data.jointArr[i].joint, data.jointArr[i].direction);
      store.dispatch("stateInfo/getWebsocketLinkFlag",false)
      // data.jointArr[i].num = flag ? ++data.jointArr[i].num : --data.jointArr[i].num
      ElMessage({
        message: `${data.jointArr[i].name}运动完成`,
        type: 'success',
        duration: 1000,
      })
    }else if(res.STATUS == 'FAIL'){
      return
    }
  }).catch((error) => {
    console.log(error);
  })
},2000,1)

</script>

<style lang="less" scope>
.joint-position-card {
  width: 430px;
  height: 640px;
  .el-card__header{
    padding: 10px;
  }
  .el-card__body{
    width: 100%;
    height: calc(100% - 60px);
    .card-body{
    width: 100%;
    height: 100%;
    .card-body-item{
      width: 100%;
      height: calc(100% / 6);
      .handle{
        position: relative;
        width: fit-content;
        .arrow-left{
          position: absolute;
          top: 5px;
          left: 0;
          width: 60px;
          height: 60px;
          outline: none; //表单轮廓线消失
          // background: rgba(0,0,0,0);
          border-radius: 50px 0 0 50px;
          opacity: 0;
          border: 0;
          background-color: rgb(22, 219, 226);
        }
        .arrow-right{
          position: absolute;
          outline: none; //表单轮廓线消失
          // background: rgba(0,0,0,0);
          top: 5px;
          right: 0;
          width: 60px;
          height: 60px;
          border-radius: 0 50px 50px 0;
          opacity: 0;
          border: 0;
          background-color: cadetblue;
        }
      }
    }
  }
  }
  
}
</style>
