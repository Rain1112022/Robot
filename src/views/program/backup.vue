<template>
  <div class="program">
    <el-row class="blocklyArea" id="blocklyArea">
      <el-col :span="12">
        <h3>编程区</h3>
        <div id="blocklyDiv" class="blocklyDiv" ref="blocklyDiv"></div>
      </el-col>

      <el-col :span="12">
        <div id="codeBox" style = "width:100%; height:100%;">
          <h3>代码区</h3>
          <div style="width:100%; height: calc(100% - 40px); border: 1px solid #dcdfe6;">
            <code>{{data.code}}</code>
          </div>
          
        </div>
      </el-col>
      
    </el-row>
  </div>
</template>

<script setup>
import { ref,onMounted, reactive ,watch,toRaw} from "vue";
import toolboxContents from './components/toolboxContents.json'
import Blockly from 'blockly'
import BlocklyJS from 'blockly/javascript'
import locale from 'blockly/msg/zh-hans';
Blockly.setLocale(locale);

const data = reactive({
  // 工具箱配置
  toolbox: toolboxContents,
  // Blockly 生成的代码
  code: null,
  // Blockly 工作区实例
  workspace: null,
})

onMounted(() => {
  initBlockly()
})

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
}

</script>

<style lang="less" scope>
.program{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .blocklyArea {
      width: 100%;
      height: 100%;
  
      .el-col {
        height: 100%;
  
        h3 {
          height: 40px;
          line-height: 40px;
        }
  
        .blocklyDiv {
          width: 100%;
          height: calc(100% - 40px);
          background-color: cadetblue;
        }
      }
  
    }
}
</style>
