import * as api from '@/api/index.js'

// 村赤用户令牌和角色信息
const state ={
    token:'',
    roles: [], //角色
    info: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
};

const actions = {
  // 用户登录
  userLogin({ commit }, userInfo) {
    // console.log(userInfo);  //{ passwd: 123456 }
    return new Promise((resolve, reject) => {
      api.Login(userInfo).then((response) => {
        // console.log("登录结果", response);//{ login: "success" }
        commit('SET_TOKEN', response.login); //success
        commit('SET_INFO', userInfo)
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        sessionStorage.setItem("token",response.login)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

 