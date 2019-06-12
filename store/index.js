export const strict = false
export const state = () => ({
  fillterState: '0',
  inputSearchWord: '',
  annictUserName: '',
  favoriteProgram: [],
  isAutoplay: false
})

export const mutations = {
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
    state.favoriteProgram = state.favoriteProgram.filter(val => val !== payload)
  },
  setAutoplay(state, payload) {
    state.isAutoplay = payload
  }
}

export const actions = {
  setfillterState({ commit }, payload) {
    commit('setfillterState', payload)
  },
  setInputSearchWord({ commit }, payload) {
    commit('setInputSearchWord', payload)
  },
  setAnnictUserName({ commit }, payload) {
    commit('setAnnictUserName', payload)
  },
  addFavoriteProgram({ commit }, payload) {
    commit('addFavoriteProgram', payload)
  },
  removeFavoriteProgram({ commit }, payload) {
    commit('removeFavoriteProgram', payload)
  },
  setAutoplay({ commit }, payload) {
    commit('setAutoplay', payload)
  }
}
