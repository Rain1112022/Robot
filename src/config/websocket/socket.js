import { toRaw,computed,reactive,watch } from 'vue'
import {SyncWS} from '@/config/websocket/websocket.js'  //ws类
import store from '@/store'  //vuex
import {formatNumber} from '@/utils/util' 
import { ElMessage } from 'element-plus'
const data = reactive({
  hasToken: null,   //是否登录/认证
  socketLink:{},  //ws实例
  websocketLinkFlag:null,  //ws连接标志
})
//ws连接配置
const config = {
  url: process.env.VITE_APP_WS_BASE_URL + '/ws_sync',
  getMsg: (val) => {
    // console.log("getMsg",  val)
    const resInfo = JSON.parse(val)
    //resInfo.flag：建立是否成功(推送消息时没有)
    //resInfo.Info：建立成功后线程推送消息，可进行同步状态，
    // console.log("resInfo", resInfo.Info)
     if(resInfo.Info && resInfo.Program){
      store.dispatch("stateInfo/getJointInfo", formatNumber(resInfo.Info.JointInfo))
      store.dispatch("stateInfo/getCartInfo", formatNumber(resInfo.Info.CartInfo))
      // store.state.stateInfo.deviceMode 
      store.dispatch("stateInfo/getDeviceMode", resInfo.Info.Mode)
      //CurCmd”:{space: null, "point":[]}   store.state.codeOperate.curSend  
      store.dispatch("codeOperate/getRunMode", resInfo.Program.RunMode)
      store.dispatch("codeOperate/getRunStatus", resInfo.Program.Status)
      store.dispatch("codeOperate/getCurSend", resInfo.Program.CurCmd)
      store.dispatch("codeOperate/getRunFinish", resInfo.Program.Finish)

    }
  },
}

data.hasToken = computed(() =>
  window.sessionStorage.getItem("token") || store.state.user.token
)
data.websocketLinkFlag = computed(() =>
  store.state.stateInfo.websocketLinkFlag
)
// if(!data.websocketLinkFlag){
//   ElMessage({
//     message:'websocket未连接!',
//     type:'error',
//     duration: 1000
//   })
// }

//若token存在，则创建ws实例
if (data.hasToken) {
  store.commit('user/setDeviceConnect',"已连接")
  store.commit('user/setDevicePower',"on")
  data.socketLink = new SyncWS(config)
}else {
  ElMessage({
    message:'设备未连接!',
    type:'error',
    duration: 2000
  })
  // data.socketLink = new SyncWS(config)
}
//如果token有变，重新创建ws实例
watch(
  () => data.hasToken,
  (newVal, oldVal) => {
    if (newVal) {
      data.socketLink = new SyncWS(config)
    }
  }
)
//如果ws连接标志为false,表示连接断开，重新创建ws实例
watch(
  () => data.websocketLinkFlag,
  (newVal, oldVal) => {
    if (!newVal) {
      ElMessage({
        message:'websocket连接异常!',
        type:'error',
        duration: 2000
      })
      // store.dispatch("stateInfo/websocketLinkFlag", false)
      // data.socketLink = new SyncWS(config)
    }
  },
  // {immediate:true}
)

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接
// window.onbeforeunload = function () {
//   console.log("监听窗口关闭事件,主动去关闭websocket连接");
//   data.socketLink = null
// }  