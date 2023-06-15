<template>
  <div class="toolBox">
    <el-row class="toolbar" >
      <el-col :span="2">
        <el-tooltip placement="top" content="保存">
          <el-button type="text" @click="clickEvent('save')">
           <span class="iconfont robot-baocun"> </span>
          </el-button>
        </el-tooltip>
        
      </el-col>
      <el-col :span="2">
        <el-tooltip placement="top" content="新建">
          <el-button type="text" @click="clickEvent('add')">
           <span class="iconfont robot-xinjian"> </span>
          </el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="2">
        <el-tooltip placement="top" content="上传">
            <div class="upload-container">
            <input id="get-file" class="upload-file" type="file" @change="getFile() ">
            <el-button type="text">
              <span class="iconfont robot-shangchuandaochu"> </span>
            </el-button>
            </div>
          </el-tooltip>
      </el-col>
      <el-col :span="2">
        <el-tooltip placement="top" content="下载">
          <el-button type="text" @click="clickEvent('download')">
              <span class="iconfont robot-xiazaidaoru"> </span>
            </el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="2">
        <el-tooltip v-if="data.runningFlag" placement="top" content="暂停">
          <el-button type="text" @click="clickEvent('pause')">
              <span class="iconfont robot-zanting4"> </span>
            </el-button>
        </el-tooltip>
        <el-tooltip v-else placement="top" content="运行">
          <el-button type="text" @click="clickEvent('play')">
              <span class="iconfont robot-kaishi"> </span>
            </el-button>
        </el-tooltip>
        
      </el-col>
      <el-col :span="2">
        <el-tooltip placement="top" content="调试">
          <el-button type="text" @click="clickEvent('debug')" >
              <span class="iconfont robot-debug-"> </span>
            </el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="2">
        
      </el-col>
     
    </el-row>

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
import {downloadFile, uploadFile } from '@/utils/file.js'
import { ElMessage} from 'element-plus'
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
});

const data = reactive({
  emitData:'',
  dialogVisible:false,
  dialogName:'add',
  runningFlag:false
})
const emit = defineEmits(["toolbarEvent"]);

const clickEvent = (val) => {
  if (val == 'save') {
    data.emitData = 'save'
    emit("toolbarEvent", toRaw(data.emitData))
  } else if (val == 'add') {
    data.dialogName = 'add'
    data.dialogVisible = true
  }else if (val == 'upload') {
  }else if (val == 'download') {
    data.dialogName = 'download'
    data.dialogVisible = true
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
    data.emitData = 'download'
    emit("toolbarEvent", toRaw(data.emitData))
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
      store.dispatch("codeOperate/getUploadFile",res)
      data.emitData = 'upload'
      emit("toolbarEvent", toRaw(data.emitData))
    })
}


</script>


<style lang="less" scoped>
.toolBox{
  width:100%; 
  height:100%;
  .toolbar{
    width:100%; 
    height:100%; 
    padding: 0 70px;
    .el-col{
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button{
        width:100%; 
        height:100%; 
        .iconfont{
          font-size: 40px;
        }
      }
      .upload-container{
        width:100%; 
        height:100%; 
        position: relative;
        .upload-file{
          position: absolute;
          width:100%; 
          height:100%; 
          top: 0;
          left: 0;
          opacity: 0;
          z-index:100;
        }
      }

    }
  }
}
</style>