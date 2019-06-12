<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap class="player" v-if="nowPlaying">
      <v-flex md4 style="width:30%" class="player-img">
        <v-img v-bind:src="`https://www.onsen.ag${nowPlaying.thumbnailPath}`">
          <v-layout>
            <v-spacer/>
            <v-btn icon @click="addFavorite(nowPlaying.url)" v-if="favoriteProgram.find(item => item == nowPlaying.url)">
              <v-icon color="pink lighten-2">fas fa-heart</v-icon>
            </v-btn>
            <v-btn icon color="#eee" @click="addFavorite(nowPlaying.url)" v-else>
              <v-icon color="pink">far fa-heart</v-icon>
            </v-btn>
          </v-layout>
        </v-img>
      </v-flex>
      <v-flex md8 class="programInfo">
        <h2 class="item title">{{nowPlaying.title}}</h2>
        <h3 class="item">{{nowPlaying.update.toLocaleDateString("ja-JP", {year:'numeric',month:'long',day:'numeric'})}}: {{nowPlaying.schedule}}</h3>
        <h3 class="item">{{nowPlaying.personality}}</h3>
        <audio v-bind:src="nowPlaying.moviePath" controls :autoplay="isAutoplay" style="width:100%; bottom:0;" class="mp3Player"/>
      </v-flex>
      
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="item in programList" :key="item.title" md3 xs6 sm4>
        <v-img 
          :src="`https://www.onsen.ag${item.thumbnailPath}`" 
          :class="`image ${favoriteProgram.find(val => val == item.url) ? 'favorite' : ''}`" 
          width="100%" 
          @click="() =>clickProgramPanel(item)"
        ></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import { mapState } from 'vuex'
import getJsonp from '~/plugins/getJsonp'
import { request, GraphQLClient } from 'graphql-request'
import goTo from 'vuetify/lib/components/Vuetify/goTo'

export default {
  data(){
    return{
      programList : this.programsInfoList,
      client: 0,
      endPoint: 'https://api.annict.com/graphql',
      userWatching: [],
      searchByAnnict: [],
      nowPlaying: "",
    }
  },
  methods: {
    clickProgramPanel(item) {
      this.nowPlaying = item
      goTo(0)
    },
    addFavorite(item) {
      if(this.favoriteProgram.find(val => val == item)){
        this.$store.dispatch('removeFavoriteProgram', item)
      } else {
        this.$store.dispatch('addFavoriteProgram', item)
      }
    },
    async searchProgram() {
      if(this.inputSearchWord === ''){
        this.programList = this.programsInfoList
        return
      }
      const programInfo_getUrl = `https://www.onsen.ag/data/api/searchMovie?word=${this.inputSearchWord}`
      getJsonp(programInfo_getUrl)
      const vm = this
      window["callback"] = function(json) {
        vm.fillterBySearchList(json.result)
      }
    },
    fillterBySearchList(list){
      this.programList = this.programsInfoList.filter(a => {
        let hit
        list.forEach(function(val) {
          if(a.url == val) hit = a
        })
        return hit
      })
    },
    async annictSearchProgram(searchQueue) {
      if(searchQueue === ''){
        this.programList = this.programsInfoList
        return
      }
      let jsonlist = []
      const vm = this
      window["callback"] = function(json) {
        jsonlist.push(...json.result)
        vm.searchByAnnict = jsonlist
      }
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
    fillterState() {
      return this.$store.state.fillterState
    },
    inputSearchWord() {
      return this.$store.state.inputSearchWord
    },
    annictUserName() {
      return this.$store.state.annictUserName
    },
    favoriteProgram() {
      return this.$store.state.favoriteProgram
    },
    isAutoplay() {
      return this.$store.state.isAutoplay
    }
  },
  watch: {
    fillterState(val) {
      if(val == 0) {
        return this.programList = this.programsInfoList
      } else if(1 <= val && val <= 6) {
        this.programList = this.programsInfoList.filter(a => {
          const day = new Date(a.update).getDay().toString()
          return day.match(val)
        })
      } else if(val == 7) {
        this.fillterBySearchList(this.favoriteProgram)
      }
    },
    inputSearchWord(val) {
      this.debouncedSearchProgram()
    },
    annictUserName(val) {
      this.getUserWatching(val)
    },
    userWatching(val) {
      this.annictSearchProgram(val)
    },
    searchByAnnict(val) {
      console.log(val)
      this.fillterBySearchList(val)
    }
  },
  props: {
    programsInfoList: Array
  }
  
}
</script>
<style scoped>
.panel-card {
  transform: translateY(450px);
}
.player {
  width: 100%;
  padding: 10px;
}
.player-img {
  width: 30%;
}
.programInfo {
  padding: 5px;
  position: relative;
}
.programInfo > item {
  margin-bottom: 5px;
}
.programInfo > title {
  font-size: 5vw;
}
@media screen and (min-width: 1024px) { 
  .mp3Player {position:absolute; }
}

.favorite {
  outline: 7px solid #F50057;
  outline-offset: -4px;
}
</style>
