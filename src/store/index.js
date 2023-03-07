import { createStore } from "vuex";
import user from './modules/user'
import tagView from './modules/tagView'
import stateInfo from './modules/stateInfo'
import codeOperate from './modules/codeOperate'
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
  }
})
export default store