<template>
  <v-layout v-if="nowPlaying != {}" row wrap class="player">
    <v-flex md4 style="width:30%" class="player-img">
      <v-img :src="nowPlaying.image.url">
        <v-layout>
          <v-spacer />
          <v-btn
            v-if="favoriteProgram.find(item => item == nowPlaying.id)"
            icon
            @click="addFavorite(nowPlaying.id)"
          >
            <v-icon color="pink lighten-2">
              fas fa-heart
            </v-icon>
          </v-btn>
          <v-btn v-else icon color="#eee" @click="addFavorite(nowPlaying.id)">
            <v-icon color="pink">
              far fa-heart
            </v-icon>
          </v-btn>
        </v-layout>
        <!-- <v-spacer /> -->
        <audio
          v-if="isMobile && nowPlaying.contents.length"
          :src="nowPlaying.contents.filter(val => val.streaming_url !== null)[0].streaming_url"
          controls
          :autoplay="autoplay"
          style="width:100%; bottom:0;"
          class="mp3controllerSp"
        />
      </v-img>
    </v-flex>
    <v-flex md8 class="programInfo">
      <h2 class="item title">
        <span>{{ nowPlaying.title }}</span> : <span>{{ nowPlaying.contents.length ? nowPlaying.contents.filter(val => val.streaming_url !== null)[0].title : '' }}</span>
      </h2>
      <h3 class="item">
        {{ nowPlaying.updated }}: {{ nowPlaying.delivery_interval }}
      </h3>
      <h3 class="item">
        {{ nowPlaying.performers.map(val => val.name).join(' / ') }}
      </h3>
      <audio
        v-if="!isMobile && nowPlaying.contents.length"
        :src="nowPlaying.contents.filter(val => val.streaming_url !== null)[0].streaming_url"
        controls
        :autoplay="autoplay"
        style="width:100%; bottom:0;"
        class="mp3Player"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    nowPlaying: {
      type: Object,
      required: true
    },
    autoplay: Boolean
  },
  data () {
    return {
      isMobile: false
    }
  },
  computed: {
    favoriteProgram () {
      return this.$store.state.programs.favoritePrograms
    }
  },
  watch: {
    nowPlaying () {
      this.isMobileCheck()
    }
  },
  mounted () {
    this.isMobileCheck()
  },
  methods: {
    addFavorite (id) {
      if (this.favoriteProgram.find(val => val === id)) {
        this.$store.dispatch('programs/removeFavorite', id)
      } else {
        this.$store.dispatch('programs/addFavorite', id)
      }
    },
    isMobileCheck () {
      this.isMobile = window.innerWidth <= 600
    }
  }
}
</script>

<style scoped>
@import url('~/assets/style/nowPlaying.css');
</style>
