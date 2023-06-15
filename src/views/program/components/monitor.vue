<template>
  <div class="monitor">
    <el-row>
        <el-col :xs="10" :sm="10" :lg="6" >{{ "当前模式:" }}</el-col>
        <el-col :xs="8" :sm="8" :lg="6" >
          <el-tag :type="runMode.type" effect="dark">{{ runMode.label }}</el-tag>
        </el-col>
    </el-row>
    <el-row>
      <el-col :xs="10" :sm="10" :lg="6" >{{ "运行状态:" }}</el-col>
      <el-col :xs="8" :sm="8" :lg="6" >
        <el-tag :type="runStatus.type" effect="dark">{{ runStatus.label }}</el-tag>
      </el-col>
      <el-col v-show="runStatus.label == '运行成功'" :xs="6" :sm="6" :lg="12">
          <el-button type="primary" size="small" @click="handleNextStep">下一步<el-icon><Bottom /></el-icon></el-button>
        </el-col>
    </el-row>
    <el-row v-if="runStatus.label == '运行中' && runMode.label  != '未设置'">
      <p class="currennt-send">当前运行:{{ curSend}}</p>
    </el-row>

  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex';
const store = useStore();
//readonly
const props = defineProps({});
const emit = defineEmits(["nextStep",]);
//运行模式
const runMode = computed(() => {
  switch(store.state.codeOperate.runMode){
    case "NULL":
      return {
        type:'danger',
        label:"未设置"
      }
      break;
    case "RUN":
      return{
        type:'success',
        label:"运行模式"
      }
    break;
    case "DEBUG":
      return{
        type:'',
        label:"调试模式"
      }
    break;
  }
})
//运行状态
const runStatus = computed(() => {
  switch(store.state.codeOperate.runStatus){
    case "NULL":
      return {
        type:'info',
        label:"未开始"
      }
      break;
    case "RUNNING":
      return{
        type:'',
        label:"运行中"
      }
    break;
    case "SUCCESS":
      return{
        type:'success',
        label: store.state.codeOperate.runFinish == 'SUCCESS' || store.state.codeOperate.debugRes == 'SUCCESS' ? "全部完成":"运行成功"
      }
    break;
    case "FAIL":
      return{
        type:'danger',
        label:"运行出错"
      }
    break;
  }
})
//当前运行
const curSend = computed(() => {
  let current = store.state.codeOperate.curSend
  let key =  current.space =="jointSpace"? "关节运动":current.space =="tcpSpace"?"TCP运动":""
  let value = current.point
  return key + ":"+ "[" + value+ "]"

})


const handleNextStep = () => {
  emit("nextStep", true)
}
</script>

<style lang="less" scoped>
.monitor {
  height: 100%;
  width: 100%;

  .el-row {
    height: 10%;
    font-size: 20px;
    line-height:3;
    .currennt-send{
      font-size: 16px;
      overflow:hidden;
      white-space:no-wrap;
      text-overflow: ellipsis;
    }
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