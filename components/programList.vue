<template>
  <v-container fluid grid-list-sm>
    <v-text-field
        append-icon="mic"
        class="mx-3"
        flat
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
        height="60"
        background-color="pink lighten-2"
        color="grey lighten-3"
        v-model="inputSearchWord"
      ></v-text-field>
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
let programsInfoList
export default {
  data(){
    programsInfoList = this.$store.getters.programsInfoList
    return{
      inputSearchWord: "",
      programList : programsInfoList
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
      this.programList = programsInfoList.filter(a => {
        let hit
        list.forEach(function(val) {
          if(a.url == val) hit = a
        })
        return hit
      })
    }
  },
  created() {
    this.debouncedSearchProgram = _.debounce(this.searchProgram, 250)
  },
  computed: {
    fillterDayState() {
      return this.$store.state.fillterDayState
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
    async inputSearchWord(val) {
      this.debouncedSearchProgram()
    }
  }
  
}
</script>