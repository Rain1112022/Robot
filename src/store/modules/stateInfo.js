
const state = {
  JointInfo :[0,0,0,0,0,0], //关节角度
  CartInfo :[0,-0.1925,0.7875,90,0,0], //末端状态
  websocketLinkFlag: false, // 连接是否建立
  sendDataParams:{}, //发送路径目标点的参数
  buttonUsable: true,//运行是否结束（精确定位如果有点击按钮，其他按钮要处于禁用状态
  currentSend:'',//当前send的运动类型
}

const getters = {

}

const actions = {
  getJointInfo({commit}, jointInfo){
    commit('setJointInfo',jointInfo )
  },
  getCartInfo({commit}, cartInfo){
    commit('setCartInfo',cartInfo )
  },
  getWebsocketLinkFlag({commit}, flag){
    commit('setWebsocketLinkFlag', flag)
  },
  getSendDataParams({commit}, params){
    commit('setSendDataParams', params)
  },
  
  getButtonUsable({commit}, buttonUsable){
    commit('setButtonUsable',buttonUsable )
  },
  getCurrentSend({commit}, currentSend){
    commit('setCurrentSend',currentSend )
  },
}

const mutations = {
  setJointInfo: (state, jointInfo) => {
    state.JointInfo = jointInfo
  },
  setCartInfo: (state, cartInfo) => {
    state.CartInfo = cartInfo
  },
  setWebsocketLinkFlag: (state, flag) => {
    state.websocketLinkFlag = flag
  },
  setSendDataParams: (state, params) => {
    state.sendDataParams = params
  },
  
  setButtonUsable(state, buttonUsable) {
    state.buttonUsable = buttonUsable
  },
  setCurrentSend(state, currentSend) {
    state.currentSend = currentSend
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}