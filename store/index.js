export const strict = false
export const state = () => ({
  programsInfoList: [],
  fillterDayState: "0",
  inputSearchWord: "",
  annictUserName: "",
})

export const mutations = {
  setprogramsInfoList(state, payload) {
    // console.log('payload', payload)
    state.programsInfoList = payload
    // console.log(state.programsInfoList)
  },
  setfillterDayState(state, payload) {
    state.fillterDayState = payload
  },
  setInputSearchWord(state, payload) {
    state.inputSearchWord = payload
  },
  setAnnictUserName(state, payload) {
    state.annictUserName = payload
  },
}

export const actions = {
  setfillterDayState({commit}, payload) {
    commit('setfillterDayState', payload)
  },
  setInputSearchWord({commit}, payload) {
    commit('setInputSearchWord', payload)
  },
  setAnnictUserName({commit}, payload) {
    commit('setAnnictUserName', payload)
  }
}


export const getters = {
  programsInfoList(state) {
    return state.programsInfoList
  }
}