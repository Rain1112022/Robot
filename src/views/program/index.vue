<template>
    <div class="program">
    <el-row class="programContainer" id="programContainer">
      <el-col :span="18">
          <el-row class="toolBoxContainer">
            <toolBox ref="toolBoxRef"  @toolbarEvent="toolbarEvent" />
          </el-row>
          <el-row class="blocklyViewContainer">
            <BlocklyView :downloadFlag="data.downloadFlag" :uploadFlag="data.uploadFlag" :workspaceClearFlag="data.workspaceClearFlag" ref="blocklyViewRef"/>
          </el-row>
        </el-col>

      <el-col :span="6">
        <div id="monitor-container" class="monitor-container" style = "width:100%; height:100%;">
          <div class="monitor-title" style = "width:100%; height:10%;display: flex;justify-content: start;align-items: end;">
            <h3>状态监控</h3>
          </div>
         
          <div  style="width:100%; height: 90%; border: 1px solid #dcdfe6; padding: 10px;">
            <monitor @nextStep="nextStep" />
            </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref,onMounted, reactive ,watch,toRaw, onBeforeUnmount,computed} from "vue";
import { ElMessage, ElMessageBox} from 'element-plus'
import BlocklyView from './components/BlocklyView.vue'
import toolBox from './components/toolBox.vue'
import monitor from './components/monitor.vue'
import { useStore } from 'vuex';
import {wsSendData} from './blockly/util'
import * as api from "@/api/program.js";
import { onBeforeRouteLeave } from 'vue-router'
const store = useStore();
const data = reactive({
  blocklyCode:'',
  playCode:[],  //调试模式指令组
  uploadCode:[],//点击运行提交的代码
  downloadFlag:false,//下载
  uploadFlag:false,//上传
  workspaceClearFlag:false, //清空工作区的内容
})
//blockly输出字符
data.blocklyCode = computed(() => {
  return store.state.codeOperate.blocklyCode
})

const toolbarEvent = (val) => {
  console.log("代码",data.blocklyCode);
  if (!data.blocklyCode) {
    openAlert("message")
  } else {
    if (val == 'save') { // 保存
      store.dispatch("codeOperate/getSaveCode", data.blocklyCode)
    } else if (val == 'add') {// 新建，清空工作区的内容
      data.workspaceClearFlag = true
    } else if (val == 'upload') { //上传
      data.uploadFlag = true
    } else if (val == 'download') { //下载
      data.downloadFlag = true
    } else if (val == 'play') {
      data.uploadCode = data.blocklyCode ? wsSendData(data.blocklyCode) : []
      if(store.state.codeOperate.blockHiatus){
        openAlert("messageBox")
      }else{
        // console.log(store.state.codeOperate.blockHiatus)
        api.runProgram(data.uploadCode).then((res) => {
        console.log("运行", res);
       })
      }
    } else if (val == 'pause') {
    } else if (val == 'debug') {  //调试
      // console.log(store.state.codeOperate.blockHiatus)
      // if(store.state.codeOperate.runStatus)
      data.playCode = data.blocklyCode ? wsSendData(data.blocklyCode) : []
      // console.log("解析结果",data.playCode);
      if(store.state.codeOperate.blockHiatus){
        openAlert("messageBox")
      }else{
        console.log("解析结果",data.playCode);
        // nextStep(true)
      }
    }
  }
}

const nextStep = (val) => {
  console.log("下一步",toRaw(data.playCode),data.playCode.length);
  if (val && data.playCode.length) {
    if(data.playCode.length == 1){
      store.dispatch("codeOperate/getDebugRes", "SUCCESS")
    }
    let params = data.playCode.splice(0,1)[0]
    api.debugProgram(params).then((res) => {
      console.log("debug", res);
    })
  }
 }

 const openAlert = (type)=> {
  if(type == 'message'){
    ElMessage({
      message: "工作区内容为空",
      type: 'warning',
      duration: 2000,
    })
  }else if(type == 'messageBox'){
    ElMessageBox({
    title: '编程错误', 
    message: '编程指令的输入值不能为空!', 
    confirmButtonText: '确定',
    showCancelButton: false,
    type: 'error',
    beforeClose: (action, instance, done) =>{
      if(action === 'confirm'){
        store.dispatch("codeOperate/getBlockHiatus", false)
        done()
      }
    }
  })
  }
}

onMounted(() => {
  window.onbeforeunload = function(e) {
    e.preventDefault();
    return 'tips';
  }
})
onBeforeUnmount(() => {
  window.onbeforeunload =null
})

// onBeforeRouteLeave((to, from, next)=>{
//   store.dispatch("codeOperate/getPlayCode",data.playCode)
//   next()
// })

</script>

<style src="./blockly/toolbox_style.less" lang="less" scope></style>
