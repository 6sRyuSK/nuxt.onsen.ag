// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  // 'hogeFromStore' という名前の状態を管理する
  programsInfoList: ['Hello, Vuex!']
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  // ここでは hogeFromStore の状態（値）を変更する処理を定義
  setprogramsInfoList(state, payload) {
    // console.log('payload', payload)
    state.programsInfoList = payload
    console.log(state.programsInfoList)
  }
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  
}


export const getters = {
  programsInfoList(state) {
    return state.programsInfoList
  }
}