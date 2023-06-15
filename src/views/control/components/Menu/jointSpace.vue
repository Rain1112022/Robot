<template>
<div class="joint-space">
  <el-card class="joint-space-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 24px;font-weight: 600;">关节精确控制</span>
      </div>
    </template>
    <div class="card-body">
      <el-row class="card-body-top" style="height: 30%;">
        <el-col :span="16">
          <span :style="spanStyle"></span>
          <span style = "font-size: 24px; color: #0262D3;">关节位置</span>
        </el-col>
        <el-col :span="8">
          <el-button id="moveTo" :disabled = !jointDisabled color="#0075FF" type="primary" round  @click="moveTo()">
            <img src="@/assets/image/icon_position.png" alt="" >
            <span >运行至</span>
          </el-button>
        </el-col>
      </el-row>

     <el-row class="card-body-bottom" style="height: 70%">
      <el-col :span="8" v-for="(item, index) in data.jointArr" >
        <p style="font-size: 14px;color: #0075FF; text-align: center;width: 110px;">{{item.name}}</p>
        <el-row>
          <el-col :span="20">
            <el-input-number v-model="item.num" :precision="3"  :controls="false" style="width: 110px;"/>
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
import { reactive,toRaw,watch,computed, ref} from "vue";
import { useStore } from 'vuex';
import * as api from "@/api/control.js";
const store = useStore();
const spanStyle = {
  'display': 'inline-block',
  'width': '14px',
  'height': '14px',
  'background-color': '#0075FF',
  'transform': 'rotate(45deg)',
  'margin-right' : '10px'
}
const props = defineProps({
  jointDisabled:{
    type:Boolean,
    require: true,
    default: true
  }
})
const disabled = ref(false)

const data = reactive({
  jointArr: [{
    name: '关节一',
    joint: 'J1',
    direction: 'z',
    num: 0
  }, {
    name: '关节二',
    joint: 'J2',
    direction: 'x',
    num: 0
  }, {
    name: '关节三',
    joint: 'B2',
    direction: 'x',
    num: 0
  }, {
    name: '关节四',
    joint: 'J5',
    direction: 'x',
    num: 0
  }, {
    name: '关节五',
    joint: 'J6',
    direction: 'z',
    num: 0
  }, {
    name: '关节六',
    joint: 'T1',
    direction: 'x',
    num: 0
  },],
})
const emit = defineEmits(["moveToParams"]);

//点击运行至
function moveTo() {
  let paramsVal = []
  toRaw(data.jointArr).forEach((item) => {
    paramsVal.push(item.num)
  })

  let params = { space:'jointSpace', point: paramsVal}
  emit("moveToParams", true)
  api.spaceMove(params).then((res) => {
    if(res && res.STATUS == 'SUCCESS') {
      emit("moveToParams", false)
      // console.log("运行：", res);
    }
  })
  
}
</script>

<style lang="less" scope>
.joint-space{
  width: 100%;
  height: 45%; 
  margin-bottom: calc(100% - 90%); 
  .joint-space-card {
  width: 100%;
  height: 100%;               
  border: 1px solid #696b6d;
  .el-card__header {
    padding: 10px;
    background: rgb(234, 235, 237);
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
}

</style>
