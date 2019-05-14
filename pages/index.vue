<template>
  <section class="container">
    <!-- <v-btn @click="getUserWatching">aaa</v-btn> -->
    <!-- <h3>{{userWatching}}</h3> -->
    <inputSearch />
    <programList />
  </section>
</template>

<script>
import axios from 'axios'
import programList from '~/components/programList'
import inputSearch from '~/components/inputSearch'
import getProgramInfo from '~/plugins/getProgramInfo'
import { request, GraphQLClient } from 'graphql-request'
export default {
  components: {
    programList,
    inputSearch,
  },
  data() {
    return {
      client: 0,
      endPoint: 'https://api.annict.com/graphql',
      userWatching: []
    }
  },
  created() {
    this.clientInitialize()
  },
  methods: {
    clientInitialize() {
      this.client = new GraphQLClient(this.endPoint, { headers: {Authorization: "Bearer 665698b3e3df57bb247c422dfe42b78cf40585a70afb3781d17ccc8699584df5"}})
    },
    getUserWatching() {
      const query = `
        query { user( username: "6sRyuSK" ) { name works { edges{node {
        twitterUsername
      }} }} }
      `
      this.client.request(query).then(data => this.userWatching = data)
    }
  },
  async fetch ({ store, params }) {
    const programList_baseUrl = 'https://www.onsen.ag/api/shownMovie/shownMovie.json'
    const programList_getUrl = encodeURI(programList_baseUrl)
    const res = await axios.get(programList_getUrl).then(function(response) {
      return response.data.result
    })
    
    const programInfoList = await getProgramInfo(res)
    store.commit('setprogramsInfoList', programInfoList)

  }
  
  
}
</script>
