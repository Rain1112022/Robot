import { createStore } from "vuex";
import user from './modules/user'
import tagView from './modules/tagView'
import stateInfo from './modules/stateInfo'
import codeOperate from './modules/codeOperate'
import teaching from './modules/teaching'
import log from './modules/log'
// import device from './modules/device'
const store =  createStore({
  state:{},
  getters:{},
  mutations:{},
  actions:{},
  modules:{
    user,
    tagView,
    stateInfo,
    codeOperate,
    teaching,
    log,
  }
})
export default store