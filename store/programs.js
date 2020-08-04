export const strict = false
export const state = () => ({
  programs: []
})

export const mutations = {
  setPrograms (state, payload) {
    state.programs = payload
  }
}

export const actions = {
  setPrograms ({ commit }, payload) {
    commit('setPrograms', payload)
  }
}
