<template>
  <div class="codeBox">
    <h3>操作</h3>
    <div class="toolbar" >
      <el-row justify="center" style="height: 15%;">
        <el-tooltip placement="top" content="add">
          <img class="img-button" id="icon_add" @click="clickEvent('add')" height="66" src="@/assets/image/icon_add.png"
            alt="">
        </el-tooltip>
      </el-row>
      <el-row justify="center" style="height: 15%;">
        <el-tooltip placement="top" content="upload">
            <div class="upload-container">
            <input id="get-file" class="upload-file" type="file" @change="getFile() ">
            <img class="img-button" id="icon_upload" height="66" src="@/assets/image/icon_upload.png" alt="">
            </div>
          </el-tooltip>
      </el-row>
      <el-row justify="center" style="height: 15%;">
        <el-tooltip placement="top" content="download">
          <img class="img-button" id="icon_download" @click="clickEvent('download')" height="66"
            src="@/assets/image/icon_download.png" alt="">
        </el-tooltip>
      </el-row>
      <el-row justify="center" style="height: 15%;">
        <el-tooltip placement="top" content="debug">
          <img class="img-button" id="icon_bug" @click="clickEvent('debug')" height="66" src="@/assets/image/icon_bug.png"
            alt="">
        </el-tooltip>
      </el-row>
      <el-row justify="center" style="height: 15%;">
        <el-tooltip v-if="data.runningFlag" placement="top" content="pause">
          <img class="img-button" id="icon_pause" @click="clickEvent('pause')" height="66"
            src="@/assets/image/icon_pause.png" alt="">
        </el-tooltip>
        <el-tooltip v-else placement="top" content="play">
          <img class="img-button" id="icon_play" @click="clickEvent('play')" height="66" src="@/assets/image/icon_play.png"
            alt="">
        </el-tooltip>
      </el-row>
    </div>

    <el-dialog
    v-model="data.dialogVisible"
    title="提示"
    width="30%"
    >
      <span>{{data.dialogName == 'add'? '要新建工作区内容吗?': '请先保存!'}}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHandle">{{'取消'}}</el-button>
          <el-button type="primary" @click="confirmHandle">
            {{data.dialogName == 'add'? '确定': '保存'}}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw, onMounted, inject, watch, computed } from "vue";
import { downloadFile, uploadFile } from '@/utils/file.js'
import { ElMessage,ElMessageBox } from 'element-plus'
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  runMode: {
    type:String,
    require:true,
    default:''
  },
  runStatus:{
    type:String,
    require:true,
    default:''
  },
  xmlText : String
});

const data = reactive({
  emitData:'save',
  dialogVisible:false,
  dialogName:'add',
  runningFlag:false
})
const emit = defineEmits(["toolbarEvent", 'uploadData']);
watch(() =>props.runStatus,
(nV) => {
  if(nV == "全部完成"){
    data.runningFlag = false
  }
}
)
const clickEvent = (val) => {
  if (val == 'add') {  //'download'
    data.dialogName = 'add'
    data.dialogVisible = true
  }else if (val == 'upload') {
  }else if (val == 'download') {
    //先保存
    data.dialogName = 'download'
    data.dialogVisible = true
    data.emitData = 'save'
    emit("toolbarEvent", toRaw(data.emitData))
  } else if (val == 'debug') {
    data.emitData = 'debug'
    emit("toolbarEvent", toRaw(data.emitData))
  } else if (val == 'play') {
    data.emitData = 'play'
    data.runningFlag = true
    emit("toolbarEvent", toRaw(data.emitData))
  } else if (val == "pause") {
    // 如果是运行按钮，则点击完之后变成暂停，
    data.runningFlag = false
    data.emitData = 'pause'
    emit("toolbarEvent", toRaw(data.emitData))
  }
}
//对话框确认
const confirmHandle = () => {
  data.dialogVisible = false
  if (data.dialogName == 'add') {
    data.emitData = 'add'
    emit("toolbarEvent", toRaw(data.emitData))
  } else if (data.dialogName == 'download') {
    // console.log("props.xmlText",props.xmlText);
    //保存的内容和文件名
    let value = props.xmlText
    let filename = 'toolbox.xml'  //默认toolbox.xml
    downloadFile(value, filename)
  }
}
//对话框取消
const cancelHandle = () => {
  data.dialogVisible = false
  if(data.dialogName == 'add') {

  }else if(data.dialogName == 'download'){
  }
}

 const  getFile = () => {
  let file = document.getElementById('get-file').files[0]
    // console.log("选择上传的文件", file);
     uploadFile(file).then(res=> {
      // console.log(res);
      emit("uploadData", res)
    })
}


</script>


<style lang="less" scoped>
.codeBox{
  width:100%; 
  height:100%;
  .toolbar{
    width:100%; 
    height: calc(100% - 40px); 
    border: 1px solid #dcdfe6;
    padding-top: 50px;
    .el-row{
      .upload-container{
        width:66px; 
        height:66px;
        position: relative;
        .upload-file{
          position: absolute;
          width:66px; 
          height:66px;
          top: 0;
          left: 0;
          opacity: 0;
          z-index:100;
        }
        .img-button{
          position: absolute;
          top: 0;
          left: 0;
        }
      }

    }
  }
}
</style>