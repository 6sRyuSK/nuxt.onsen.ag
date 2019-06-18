<template>
  <v-container fluid grid-list-sm>
    <nowPlaying v-if="JSON.stringify(nowPlaying) != '{}'" :now-playing="nowPlaying" :autoplay="autoplay" />
    <v-layout row wrap>
      <v-flex v-for="item in programList" :key="item.title" md3 xs6 sm4>
        <v-img
          :src="`https://www.onsen.ag${item.thumbnailPath}`"
          :class="
            `image ${
              favoriteProgram.find(val => val == item.url) ? 'favorite' : ''
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
import nowPlaying from '~/components/nowPlaying'

import getJsonp from '~/plugins/getJsonp'
import { GraphQLClient } from 'graphql-request'
import goTo from 'vuetify/lib/components/Vuetify/goTo'

export default {
  components: {
    nowPlaying
  },
  props: {
    programsInfoList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      programList: this.programsInfoList,
      client: 0,
      endPoint: 'https://api.annict.com/graphql',
      userWatching: [],
      searchByAnnict: [],
      nowPlaying: {}
    }
  },
  computed: {
    filterState () {
      return this.$store.state.filterState
    },
    inputSearchWord () {
      return this.$store.state.inputSearchWord
    },
    annictUserName () {
      return this.$store.state.annictUserName
    },
    favoriteProgram () {
      return this.$store.state.favoriteProgram
    },
    autoplay () {
      return this.$store.state.autoplay
    }
  },
  watch: {
    filterState (val) {
      this.filterByTag(val)
    },
    inputSearchWord (val) {
      this.debouncedSearchProgram()
    },
    annictUserName (val) {
      this.getUserWatching(val)
    },
    userWatching (val) {
      this.annictSearchProgram(val)
    },
    searchByAnnict (val) {
      console.log(val)
      this.filterBySearchList(val)
    }
  },
  created () {
    this.debouncedSearchProgram = _.debounce(this.searchProgram, 250)
    this.client = new GraphQLClient(this.endPoint, {
      headers: {
        Authorization:
          'Bearer 665698b3e3df57bb247c422dfe42b78cf40585a70afb3781d17ccc8699584df5'
      }
    })
  },
  methods: {
    clickProgramPanel (item) {
      this.nowPlaying = item
      goTo(0)
    },
    searchProgram () {
      if (this.inputSearchWord === '') {
        this.programList = this.programsInfoList
        return
      }
      const programInfoGetUrl = `https://www.onsen.ag/data/api/searchMovie?word=${this.inputSearchWord}`
      getJsonp(programInfoGetUrl)
      const vm = this
      window.callback = function (json) {
        vm.filterBySearchList(json.result)
      }
    },
    filterByTag (val) {
      if (val === '0') {
        this.programList = this.programsInfoList
      } else if (val >= 1 && val <= 6) {
        this.programList = this.programsInfoList.filter((a) => {
          const day = new Date(a.update).getDay().toString()
          return day.match(val)
        })
      } else if (val === '7') {
        this.filterBySearchList(this.favoriteProgram)
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
        return (this.userWatching = data.user.works.edges.map((val) => {
          return val.node.twitterUsername
        }))
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
.panel-card {
  transform: translateY(450px);
}

.favorite {
  outline: 6px solid #f50057;
  outline-offset: -5px;
}
</style>
