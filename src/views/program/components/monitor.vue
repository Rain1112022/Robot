<template>
  <div class="monitor">
    <el-row>
      <el-col :span="6">{{ "步长:" }}</el-col>
      <el-col :span="6">{{ data.steps }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">{{ "循环:" }}</el-col>
      <el-col :span="6">{{ data.loops + "次" }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">{{ "已完成:" }}</el-col>
      <el-col :span="6">{{ data.count + "次" }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">{{ "用时:" }}</el-col>
      <el-col :span="6">{{ data.time + "ms" }}</el-col>
    </el-row>
    <el-row>
      <p>{{ "控制语句输出：" }}</p>
      <code>{{ code }}</code>
    </el-row>
    <el-row>
      <p>{{ "处理控制语句:" }}</p>
      <div>{{ playCode }}</div>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, inject, watch, computed } from "vue";
import { useStore } from 'vuex';
const store = useStore();
//声明的props的值是只读readonly的
const props = defineProps({
  runCount: Number,
  playCode:Array,
  code: {
    type:String,
    require:true,
    default:''
  },

});

const data = reactive({
  steps: 0,
  loops: 0,
  count: 0,
  time: 0,
})
const emit = defineEmits([""]);
</script>


<style lang="less" scoped>
.monitor {
  height: 100%;
  width: 100%;

  .el-row {
    height: 10%;
    font-size: 24px;
    line-height:3;
  }

  .el-row:nth-child(1) {
    // background-color: cadetblue;
    border-bottom: 1px solid #999;
  }

  .el-row:nth-child(2) {
    // background-color: rgb(125, 95, 160);
    border-bottom: 1px solid #999;
  }

  .el-row:nth-child(3) {
    // background-color: rgb(235, 149, 51);
    border-bottom: 1px solid #999;
  }

  .el-row:nth-child(4) {
    // background-color: rgb(51, 168, 235);
    border-bottom: 1px solid #999;
  }
}
</style>