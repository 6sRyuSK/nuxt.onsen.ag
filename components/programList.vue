<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex v-for="item in programList" :key="item.title" md3 xs6 sm4>
        <a :href="item.moviePath">
          <v-img :src="`https://www.onsen.ag${item.thumbnailPath}`" class="image" width="100%"/>
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import { mapState } from 'vuex'
import getJsonp from '~/plugins/getJsonp'
import { request, GraphQLClient } from 'graphql-request'
let programsInfoList
export default {
  data(){
    programsInfoList = this.$store.getters.programsInfoList
    return{
      programList : programsInfoList,
      client: 0,
      endPoint: 'https://api.annict.com/graphql',
      userWatching: [],
      searchByAnnict: [],
    }
  },
  methods: {
    async searchProgram() {
      if(this.inputSearchWord === ''){
        this.programList = programsInfoList
        return
      }
      const list = await this.$jsonp(
          'https://www.onsen.ag/data/api/searchMovie',
          {word: this.inputSearchWord, callbackName:'callback' })
        .then(json => {
          return json.result
        }).catch(err => {
          console.log("jsonpERR:", err)
      })
      this.fillterBySearchList(list)
    },
    fillterBySearchList(list){
      this.programList = programsInfoList.filter(a => {
        let hit
        list.forEach(function(val) {
          if(a.url == val) hit = a
        })
        return hit
      })
    },
    async annictSearchProgram(searchQueue) {
      if(searchQueue === ''){
        this.programList = programsInfoList
        return
      }
      // const search = ["fairygone", "shieldheroanime"]
      
      // const getUrl = encodeURI( 'https://www.onsen.ag/data/api/searchMovie?word=fairygone')
      let jsonlist = []
      const vm = this
      window["callback"] = function(json) {
        jsonlist.push(...json.result)
        // console.log(jsonlist)
        vm.searchByAnnict = jsonlist
      }
      // console.log(searchQueue, "--")
      const promises = Object.keys(searchQueue).map((key) => {
        const item = searchQueue[key];
        const programInfo_getUrl = encodeURI( 'https://www.onsen.ag/data/api/searchMovie?word=' + item)
        return getJsonp(programInfo_getUrl)
        
      })
      await Promise.all(promises)
    },
    getUserWatching(annictUserName) {
      const query = `
        query { user( username: "${annictUserName}" ) { name works { edges{node {
        twitterUsername
      }} }} }
      `
      // console.log(annictUserName, "---")
      this.client.request(query).then(data => {
        return this.userWatching = data.user.works.edges.map(val => {
          return val.node.twitterUsername
        })
      })
    },
    clientInitialize() {
      this.client = new GraphQLClient(this.endPoint, { headers: {Authorization: "Bearer 665698b3e3df57bb247c422dfe42b78cf40585a70afb3781d17ccc8699584df5"}})
    },
  },
  created() {
    this.debouncedSearchProgram = _.debounce(this.searchProgram, 250)
    this.clientInitialize()
  },
  computed: {
    fillterDayState() {
      return this.$store.state.fillterDayState
    },
    inputSearchWord() {
      return this.$store.state.inputSearchWord
    },
    annictUserName() {
      return this.$store.state.annictUserName
    }
  },
  watch: {
    fillterDayState(val) {
      if(val == 0) {
        return this.programList = programsInfoList
      }
      this.programList = [...programsInfoList].filter(a => {
        const day = new Date(a.update).getDay().toString()
        return day.match(val)
      })
    },
    inputSearchWord(val) {
      this.debouncedSearchProgram()
    },
    annictUserName(val) {
      this.getUserWatching(val)
    },
    userWatching(val) {
      // console.log(val)
      this.annictSearchProgram(val)
    },
    searchByAnnict(val) {
      console.log(val)
      this.fillterBySearchList(val)
    }
  }
  
}
</script>