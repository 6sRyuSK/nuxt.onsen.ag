<template>
  <v-container fluid grid-list-sm>
    <nowPlaying v-if="playingProgram" :key="playingProgram.id" :now-playing="playingProgram" :autoplay="autoplay" class="nowPlaying" />
    <v-layout row wrap class="programList">
      <v-flex v-for="item in programList" :key="item.title" md3 xs6 sm4>
        <v-img
          :src="item.image.url"
          :class="
            `image ${
              favoriteProgram.find(val => val == item.id) ? 'favorite' : ''
            }`
          "
          width="100%"
          @click="() => clickProgramPanel(item)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { GraphQLClient } from 'graphql-request'
import goTo from 'vuetify/lib/components/Vuetify/goTo'
import axios from 'axios'

import getJsonp from '~/plugins/getJsonp'

import nowPlaying from '~/components/nowPlaying'

export default {
  components: {
    nowPlaying
  },
  data () {
    return {
      client: 0,
      endPoint: 'https://api.annict.com/graphql',
      userWatching: [],
      searchByAnnict: [],
      programList: this.$store.state.programs.programs,
      playingProgram: null
    }
  },
  computed: {
    inputSearchWord () {
      return this.$store.state.inputSearchWord
    },
    favoriteProgram () {
      return this.$store.state.favoriteProgram
    },
    autoplay () {
      return this.$store.state.autoplay
    }
  },
  watch: {
    '$store.state.filterState' (val) {
      this.filterByTag(val)
    },
    inputSearchWord (val) {
      this.debouncedSearchProgram()
    },
    userWatching (val) {
      this.annictSearchProgram(val)
    },
    searchByAnnict (val) {
      this.filterBySearchList(val)
    }
  },
  created () {
    // this.debouncedSearchProgram = (val) => { _.debounce(this.searchProgram(val), 250) }
    this.$nuxt.$on('setAnnictUserName', val => this.getUserWatching(val))
    this.$nuxt.$on('setInputSearchWord', val => this.searchProgram(val))
  },
  mounted () {
    this.client = new GraphQLClient(this.endPoint, {
      headers: {
        Authorization:
          `Bearer ${process.env.AnnictToken}`
      }
    })
  },
  methods: {
    clickProgramPanel (item) {
      this.playingProgram = item
      const playing = document.getElementsByClassName('nowPlaying')
      const offset = window.innerWidth <= 600 ? 0 : 35
      this.$nextTick(() => {
        goTo(playing[0] || 0, { offset })
      })
    },
    async searchProgram (val) {
      if (val === '') {
        this.programList = this.$store.state.programs.programs
        return
      }
      const searchProgramURL = `/api/search?word=${val}`
      const programIdList = await axios.get(searchProgramURL).then((result) => {
        // console.log(result)
        return result.data.split(',').map(val => Number(val))
      })
      this.programList = this.$store.getters['programs/findProgramsManyToMany'](programIdList)
    },
    filterByTag (val) {
      if (val === 0) {
        this.programList = this.$store.state.programs.programs
      } else if (val >= 1 && val <= 6) {
        this.programList = this.$store.getters['programs/getFilteredProgramsByDay'](val)
      } else if (val === 7) {
        // this.filterBySearchList(this.favoriteProgram)
      } else if (val === 8) {
        this.programList = this.$store.getters['programs/getNewPrograms']
      }
    },
    filterBySearchList (list) {
      this.programList = this.programsInfoList.filter((a) => {
        let hit
        list.forEach(function (val) {
          if (a.url === val) hit = a
        })
        return hit
      })
    },
    getUserWatching (annictUserName) {
      const query = `
        query { user( username: "${annictUserName}" ) { name works { edges{node {
        twitterUsername
      }} }} }
      `
      this.client.request(query).then((data) => {
        this.userWatching = data.user.works.edges.map(val => val.node.twitterUsername)
      })
    },
    async annictSearchProgram (searchQueue) {
      if (searchQueue === '') {
        this.programList = this.programsInfoList
        return
      }
      const jsonlist = []
      const vm = this
      window.callback = function (json) {
        jsonlist.push(...json.result)
        vm.searchByAnnict = jsonlist
      }
      const promises = Object.keys(searchQueue).map((key) => {
        const item = searchQueue[key]
        const programInfoGetUrl = encodeURI(
          'https://www.onsen.ag/data/api/searchMovie?word=' + item
        )
        return getJsonp(programInfoGetUrl)
      })
      await Promise.all(promises)
    }
  }
}
</script>
<style scoped>
@import url('~/assets/style/programList.css');
@import url('~/assets/style/xsProgramList.css');
</style>
