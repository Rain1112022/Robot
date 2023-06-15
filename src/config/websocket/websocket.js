import { ElMessage } from 'element-plus';
import store from '@/store'
export class SyncWS{
  constructor(config) {
    this.ws = null; 
    this.wsUrl = null; 
    this.config = config; 
    this.socketLink(config)
  }

  //心跳检测
  socketLink(config) {
    // console.log(config);
    this.wsUrl = config.url;
    this.createWebSocket(this.wsUrl); 
  }

  createWebSocket(url) {
    try {
      if ('WebSocket' in window) {
        this.ws = new WebSocket(url, 'echo-protocol');
      } else if ('MozWebSocket' in window) {
        this.ws = new MozWebSocket(url, 'echo-protocol');
      } else {
        alert("您的浏览器不支持websocket")
      }
      this.initWebSocket();
    } catch (e) {
      // this.reconnect(url);
      console.log(e);
    }
  }
  
  initWebSocket() {
    this.ws.onclose = () =>{
      // this.reconnect(this.wsUrl);
      console.log("同步ws连接关闭!");
      ElMessage({
        message: "ws连接关闭",
        type: 'error',
        duration: 2000,
      })
      store.dispatch("stateInfo/getWebsocketLinkFlag", false)
    };
    this.ws.onerror = () => {
      // this.reconnect(this.wsUrl);
      console.log("同步ws连接错误!");
      ElMessage({
        message: "ws连接错误!",
        type: 'error',
        duration: 2000,
      })
      store.dispatch("stateInfo/getWebsocketLinkFlag", false)
    };
    this.ws.onopen =  () => {
      console.log(this.config.url +  '连接成功');
      store.dispatch("stateInfo/getWebsocketLinkFlag", true)
    };
    this.ws.onmessage = (event) => { 
      if(event.data){
        this.config.getMsg(event.data)
      }
    };
  }
  
   reconnect(url) {
    setTimeout(()=> { 
      this.createWebSocket(url);
    }, 2000);
  }

}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接
// window.onbeforeunload = function () {
//   console.log("监听窗口关闭事件,主动去关闭websocket连接");
//   this.ws?.close();
// }  




 


