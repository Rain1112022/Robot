import { ElMessage } from 'element-plus'
//节流: fn 函数, interval 延迟执行毫秒数, type 1 表时间戳版，2 表定时器版
//时间戳和定时器区别：时间戳版本的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候

export function _throttle(fn,interval,type) {
  if(type === 1){
    let previous = 0;
  }else if(type === 2){
    let timeout;
  }
  var interval = interval || 200;
  return function () {
    var th = this;
    var args = arguments;
    if(type === 1){
      let now = Date.now();
      if (now - previous > interval){
        fn.apply(th,args);
        previous = now;
      }
    }else if(type === 2){
      if(!timeout){
        timeout = setTimeout(()=> {
          timeout = null;
          fn.apply(th,args)
        }, interval);
      }
    }
  }
}

//函数防抖:fn 函数, delay 延迟执行毫秒数, immediate true 表立即执行，false 表非立即执行

 export function _debounce(fn,delay,immediate){
  var delay = delay||200;
  var timer;
  return function(){
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    if(immediate){
      var callNow = !timer
      timer = setTimeout(()=>{
        timer = null;
      },delay)
      if (callNow) fn.apply(th, args)
    }else {
      timer = setTimeout(function(){
        timer = null;
        fn.apply(th,args);
      },delay)
    }
  }
}

// js 浮点数的比较
//val1:浮点数1; val2:浮点数2; type:运算类型（+，-，*，/，=）;
export function MathFloatNumber(val1,val2,type){ 
  let intNumber1 = String(val1).split('.')[1].length //浮点数1的小数位数
  let intNumber2 = String(val2).split('.')[1].length  //浮点数2的小数位数
  let bigLength = Math.pow(10, (intNumber1 > intNumber2 ? intNumber1 : intNumber2))  //得到小数位数多的数，并通过Math.pow（）把最多的小数点位数转化为整数，即10的位数次方
  let bigVal1 = val1 * bigLength //得到放大倍数的浮点数1
  let bigVal2 = val2 * bigLength  //得到放大倍数的浮点数2
  switch(type) {
    case 1:
      return (bigVal1 + bigVal2) / bigLength
      break;
    case 2:
      return (bigVal1 - bigVal2) / bigLength
      break;
    case 3:
      return (bigVal1 * bigVal2) / (bigLength * bigLength)
      break;
    case 4:
      return (bigVal1 / bigVal2).toFixed(3)
      break;
    case 5:
      return (bigVal1 === bigVal2)
      break;
    default:
      console.log("类型错误");
  }
}

// 深拷贝
export function deepCopy(obj) {
  if(obj === null || typeof obj !== 'object') return obj
  if(Object.prototype.toString.call(obj) === "[Object Date]") return new Date(obj)
  if(Object.prototype.toString.call(obj) === "[Object RegExp]") return new RegExp(obj)
  if(Object.prototype.toString.call(obj) === "[Object Undefined]") return new Error(obj)

  let newObj = Array.isArray(obj)? [] : {}
  for(let key in obj) {
    if(typeof obj[key] === 'object') {
      newObj[key] = deepCopy(obj[key])
    }else{
      newObj[key] = obj[key]
    }
  }
  return newObj
}

//数字格式化成3位小数
export function formatNumber(data) {
  if(data && typeof data === 'string' && data.indexOf('{') === 0) data = JSON.parse(data)
  if (typeof data === 'number') return (data / 1000).toFixed(3)
  if (typeof data === 'string') {
    return (formData(data) / 1000).toFixed(3)
  }
  if (typeof data === 'object') {
    let res = Array.isArray(data) ? [] : {}
    for (let key in data) {
      res[key] = formatNumber(data[key]);
    }
    return res;
  }
}

export function isNumber(num) {
  return Object.prototype.toString.call(num) === '[object Number]'
}

export function canvasToBase64 (canvas) {
  //canvas的toDataURL():返回一个包含图片展示的data URL，默认格式为png
  let base64Res = canvas.toDataURL('image/png')
  return base64Res
  // base64ToFile(base64Res, 'grid', 'image/png')

}
  

export function getIP(callback) {
  let recode = {};
  let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  // if (!RTCPeerConnection) {
  //   let win = iframe.contentWindow;
  //   RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
  // }
  //创建实例，生成连接
  let pc = new RTCPeerConnection();
  // 匹配字符串中符合ip地址的字段
  function handleCandidate(candidate) {
    let ip_regexp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/;
    let ip_isMatch
    if(candidate.match(ip_regexp)){
      ip_isMatch = candidate.match(ip_regexp)[1];
    }
    
    if (!recode[ip_isMatch]) {
      callback(ip_isMatch);
      recode[ip_isMatch] = true;
    }
  }
  //监听icecandidate事件
  pc.onicecandidate = (ice) => {
    if (ice.candidate) {
      handleCandidate(ice.candidate.candidate);
    }
  };
  //建立一个伪数据的通道
  pc.createDataChannel('');
  pc.createOffer((res) => {
    pc.setLocalDescription(res);
  }, () => {});
 
  //延迟，让一切都能完成
  setTimeout(() => {
    let lines = pc.localDescription.sdp.split('\n');
    lines.forEach(item => {
      if (item.indexOf('a=candidate:') === 0) {
        handleCandidate(item);
      }
    })
  }, 1000);
}
 
