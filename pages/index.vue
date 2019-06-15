<template>
  <section class="container">
    <inputSearch />
    <programList :programs-info-list="programInfoList" />
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
    inputSearch
  },
  async asyncData ({ store }) {
    const programListBaseUrl =
      'https://www.onsen.ag/api/shownMovie/shownMovie.json'
    const programListGetUrl = encodeURI(programListBaseUrl)
    const res = await axios.get(programListGetUrl).then(function (response) {
      return response.data.result
    })

    const programInfoList = await getProgramInfo(res)
    return {
      programInfoList
    }
  },
  created () {
    this.$store.dispatch('setfillterState', '0')
  }
}
</script>
