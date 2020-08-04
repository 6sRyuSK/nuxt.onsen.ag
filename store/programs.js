export const strict = false
export const state = () => ({
  programs: [],
  playing: -1
})

export const mutations = {
  setPrograms (state, payload) {
    state.programs = payload
  },
  setPlaying (state, payload) {
    state.playing = payload
  }
}

export const actions = {
  setPrograms ({ commit }, payload) {
    commit('setPrograms', payload)
  },
  setPlaying ({ commit }, payload) {
    commit('setPlaying', payload)
  }
}

export const getters = {
  getPlayingProgram (state) {
    return state.playing !== -1 ? state.programs.find(item => item.id === state.playing) : null
  }
}
