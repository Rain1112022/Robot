<template>
  <div class="program">
  <el-row class="blocklyArea" id="blocklyArea">
    <el-col :span="16">
      <h3>编程区</h3>
      <div id="blocklyDiv" class="blocklyDiv" ref="blocklyDiv">
      </div>
    </el-col>

    <el-col :span="6">
      <div id="codeBox" style = "width:100%; height:100%;">
        <h3>状态监控</h3>
        <div  style="width:100%; height: calc((100% - 84px)); border: 1px solid #dcdfe6; padding: 10px;">
          <monitor :runCount="data.runCount" :code="data.code" :playCode="data.playCode"/>
          <!-- <p>{{ "控制语句输出：" }}</p>
          <code>{{data.code}}</code>
          <p>{{ "处理控制语句:" }}</p>
          <div>{{ data.playCode }}</div> -->
          
          </div>
      </div>
    </el-col>
    <el-col :span="2">
      <toolbar ref="toolbarRef" :xmlText ="data.xmlText" @toolbarEvent="toolbarEvent" @uploadData="uploadData"/>
    </el-col>
  </el-row>
</div>
</template>

<script setup>
import { ref,onMounted, reactive ,watch,toRaw, onBeforeUnmount,computed} from "vue";
import { ElMessage,ElMessageBox } from 'element-plus'
import toolbar from './components/toolbar.vue'
import monitor from './components/monitor.vue'
import './blockly/customBlockly.js'
import toolbox from './blockly/toolbox'
import './blockly/customCategory.js'
import Blockly from 'blockly'
import BlocklyJS from 'blockly/javascript'
import locale from 'blockly/msg/zh-hans';
import { useStore } from 'vuex';
import {wsSendData} from '@/utils/util.js'
const store = useStore();
Blockly.setLocale(locale);

const data = reactive({
toolbox: toolbox,// 工具箱配置
code: null,// Blockly 生成的代码
xml:null, //工作区目前编辑的xml dom对象 
xmlText: null, //xml dom对象转text
workspace: null, // Blockly 工作区实例
runCount:0,  //完成过多少次runCount
isFirstRun: true, //首次点击运行
playCode :[], // 解析后的工作区行为 
isFinished: false
})
data.isFinished = computed(() => {
return  store.state.codeOperate.playFinished
})
watch(
() => data.isFinished,
(newVal, oldVal) => {
  if (newVal) {
    //运动完成之后，首次运行变为true
    data.isFirstRun = true
  }
}
)  

onMounted(() => {
window.onbeforeunload = function(e) {
  data.xml = Blockly.Xml.workspaceToDom(data.workspace)
  data.xmlText = Blockly.Xml.domToText(data.xml)
  sessionStorage.setItem("xml",data.xmlText)
  return 'tips';
}                          
initBlockly()
if (sessionStorage.getItem("xml")) {
  uploadData(sessionStorage.getItem("xml"))
  // data.xmlText = sessionStorage.getItem("xml")
  // data.xml = Blockly.Xml.textToDom(data.xmlText);
  // Blockly.Xml.domToWorkspace(data.xml, data.workspace);
  sessionStorage.removeItem("xml")
}
})

const toolbarEvent = (val) => {
if(val == 'add') {
  // 清空工作区的内容
  data.workspace.clear();
} else if (val == 'save') {
  data.xml = Blockly.Xml.workspaceToDom(data.workspace)
  data.xmlText = Blockly.Xml.domToText(data.xml)
  //解析编程代码
  data.playCode = data.code ? wsSendData(data.code) : []
  // console.log("data.playCode", toRaw(data.playCode));
} else if (val == 'unSave') {
  // 清空工作区的内容
  // data.workspace.clear();
} else if (val == 'play') {
  if(data.isFirstRun){//首次点击运行，下发代码
    data.isFirstRun = false
    store.dispatch("codeOperate/getIsRunning", true)
    data.playCode = data.code ? wsSendData(data.code) : []
    store.dispatch("codeOperate/getPlayCode", data.playCode)
  }else{ //不是首次点击运行
  }
} else if (val = 'pause') {
  store.dispatch("codeOperate/getIsRunning", false)
}
}

const uploadData = (val) => {
// 首先清空工作区的内容
data.workspace.clear();
if(val == '<xml xmlns="https://developers.google.com/blockly/xml"></xml>') {
ElMessage({
  message: "内容为空",
  type: 'warning',
  duration: 2000,
})
}else{
// 回显数据 需要将保存的 xmlText 转为 xml dom 对象
data.xmlText = val
data.xml = Blockly.Xml.textToDom(data.xmlText);
Blockly.Xml.domToWorkspace(data.xml, data.workspace);
}
}

// 初始化 Blockly
const initBlockly = () => {
// 注入到 blocklyDiv 中
data.workspace = Blockly.inject('blocklyDiv', {
  toolbox: data.toolbox
});
// 为工作区添加修改事件，触发调用 updateCode 函数
data.workspace.addChangeListener(updateCode);
}
// 更新当前块对应的 JS 代码
const updateCode = () => {
// 获取当前块对应的 JS 代码
data.code = BlocklyJS.javascriptGenerator.workspaceToCode(data.workspace);
// console.log("控制语句", typeof(data.code));  //string
}
onBeforeUnmount(()=> {
// window.onbeforeunload = null
console.log("编程组件实例被卸载之前");
})

</script>

<style src="./blockly/toolbox_style.less" lang="less" scope></style>
