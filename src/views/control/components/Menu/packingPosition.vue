<template>
<div class="packing-position">
  <el-card class="packing-position-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 28px;font-weight: 600;">装箱位置</span>
      </div>
    </template>
    <div class="card-body">
      <el-row class="card-body-top" style="height: 30%;">
        <el-col :span="16">
          <span :style="spanStyle"></span>
          <span style = "font-size: 24px; color: #0262D3;">关节位置</span>
        </el-col>
        <el-col :span="8">
          <div style="width: 120px;height: 38px; background: #0075FF;border-radius: 19px; border: 1px solid #0075FF; display: flex;justify-content: space-evenly;align-items: center;">
            <img src="@/assets/image/icon_position.png" alt="" style = "height: 22px;">
            <span style = "font-size: 20px; color: #FFFFFF;cursor: pointer;">运行至</span>
          </div>
          
        </el-col>
      </el-row>

     <el-row class="card-body-bottom" style="height: 70%">
      <el-col :span="8" v-for="(item, index) in data.jointArr" >
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
import { ref,reactive } from "vue";
import { onMounted } from "vue";
import emitter from "@/utils/bus.js";
const spanStyle = {
  'display': 'inline-block',
  'width': '14px',
  'height': '14px',
  'background-color': '#0075FF',
  'transform': 'rotate(45deg)',
  'margin-right' : '10px'
}
const data = reactive({
  jointArr :[{
  name: '关节一',
  joint: 'D2' ,
  direction:'z',
  num: 0
}, {
  name: '关节二',
  joint: 'D3' ,
  direction:'x',
  num: 0
}, {
  name: '关节三',
  joint: 'B3' ,
  direction:'x',
  num: 0
}, {
  name: '关节四',
  joint: 'D6' ,
  direction:'x',
  num: 0
}, {
  name: '关节五',
  joint: 'D7' ,
  direction:'z',
  num: 0
}, {
  name: '关节六',
  joint: 'D8',
  direction:'x',
  num: 0
},],
  
})

onMounted(async () => {
  // console.log("tcp位置控制");
  //组件2中直接通过on来接收,mitter方法建议放在onMounted中,后面回调函数中处理接收的值.
  emitter.on('jointState', (val) => {
    data.jointArr.forEach((item, index) => {
      item.num = val[index].num || val[index]
    })
  })
});

</script>

<style lang="less" scope>
.packing-position-card {
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
