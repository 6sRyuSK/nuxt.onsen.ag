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
      <v-flex v-for="item in programList" :key="item.title" xs3>
        <a :href="item.moviePath">
          <v-img :src="`http://www.onsen.ag/${item.thumbnailPath}`" class="image" width="100%"/>
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import { mapState } from 'vuex'
let programList
export default {
  data(){
    programList = this.$store.getters.programsInfoList
    const sortProgramList = [...programList].sort(((a, b) => a.update < b.update ? 1 : -1))
    // console.log(this.programsInfoList, "------------")
    return{
      inputSearchWord: "",
      programList : sortProgramList
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
    ...mapState({
      programsInfoList: state => state.programsInfoList,
    })
  },
  
}
</script>