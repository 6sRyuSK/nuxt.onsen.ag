<template>
  <section class="container">
    <inputSearch />
    <programList />
  </section>
</template>

<script>
import axios from 'axios'
import programList from '~/components/programList'
import inputSearch from '~/components/inputSearch'
// import getProgramInfo from '~/plugins/getProgramInfo'
// import getJsonp from '~/plugins/getJsonp'
export default {
  components: {
    programList,
    inputSearch
  },
  async asyncData ({ store }) {
    const programListBaseUrl = 'https://www.onsen.ag/web_api/programs'
    const res = await axios.get(programListBaseUrl).then((response) => {
      return response.data
    })
    store.dispatch('programs/setPrograms', res)
  },
  created () {
    this.$store.dispatch('setfilterState', '0')
  }
}
</script>
<style scoped>
@media (max-width: 600px) {
  .container {
    padding: 0;
  }
}
</style>
