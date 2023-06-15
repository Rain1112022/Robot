
const state = {
  // teachPoint :[{name:"point1",val: [10, 10, 10, 0, 0,0]},{name:"point2",val: [0, 0, 10, 10, 0,0]}], //保存的示教点
  teachPoint :[], //保存的示教点
}

const getters = {

}

const actions = {
  getTeachPoint({commit}, teachPoint){
    let depl = state.teachPoint.findIndex((ele) => {
      return ele.name == teachPoint.name
    })
    if(depl!== -1){
    }else{
      commit('setTeachPoint',teachPoint )
    }
    
  },
}

const mutations = {
  setTeachPoint: (state, teachPoint) => {
    state.teachPoint.push(teachPoint)
  },
  delTeachPoint(state, teachPoint){
    let depl = state.teachPoint.findIndex((ele) => {
      console.log(ele);
      return ele.name == teachPoint.name
    })
    if(depl!== -1){
      state.teachPoint.splice(depl, 1)
    }
  },
  
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}