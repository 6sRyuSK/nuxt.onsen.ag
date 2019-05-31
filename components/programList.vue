<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap class="player" v-if="nowPlaying">
      <v-flex md4 style="width:30%" class="player-img">
        <v-img v-bind:src="`https://www.onsen.ag${nowPlaying.thumbnailPath}`"></v-img>
      </v-flex>
      <v-flex md8 class="programInfo">
        <h2 class="item title">{{nowPlaying.title}}</h2>
        <h3 class="item">{{nowPlaying.update.toLocaleDateString("ja-JP", {year:'numeric',month:'long',day:'numeric'})}}</h3>
        <h3 class="item">{{nowPlaying.personality}}</h3>
        <audio v-bind:src="nowPlaying.moviePath" controls autoplay style="width:100%; bottom:0;" class="mp3Player"/>
      </v-flex>
      
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="item in programList" :key="item.title" md3 xs6 sm4>
        <!-- <a :href="item.moviePath">
          <v-img :src="`https://www.onsen.ag${item.thumbnailPath}`" class="image" width="100%"/>
        </a> -->
        <v-img :src="`https://www.onsen.ag${item.thumbnailPath}`" class="image" width="100%" @click="() =>clickProgramPanel(item)">
          <!-- <v-card v-if="item.title == isShow" height="100%" :class="panelCard">
            <v-card-text>
              {{item.title}}
              <audio :src="item.moviePath" controls style="width: 100%"/>
            </v-card-text>
          </v-card> -->
        </v-img>
        
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
      // isShow: "普通にラジオをお届けしたいラフタリアとフィーロ",
      // panelCard: "panel-card",
      nowPlaying: "",
    }
  },
  methods: {
    clickProgramPanel(item) {
      this.panelCard = "panel-card"
      this.isShow = item.title
      this.$nextTick(() => {
        this.panelCard = ""
      });  
      console.log(item)
      this.nowPlaying = item
      // console.log(item.title, this.isShow)
      // console.log("aaaaaaaaaaaa")
    },
    async searchProgram() {
      if(this.inputSearchWord === ''){
        this.programList = programsInfoList
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

</style>
