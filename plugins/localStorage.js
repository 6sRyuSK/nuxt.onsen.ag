import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, isDev }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'oNusen',
      paths: [
        'programs.favoritePrograms'
      ]
    })(store)
  })
}
