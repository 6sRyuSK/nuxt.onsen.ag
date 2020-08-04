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
  },
  getFilteredProgramsByDay: state => (day) => {
    return state.programs.filter(item => item.delivery_day_of_week === day)
  },
  getNewPrograms (state) {
    return state.programs.filter(item => item.category_list.find(val => val === 'new'))
  }
}
