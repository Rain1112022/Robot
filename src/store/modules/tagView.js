
const state = {
  navigation :"/home",
  logoShow: true,
  controlModeShow : false
}

const mutations = {
  setNavigation(state,navigation){
    state.navigation = navigation;
  },
  setLogoShow(state,logoShow){
    state.logoShow = logoShow;
  },
  setControlModeShow(state,controlModeShow){
    state.controlModeShow = controlModeShow;
  },
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
