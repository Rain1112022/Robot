<template>
  <div class="blocklyView" ref="blocklyView">
    <div id="blocklyDiv" class="blocklyDiv" ref="blocklyDiv">
    </div>
    <xml ref="blocklyToolbox" style="display:none">
      <slot></slot>
    </xml>
  </div>

</template>
<script setup>
import { ref,onMounted, reactive, watch, toRaw, computed, onBeforeUnmount } from "vue";
import '../blockly/customCategory'
import'../blockly/customBlockly.js'
import toolbox from '../blockly/toolbox'
import Blockly from 'blockly'
import BlocklyJS from 'blockly/javascript'
import * as hans from 'blockly/msg/zh-hans'
import { FixedEdgesMetricsManager } from '@blockly/fixed-edges';
import { useStore } from 'vuex';
import { downloadFile} from '@/utils/file.js'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessage, ElMessageBox} from 'element-plus'
Blockly.setLocale(hans);
const store = useStore();
const blocklyToolbox = ref("blocklyToolbox")
const props = defineProps({
  downloadFlag: {
    type:Boolean,
    require:true,
    default:false
  },
  uploadFlag: {
    type:Boolean,
    require:true,
    default:false
  },
  workspaceClearFlag: {
    type:Boolean,
    require:true,
    default:false
  },
});
const data = reactive({
  code: null,// Blockly 生成的代码
  xml: null, //工作区目前编辑的xml dom对象 
  xmlText: null, //xml dom对象转text
  workspace: null, // Blockly 工作区实例
  // blockly参数设定
  options: {
    zoom:
    {
      controls: true,
      wheel: false,//鼠标滚动缩放
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.8,
      scaleSpeed: 1.2
    },
    trashcan:false,//显示或隐藏垃圾箱。如果工具箱有类别，则默认 true，否则为 false。
    scrollbars: true,
    theme: "deuteranopia",
    renderer: "zelos",
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true
      },
      drag: true,
      wheel: true
    },
    oneBasedIndex: true,
    grid:
    {
      spacing: 50,
      length: 3,
      colour: '#ccc',
      snap: true//网格吸附
    },
    toolbox: toolbox,

  },

})

watch(()=>props.downloadFlag,
(nV) => {
  if(nV) {
    data.xml = Blockly.Xml.workspaceToDom(data.workspace)
    console.log("data.xml",data.xml);
    data.xmlText = Blockly.Xml.domToText(data.xml)
    console.log("data.xmlText",data.xmlText);
    let filename = 'toolbox.xml'  //默认toolbox.xml
    downloadFile(data.xmlText, filename)
  }
}
)
watch(()=>props.uploadFlag,
(nV) => {
  if (nV) {
      // 首先清空工作区的内容
      data.workspace.clear();
      let val = store.state.codeOperate.uploadFile
      if (!val || val == '<xml xmlns="https://developers.google.com/blockly/xml"></xml>') {
        ElMessage({
          message: "内容为空",
          type: 'warning',
          duration: 2000,
        })
      } else {
        // 回显数据 需要将保存的 xmlText 转为 xml dom 对象
        data.xmlText = val
        data.xml = Blockly.Xml.textToDom(data.xmlText);
        Blockly.Xml.domToWorkspace(data.xml, data.workspace);
      }
    }
  }
)

watch(()=>props.workspaceClearFlag,
(nV) => {
  if(nV) {
    data.workspace.clear()
    data.code = ''
    store.dispatch("codeOperate/getBlocklyCode",data.code)
  }
}
)

const initBlockly = () => {
   // 在生成JavaScript代码之前通过设置STATEMENT_PREFIX和STATEMENT_SUFFIX在逐条语句上添加前缀和后缀;
   BlocklyJS.javascriptGenerator.STATEMENT_PREFIX = 'ID(%1)';
  // 将ID添加为保留字
  BlocklyJS.javascriptGenerator.addReservedWords('ID');
  BlocklyJS.javascriptGenerator.STATEMENT_SUFFIX = 'ID(%1);';
  BlocklyJS.javascriptGenerator.addReservedWords('ID');
  // 注入到 blocklyDiv 中
  data.workspace = Blockly.inject('blocklyDiv', data.options);
  // 为工作区添加修改事件，触发调用 updateCode 函数
  data.workspace.addChangeListener(updateCode);
  // data.workspace.highlightBlock(id)
}
// 更新当前块对应的 JS 代码
const updateCode = (event) => {
  // 获取当前块对应的 JS 代码
  data.code = BlocklyJS.javascriptGenerator.workspaceToCode(data.workspace);
  if(data.code) store.dispatch("codeOperate/getBlocklyCode",data.code)
  console.log("控制语句", toRaw(data.code));  //string
}


onMounted(() => {
  FixedEdgesMetricsManager.setFixedEdges({
    top: true,
    left: true,
  });
  data.options['plugins'] = {
    metricsManager: FixedEdgesMetricsManager,
  }
  initBlockly()
  if (sessionStorage.getItem("xml")) {
    data.xmlText = sessionStorage.getItem("xml")
    data.xml = Blockly.Xml.textToDom(data.xmlText);
    Blockly.Xml.domToWorkspace(data.xml, data.workspace);
    // sessionStorage.removeItem("xml")
  }
})

onBeforeRouteLeave((to, from, next)=>{
  ElMessageBox.confirm('编辑内容尚未保存，是否保存？', 'Warning', {
      confirmButtonText: '保存',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      customClass: 'toggle-project-modal',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
         console.log('confirm');
         data.xml = Blockly.Xml.workspaceToDom(data.workspace)
         data.xmlText = Blockly.Xml.domToText(data.xml)
         sessionStorage.setItem("xml", data.xmlText)
          done()
        } else {
          done()
        }
      }
    })
      .then(async () => {
        next()
      })
      .catch(() => {
        next()
      })
})


</script>

<style scoped lang="less">
.blocklyView {
  width: 100%;
  height: 100%;
  .blocklyDiv {
    width: 100%;
    height: 100% ;
    background-color: cadetblue;
  }
}
</style>
