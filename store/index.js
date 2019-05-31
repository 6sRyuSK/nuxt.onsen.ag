export const strict = false
export const state = () => ({
  programsInfoList: [],
  fillterState: "0",
  inputSearchWord: "",
  annictUserName: "",
  favoriteProgram: [],
})

export const mutations = {
  setprogramsInfoList(state, payload) {
    // console.log('payload', payload)
    state.programsInfoList = payload
    // console.log(state.programsInfoList)
  },
  setfillterState(state, payload) {
    state.fillterState = payload
  },
  setInputSearchWord(state, payload) {
    state.inputSearchWord = payload
  },
  setAnnictUserName(state, payload) {
    state.annictUserName = payload
  },
  addFavoriteProgram(state, payload) {
    state.favoriteProgram.push(payload)
  },
  removeFavoriteProgram(state, payload) {
    state.favoriteProgram = state.favoriteProgram.filter(val => val != payload)
  }
}

export const actions = {
  setfillterState({commit}, payload) {
    commit('setfillterState', payload)
  },
  setInputSearchWord({commit}, payload) {
    commit('setInputSearchWord', payload)
  },
  setAnnictUserName({commit}, payload) {
    commit('setAnnictUserName', payload)
  },
  addFavoriteProgram({commit}, payload) {
    commit('addFavoriteProgram', payload)
  },
  removeFavoriteProgram({commit}, payload) {
    commit('removeFavoriteProgram', payload)
  }
}


export const getters = {
  programsInfoList(state) {
    return state.programsInfoList
  }
}