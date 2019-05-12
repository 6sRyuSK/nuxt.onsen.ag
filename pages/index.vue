<template>
  <section class="container">
    <programList />
  </section>
</template>

<script>
import axios from 'axios'
import programList from '~/components/programList'
import getProgramInfo from '~/plugins/getProgramInfo'
export default {
  components: {
    programList,
  },
  async fetch ({ store, params }) {
    const programList_baseUrl = 'http://www.onsen.ag/api/shownMovie/shownMovie.json'
    const programList_getUrl = encodeURI(programList_baseUrl)
    const res = await axios.get(programList_getUrl).then(function(response) {
      return response.data.result
    })
    
    const programInfoList = await getProgramInfo(res)
    store.commit('setprogramsInfoList', programInfoList)

  }
  
  
}
</script>
