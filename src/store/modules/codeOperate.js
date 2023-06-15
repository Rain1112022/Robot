const state = {
  playCode:[],  //点击调试，对应的指令集合
  blocklyCode:'', //blockly工作区代码
  saveCode:[],//blockly工作区保存的程序示例
  uploadFile:'',//本地上传的文件
  runMode:"NULL", //运行模式(未设置/调试模式/运行模式)
  runStatus: "NULL",//运行状态(未开始/已暂停/运行中/运行成功/全部完成/运行出错)
  curSend:{space: "NULL", point:[]}, //当前运行的指令
  runFinish: 'NULL', //程序运行结果
  debugRes: 'NULL', //调试结果(NULL/SUCCESS/FAIL)
  nextStepFlag: false, //是否可进行下一步（开始/运行成功时为true
  blockHiatus:false,//block块是否缺失
}

const getters = {
}

const actions = {
  getPlayCode({commit}, playCode){
    commit('setPlayCode',playCode )
  },
  getBlocklyCode({commit}, blocklyCode){
    commit('setBlocklyCode',blocklyCode )
  },
  getSaveCode({commit}, saveCode){
    commit('setSaveCode',saveCode )
  },
  getUploadFile({commit}, uploadFile){
    commit('setUploadFile',uploadFile )
  },
  getRunMode({commit}, runMode){
    commit('setRunMode',runMode )
  },
  getRunStatus({commit}, runStatus){
    commit('setRunStatus',runStatus )
  },
  getCurSend({commit}, curSend){
    commit('setCurSend',curSend )
  },
  getRunFinish({commit}, runFinish){
    commit('setRunFinish',runFinish )
  },
  getDebugRes({commit}, debugRes){
    commit('setDebugRes',debugRes )
  },
  getNextStepFlag({commit}, nextStepFlag){
    commit('setNextStepFlag',nextStepFlag )
  },
  getBlockHiatus({commit}, blockHiatus){
    commit('setBlockHiatus',blockHiatus )
  },
  
 
  
}

const mutations = {
  setPlayCode(state, playCode) {
    if(Array.isArray(playCode)){
      state.playCode = playCode
    }else{
      state.playCode.shift()
    }
  },
  setBlocklyCode(state, blocklyCode) {
    state.blocklyCode = blocklyCode
  },
  setSaveCode(state,saveCode){
    state.saveCode.push(saveCode)
  },
  setUploadFile(state,uploadFile){
    state.uploadFile = uploadFile
  },
  setRunMode(state, runMode) {
    state.runMode = runMode
  },
  setRunStatus(state, runStatus) {
    state.runStatus = runStatus
  },
  setCurSend(state, curSend) {
    state.curSend = curSend
  },
  setRunFinish(state, runFinish){
    state.runFinish = runFinish
  },
  setDebugRes(state, debugRes) {
    state.debugRes = debugRes
  },
  setNextStepFlag(state, nextStepFlag) {
    state.nextStepFlag = nextStepFlag
  },
  setBlockHiatus(state, blockHiatus) {
    state.blockHiatus = blockHiatus
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}