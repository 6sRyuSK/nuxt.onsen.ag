<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex v-for="item in programsInfoList" :key="item" xs3>
        <a :href="item.moviePath">
          <img :src="`http://www.onsen.ag/${item.thumbnailPath}`" class="image" width="100%" height="100%">
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      programsInfoList: state => state.programsInfoList,
    })
  },
  
}
</script>