<template>
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
</template>

<script>
export default {
  props: {
    nowPlaying: Number,
  },
  computed: {
    favoriteProgram() {
      return this.$store.state.favoriteProgram
    }
  },
  methods: {
    addFavorite(item) {
      if(this.favoriteProgram.find(val => val == item)){
        this.$store.dispatch('removeFavoriteProgram', item)
      } else {
        this.$store.dispatch('addFavoriteProgram', item)
      }
    }
  }
}
</script>

<style scoped>
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

