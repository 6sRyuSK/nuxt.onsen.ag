<template>
  <section class="container">
    <inputSearch />
    <programList :programsInfoList="programInfoList" />
  </section>
</template>

<script>
import axios from 'axios'
import programList from '~/components/programList'
import inputSearch from '~/components/inputSearch'
import getProgramInfo from '~/plugins/getProgramInfo'
// import getJsonp from '~/plugins/getJsonp'
export default {
  components: {
    programList,
    inputSearch,
  },
  created() {
    this.$store.dispatch('setfillterState', "0")
  },
  async asyncData({ store }) {
    const programList_baseUrl = 'https://www.onsen.ag/api/shownMovie/shownMovie.json'
    const programList_getUrl = encodeURI(programList_baseUrl)
    const res = await axios.get(programList_getUrl).then(function(response) {
      return response.data.result
    })
    
    const programInfoList = await getProgramInfo(res)
    return {
      programInfoList
    }
  }
  
  
}
</script>
