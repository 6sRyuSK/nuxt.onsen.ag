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
        @input="up"
      ></v-text-field>
    <v-layout row wrap>
      <v-flex v-for="item in programList" :key="item.title" md3 xs6 sm4>
        <h4>{{item.update.toLocaleDateString()}}</h4>
        <a :href="item.moviePath">
          <v-img :src="`http://www.onsen.ag/${item.thumbnailPath}`" class="image" width="100%"/>
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
    programsInfoList = [...programsInfoList].sort(((a, b) => a.update < b.update ? 1 : -1))
    return{
      inputSearchWord: "",
      programList : programsInfoList
    }
  },
  methods: {
    up() {
      let filterWord = this.inputSearchWord
      console.log(filterWord)
      this.programList = [...programList].filter(programList=> programList.title.match(filterWord))
    }
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
        return day.match(...val)
      })
    }
  }
  
}
</script>