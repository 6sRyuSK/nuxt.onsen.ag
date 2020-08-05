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

export const getters = {
  getFilteredProgramsByDay: state => (day) => {
    return state.programs.filter(item => item.delivery_day_of_week === day)
  },
  getNewPrograms (state) {
    return state.programs.filter(item => item.category_list.find(val => val === 'new'))
  },
  findProgramsManyToMany: state => (programIdList) => {
    // const filteredPrograms
    return state.programs.filter(item => programIdList.some(val => val === item.id))
  }
}
