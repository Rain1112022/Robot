import { ElMessage, ElMessageBox} from 'element-plus'
import store from "@/store/index.js"
//处理正负
function formData (val) {
  let reg = /-?\d+/
  let t = reg.exec(val)
  if(t && t.length) {
    // console.log("t",t);
    return t[0]
  }else{

  }
}
//有循环
function splitLoop(str, splitFlag) {
  let _result = [];
  let _tempI = -1 //字符串读取的指针
  let _loopPair = []  // 配对的循环语句
  let _loopStart = -1 //循环语句的起始
  let _loopEnd = -1//循环语句的起结束
  let _charsArr = str.split('');
  // console.log("_charsArr", _charsArr);
  // console.log("_charsArr", _charsArr[76], _charsArr[107]); //I 2
  // console.log("_charsArr", _charsArr[111], _charsArr[142]);
  // console.log("_charsArr", _charsArr[493], _charsArr[524]);
  // console.log("_charsArr", _charsArr[466], _charsArr[357], _charsArr[635]);//I I I
  // 第一个组内容为 ID(20-24位除换行符之外的任意字符) ; 第二个组内容为loop- 一个或多个[0-9]之间的数字;  全局
  let _lpreg = /(ID\(.{20,24}\))(loop-\d+)/g;
  let _lpregRes = ''
  //循环处理匹配结果
  while ((_lpregRes = _lpreg.exec(str)) != null) {
    // console.log(_lpregRes);
    // console.log(str.indexOf(_lpregRes[0])); 
    // console.log(str.indexOf(_lpregRes[0])+ 31); 
    // console.log(_lpregRes[2].match(/\d+/g));  
    // console.log(_lpregRes[1].split('').length); 
    if (_lpregRes.length) {
      //循环的开始和结束索引（以I开头，以循环次数结尾）
      let _srartI = str.indexOf(_lpregRes[0])
      let _endI = str.indexOf(_lpregRes[1], (str.indexOf(_lpregRes[0]) + 31))
      let _loopTotal = _lpregRes[2].match(/\d+/g)[0]
      let _loopId = _lpregRes[1]
      _loopStart = _loopStart > 0 ? Math.min(_loopStart, _srartI) : _srartI
      _loopEnd = _loopEnd > 0 ? Math.max(_loopEnd, _endI) : _endI
      //保证下一个循环不在这个循环里（避免嵌套）
      if (_srartI > _tempI && _endI > _tempI) {
        _tempI = _endI
        _loopPair.push({
          srartI: _srartI,
          endI: _endI,
          loopTotal: _loopTotal,
          loopId: _loopId,
        })
      }
    }
  }
  // console.log("_loopPair", _loopPair);
  // console.log("_loopStart", "_loopEnd", _loopStart, _loopEnd);
  // let _splitRes = str.split(splitFlag); //[] 3
  // console.log(splitFlag, _splitRes);
  if (_loopPair.length) {
    //_loopStart 和 _loopEnd若不在开头结尾，说明循环之前/之后还有语句
    let _hasHead = _loopStart > 40
    let _hasFoot = _loopEnd < (_charsArr.length - 40)
    // console.log("_hasHead", "_hasFoot", _hasHead, _hasFoot);
    if (_hasHead) {
      let _str = str.slice(0, _loopStart)
      let _tempRes = splitSemicolon(_str, ";")
      if (_tempRes.length) {
        for (let i = 0; i < _tempRes.length; i++) {
          _result[_result.length] = _tempRes[i]
        }
      }
    }
    //拿到同级的循坏结构
    for (let i = 0; i < _loopPair.length; i++) {
      _result[_result.length] = {
        name: "loop",
        val: _loopPair[i],
      }
    }
    if (_hasFoot) {
      let _str = str.slice(_loopEnd)
      let _tempRes = splitSemicolon(_str, ";")
      if (_tempRes.length) {
        for (let i = 0; i < _tempRes.length; i++) {
          _result[_result.length] = _tempRes[i]
        }
      }
    }
    // console.log("**************", _result);
  }
  //返回结果，这一级的遍历完成
  return _result;
}
//没有循环
function splitSemicolon(str, splitFlag) {
  let _result = [];
  let _reg = /(ID\(.{20,24}\))(reset|delay_send|joint_move|tcp_move|delay_execution|terminal_position|single_joint_revolve)-(\(.{1,55}\))-\2/g;
  let _regRes =''
  while ((_regRes = _reg.exec(str)) != null){
    // console.log("_regRes",_regRes);
    if (_regRes.length) {
      let _id = _regRes[1]
      let _name = _regRes[2]
      let _val = _regRes[3]
      let _tempArr = [];
      _val.split(",")?.forEach((item, index) => {
        if(formData(item)){
          _tempArr[index] = formData(item);
        }else{
          store.dispatch("codeOperate/getBlockHiatus", true)
        }
       
      });
      _result[_result.length] = { id: _id, name: _name, val: _tempArr };
    }
  }
  return _result;

}
//blockly字符串代码解析为指令数组
function analyseCode(data){
  let playCode = [];
  //有循环
  if (data.search("loop") != -1) {
    const hasLoop = (data) => {
      let result = []
      let res = splitLoop(data, "loop-");
      // console.log("splitLoop有循环", res);
      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].name == "loop") {
            result[i] = {
              id: res[i].val.loopId,
              name: res[i].name,
              loopTotal: res[i].val.loopTotal,
              loopAction: [],
            }
            let tempStr = data.slice(res[i].val.srartI + 32, res[i].val.endI - 5)
            // console.log(tempStr); //{}
            if(tempStr.search("loop") != -1){
              result[i].loopAction = hasLoop(tempStr)
              // console.log( "##############",result[i].loopAction );
            }else{
              result[i].loopAction = splitSemicolon(tempStr, ";");
            }
          } else {
            result[i] = res[i]
          }
        }
     }
     return result
    }
    playCode = hasLoop(data)
    // console.log("playCode有循环##########",playCode );
    return playCode
  } else {
    //没有循环,依次顺序执行
    playCode = splitSemicolon(data, ";");
    // console.log("playCode没有循环########", playCode);
    return playCode
  }
}
//指令数组解析为发送的ws消息格式，并把所有的循环展开，整理为顺序执行的指令
export function wsSendData(data){
  if (data && typeof data == 'string') {
    let arr = analyseCode(data)
    let wsDataList = [];
    const fn = (arr) => {
      arr.forEach((item, i) => {
        if (item.name == 'loop') {
          // console.log("loop!",item);
          if (item.loopTotal) {
            for (let i = 0; i < item.loopTotal; i++) {
              if (item.loopAction && item.loopAction.length) {
                fn(item.loopAction)
              }
            }
          }
        } else {
          if (item.name == 'reset' || item.name == 'joint_move') {
            let playCodeParams = { jointSpace: item.val };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (item.name == 'tcp_move') {
            let playCodeParams = { tcpSpace: item.val };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (item.name == "delay_send") {
            let playCodeParams = { delaySend: item.val };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (item.name == "delay_execution") {
            let playCodeParams = { delayExecution: item.val };
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (item.name == "terminal_position") {
            let playCodeParams = { terminalMove: item.val }; //["x",100]
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          } else if (item.name == "single_joint_revolve") {
            let playCodeParams = { singleJointMove: item.val }; //["J1",10]
            wsDataList.push(JSON.parse(JSON.stringify(playCodeParams)))
          }
        }
      });
      return wsDataList
    };
    return fn(arr)
  }
}


