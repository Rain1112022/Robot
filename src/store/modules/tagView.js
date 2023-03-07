
const state = {
  navigation :"/home",
}

const mutations = {
  setNavigation(state,navigation){
    state.navigation = navigation;
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
