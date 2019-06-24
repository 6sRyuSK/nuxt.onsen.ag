export const strict = false
export const state = () => ({
  filterState: '0',
  inputSearchWord: '',
  favoriteProgram: [],
  autoplay: false,
  drawer: false
})

export const mutations = {
  setfilterState (state, payload) {
    state.filterState = payload
  },
  setInputSearchWord (state, payload) {
    state.inputSearchWord = payload
  },
  addFavoriteProgram (state, payload) {
    state.favoriteProgram.push(payload)
  },
  removeFavoriteProgram (state, payload) {
    state.favoriteProgram = state.favoriteProgram.filter(val => val !== payload)
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
  setInputSearchWord ({ commit }, payload) {
    commit('setInputSearchWord', payload)
  },
  addFavoriteProgram ({ commit }, payload) {
    commit('addFavoriteProgram', payload)
  },
  removeFavoriteProgram ({ commit }, payload) {
    commit('removeFavoriteProgram', payload)
  },
  setAutoplay ({ commit }, payload) {
    commit('setAutoplay', payload)
  },
  setDrawer ({ commit }, payload) {
    commit('setDrawer', payload)
  }
}
