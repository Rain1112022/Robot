import { toRaw,computed,reactive,watch } from 'vue'
import SocketService from './websocket'  //ws类
import store from '@/store'  //vuex
import { ElMessage } from 'element-plus'
import {deepCopy} from '@/utils/util.js'

const data = reactive({
  hasToken: null,   //是否登录/认证
  socketLink:{},  //ws实例
  websocketLinkFlag:null,  //ws连接标志
  sendDataParams: {},  //ws发送路径目标点的参数
  temParams:null,   // 接收sendDataParams
  count:0, //运行结束否（当返回的运行标志位RunningFlag == 'FALSE'时，count变成0，RunningFlag == 'TRUE'时变成1）
})
//ws连接配置
const config = {
  url: 'ws://192.169.7.32:9999/websocket',
  msg: (val, ws) => {
    // console.log("msg", val)
    //temParams如果不为null，则说明ws有要send的目标参数（注意一次send之后要及时重新设置为null, 否则会300ms发送一次！）
    if(data.temParams) {
      // console.log("temParams",toRaw(data.temParams));
      let params = data.temParams
      data.temParams = null
      // console.log("temParams",toRaw(params));
      ws.send(JSON.stringify(params));
    }
    //接下来判断resInfo的数据，不同响应数据代表不同的状况
    const resInfo = JSON.parse(val)
    // console.log("resInfo", resInfo)

    //1，resInfo.flag：建立是否成功(推送消息时没有)
    if (resInfo.flag) {
      // console.log("resInfo.flag", resInfo.flag)
      store.dispatch("stateInfo/getWebsocketLinkFlag",true)
    } 

    //2，resInfo.Info：建立成功后单独一个线程推送消息，可进行初始化状态，
    else if(resInfo.Info){
      store.dispatch("stateInfo/getJointInfo", resInfo.Info.JointInfo)
      store.dispatch("stateInfo/getCartInfo", resInfo.Info.CartInfo)
      //或者初始时（不在运动中）
      // console.log(resInfo.Info.RunningFlag)
      if (resInfo.Info.RunningFlag == 'FALSE') {
         // 运动结束，修改playFinished 和buttonUsable
        if (data.count = 1) {
          store.dispatch("stateInfo/getButtonUsable", true).then(() =>{
            data.count = 0
          })
          
        }
      }else if(resInfo.Info.RunningFlag == 'TRUE'){
        data.count = 1
      }
    }
    
    //3，resInfo.Status：建立成功且send信息,表示是否收到合格的send信息；
    else if(resInfo.STATUS){
      console.log("resInfo.STATUS", resInfo.STATUS);
      if(resInfo.STATUS == "FAIL") {
        // ws.close()
        ElMessage({
          message: "数据验证错误",
          type: 'error',
          duration: 1000,
        })
      }else{
        //服务器成功接收 提交按钮状态和send的运动类型
        store.dispatch("stateInfo/getButtonUsable", false)
        let tempV = data.sendDataParams.jointSpace ?
        "jointSpace":
        "tcpSpace"
        store.dispatch("stateInfo/getCurrentSend", tempV)
      }
    }
    
  },
}

data.hasToken = computed(() =>
  window.sessionStorage.getItem("token") || store.state.user.token
)
data.websocketLinkFlag = computed(() =>
  store.state.stateInfo.websocketLinkFlag
)
data.sendDataParams = computed(() =>
  store.state.stateInfo.sendDataParams
)

//若token存在，则创建ws实例
if (data.hasToken) {
  data.socketLink = new SocketService(config)
}
//监听token值，如果token有变，重新创建ws实例
watch(
  () => data.hasToken,
  (newVal, oldVal) => {
    if (newVal) {
      data.socketLink = new SocketService(config)
    }
  }
)
//监听ws连接标志，如果为false,表示连接断开，重新创建ws实例
watch(
  () => data.websocketLinkFlag,
  (newVal, oldVal) => {
    if (!newVal) {
      data.socketLink = new SocketService(config)
    }
  }
)

//监听发送路径目标点的参数,如果有变化说明有send
watch(
  () => data.sendDataParams,
  (newVal, oldVal) => {
    if (newVal) {
      data.temParams = newVal
    }
  }
)  

