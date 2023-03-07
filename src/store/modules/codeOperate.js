const state = {
  codeOperate:'',
  playCode:[],  //点击运行，对应的操作指令
  isRunning: false,  //是在运行还是暂停
  playFinished:false,
  hasLoop:false, //是否有循环
  loopCount: 1, // 默认循环一次
}

const getters = {}

const actions = {
  getCodeOperate({commit}, codeOperate){
    commit('setCodeOperate',codeOperate )
  },
  getPlayCode({commit}, playCode){
    commit('setPlayCode',playCode )
  },
  getIsRunning({commit}, isRunning){
    commit('setIsRunning',isRunning )
  },
  getPlayFinished({commit}, playFinished){
    commit('setPlayFinished',playFinished )
  },
  getHasLoop({commit}, hasLoop){
    commit('setHasLoop',hasLoop )
  },
}

const mutations = {
  setCodeOperate(state,codeOperate){
    state.codeOperate = codeOperate;
  },
  setPlayCode(state, playCode) {
    state.playCode = playCode
  },
  setIsRunning(state, isRunning) {
    state.isRunning = isRunning
  },
  setPlayFinished(state, playFinished) {
    state.playFinished = playFinished
  },
  setHasLoop(state, hasLoop) {
    state.hasLoop = hasLoop
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}