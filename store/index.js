export const strict = false
export const state = () => ({
  programsInfoList: [],
  fillterDayState: "0",
  inputSearchWord: "",
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
}

export const actions = {
  setfillterDayState({commit}, payload) {
    commit('setfillterDayState', payload)
  },
  setInputSearchWord({commit}, payload) {
    commit('setInputSearchWord', payload)
  },
}


export const getters = {
  programsInfoList(state) {
    return state.programsInfoList
  }
}