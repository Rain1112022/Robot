import * as api from '@/api/index.js'

// 村赤用户令牌和角色信息
const state ={
    token:'',
    roles: [], //角色
    info: {},
    deviceConnect:'未连接', //连接
    devicePower:'电源', //上电
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  setDeviceConnect(state, deviceConnect) {
    state.deviceConnect = deviceConnect
  },
  setDevicePower(state, devicePower) {
    state.devicePower = devicePower
  },
};

const actions = {
  // 用户登录
  userLogin({ commit }, userInfo) {
    // console.log(userInfo);  //{ passwd: 123456 }
    return new Promise((resolve, reject) => {
      api.Login(userInfo).then((response) => {
        // console.log("登录结果", response);//{ LOGIN: "SUCCESS" }
        commit('SET_TOKEN', response.LOGIN); 
        commit('SET_INFO', userInfo)
        commit('setDeviceConnect',"已连接" )
        commit('setDevicePower',"on" )
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        sessionStorage.setItem("token",response.LOGIN)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDeviceConnect({commit}, deviceConnect){
    commit('setDeviceConnect',deviceConnect )
  },
  getDevicePower({commit}, devicePower){
    commit('setDevicePower',devicePower )
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

 