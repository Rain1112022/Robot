
const state = {
  JointInfo :[0,0,0,0,0,0], //关节角度
  CartInfo :[0,-0.1925,0.7875,90,0,0], //末端状态
  
  
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
  
  
}

const mutations = {
  setJointInfo: (state, jointInfo) => {
    state.JointInfo = jointInfo
  },
  setCartInfo: (state, cartInfo) => {
    state.CartInfo = cartInfo
  },
  
  
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}