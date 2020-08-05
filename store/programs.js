export const strict = false
export const state = () => ({
  programs: [],
  favoritePrograms: []
})

export const mutations = {
  setPrograms (state, payload) {
    state.programs = payload
  },
  addFavorite (state, payload) {
    state.favoritePrograms.push(payload)
  },
  removeFavorite (state, payload) {
    state.favoritePrograms = state.favoritePrograms.filter(val => val !== payload)
  }
}

export const actions = {
  setPrograms ({ commit }, payload) {
    commit('setPrograms', payload)
  },
  addFavorite ({ commit }, payload) {
    commit('addFavorite', payload)
  },
  removeFavorite ({ commit }, payload) {
    commit('removeFavorite', payload)
  }
}

export const getters = {
  getFilteredProgramsByDay: state => (day) => {
    return state.programs.filter(item => item.delivery_day_of_week === day)
  },
  getNewPrograms (state) {
    return state.programs.filter(item => item.category_list.find(val => val === 'new'))
  },
  findProgramsManyToMany: state => (programIdList) => {
    return state.programs.filter(item => programIdList.some(val => val === item.id))
  },
  getFavoritePrograms (state) {
    return this.findProgramsManyToMany(state.favoritePrograms)
  }
}
