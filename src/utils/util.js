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

//处理正负
function formData (val) {
  if(val.search(/-[0-9]*[1-9][0-9]*/) != -1) {
    let temp = val.match(/-[0-9]*[1-9][0-9]*/)[0]
   return (+temp)
  }else if(val.search(/x|y|z|J|B|Z/) != -1) {
    return val
  }else if (val.search(/-?\d+/) != -1){
    return (+val)
  }else{
    ElMessage({
      message: "输入不能为空",
      type: 'error',
      duration: 2000,
    })
  }
}

//处理匹配
function matchData(str, splitFlag) {
  let splitRes = str.split(splitFlag)//[] 3
  let result = []
  if (splitFlag == 'loop-') {
    for (let i = 0; i < splitRes.length; i++) {
      if (splitRes[i].match(/-loop;/)) {
        let splitLoop = splitRes[i].split('-loop;')
        // console.log(splitLoop);
        if (splitLoop[1] != '') {
          splitRes[i] = splitLoop[0]
          splitRes[i + 1] = splitLoop[1]
        }
      }
    }
    // console.log(splitRes);  //4
    for (let i = 0; i < splitRes.length; i++) {
      let splitAction = matchData(splitRes[i], ';')
      // console.log(splitAction);  //2,5,4,1
      for (let j = 0; j < splitAction.length; j++) {
        if (splitAction[j].name != 'loopTotal') {
          // result.push(splitAction[j])
          result[result.length] = splitAction[j]
        } else {
          // result.push({name:'loop',val:deepCopy(splitAction)})
          result[result.length] = { name: 'loop', val: deepCopy(splitAction) }
          break
        }
      }
    }

  } else {
    for (let i = 0; i < splitRes.length; i++) {
      if (splitRes[i].match(/\d+\{/)) {
        let val = parseInt(splitRes[i].match(/-?\d+/))
        result[result.length] = { name: 'loopTotal', val: val }
        // console.log(i,result[i]);
      }
      if (splitRes[i].match(/reset|delay_send|joint_move|tcp_move|delay_execution|terminal_position|single_joint_revolve/)) {
        let name = splitRes[i].match(/reset|delay_send|joint_move|tcp_move|delay_execution|terminal_position|single_joint_revolve/)[0]
        let val = splitRes[i].match(/reset-(\S*)-reset/) || splitRes[i].match(/delay_send-(\S*)-delay_send/) || splitRes[i].match(/joint_move-(\S*)-joint_move/) || splitRes[i].match(/tcp_move-(\S*)-tcp_move/) || splitRes[i].match(/delay_execution-(\S*)-delay_execution/)|| splitRes[i].match(/terminal_position-(\S*)-terminal_position/)|| splitRes[i].match(/single_joint_revolve-(\S*)-single_joint_revolve/)
        let tempArr = []
        val[1]?.split(',')?.forEach((item, index) => {
          tempArr[index] = formData(item)
        })
        // result.push({name:name,val:tempArr})
        result[result.length] = { name: name, val: tempArr }
      }
    }
  }
  return result
}

// blockly字符串代码解析为指令数组
function analyseCode(data) {
  let playCode = []
  //有循环
  if (data.search('loop') != -1) {
    let res = matchData(data, 'loop-')
    // console.log(res);
    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        if (res[i].name == 'loop') {
          playCode[i] = {
            loopTotal: 0,
            loopAction: []
          }
          playCode[i].loopTotal = res[i].val[0].val
          for (let j = 1; j < res[i].val.length; j++) {
            playCode[i].loopAction[j - 1] = { [res[i].val[j].name]: res[i].val[j].val }
          }
        } else {
          playCode[i] = { [res[i].name]: res[i].val }
        }

      }
    }
    console.log("有循环", playCode);
    return playCode
  } else {  //没有循环,依次顺序执行
    let res = matchData(data, ';')
    // console.log(res);  //[]
    if (res.length) {
      for (let i = 0; i < res.length; i++) {
        playCode[i] = { [res[i].name]: res[i].val }
      }
    }
    
    console.log("没有循环", playCode);
    return playCode
  }
}

//指令数组解析为发送的ws消息格式，并把所有的循环展开，整理为顺序执行的指令
export function wsSendData(data) {
  if (data) {
    let arr = analyseCode(data)
    let wsDataList = [];
    const fn = (arr) => {
      arr.forEach((item, i) => {
        for (let key in item) {
          // console.log("key item[key]", key, item[key]); 
          if (key == "reset") {
            let playCodeParams = { jointSpace: item[key] };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
            // console.log(wsDataList);
          } else if (key == "delay_send") {
            let playCodeParams = { delaySend: item[key] };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (key == "delay_execution") {
            let playCodeParams = { delayExecution: item[key] };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (key == "terminal_position") {
            let playCodeParams = { terminalPosition: item[key] }; //["x",100]
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (key == "single_joint_revolve") {
            let playCodeParams = { singleJointRevolve: item[key] }; //["J1",10]
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (key == "joint_move") {
            // console.log("joint_move");
            let playCodeParams = { jointSpace: item[key] };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (key == "tcp_move") {
            // console.log("tcp_move");
            let playCodeParams = { tcpSpace: item[key] };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (key == "loopTotal") {
            console.log("loop!", item['loopAction']);
            for (let i = 0; i < item[key]; i++) {
              if (item['loopAction'].length) {
                fn(item['loopAction'])
              }
            }
            break;
          }
        }
      });
      return wsDataList
    };
    return fn(arr)
  }
};