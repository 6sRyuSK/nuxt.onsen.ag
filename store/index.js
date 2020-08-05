export const strict = false
export const state = () => ({
  filterState: 0,
  autoplay: false,
  drawer: false
})

export const mutations = {
  setfilterState (state, payload) {
    state.filterState = payload
  },
  setAutoplay (state, payload) {
    state.autoplay = payload
  },
  setDrawer (state, payload) {
    state.drawer = payload
  }
}

export const actions = {
  setfilterState ({ commit }, payload) {
    commit('setfilterState', payload)
  },
  setAutoplay ({ commit }, payload) {
    commit('setAutoplay', payload)
  },
  setDrawer ({ commit }, payload) {
    commit('setDrawer', payload)
  }
}
