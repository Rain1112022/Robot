export default class SocketService{
  constructor(config) {
    this.lockReconnect = false; 
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
      this.initEventHandle();
    } catch (e) {
      this.reconnect(url);
      console.log(e);
    }
  }
  
   initEventHandle() {
    this.ws.onclose = () =>{
      // this.reconnect(this.wsUrl);
      console.log("llws连接关闭!");
    };
    this.ws.onerror = () => {
      // this.reconnect(this.wsUrl);
      console.log("llws连接错误!");
    };
    this.ws.onopen =  () => {
      console.log("llws连接成功!");
    };
    this.ws.onmessage = (event) => { 
      // console.log("message",event);
      this.config.msg(event.data, this.ws)
    };
  }
  
   reconnect(url) {
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    setTimeout(()=> { 
      this.createWebSocket(url);
      this.lockReconnect = false;
    }, 2000);
  }

}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接
// window.onbeforeunload = function () {
//   console.log("监听窗口关闭事件,主动去关闭websocket连接");
//   this.ws?.close();
// }  




 


