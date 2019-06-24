<template>
  <v-layout v-if="nowPlaying != {}" row wrap class="player">
    <v-flex md4 style="width:30%" class="player-img">
      <v-img :src="`https://www.onsen.ag${nowPlaying.thumbnailPath}`">
        <v-layout>
          <v-spacer />
          <v-btn
            v-if="favoriteProgram.find(item => item == nowPlaying.url)"
            icon
            @click="addFavorite(nowPlaying.url)"
          >
            <v-icon color="pink lighten-2">
              fas fa-heart
            </v-icon>
          </v-btn>
          <v-btn v-else icon color="#eee" @click="addFavorite(nowPlaying.url)">
            <v-icon color="pink">
              far fa-heart
            </v-icon>
          </v-btn>
        </v-layout>
        <!-- <v-spacer /> -->
        <audio
          v-if="isMobile"
          :src="nowPlaying.moviePath"
          controls
          :autoplay="autoplay"
          style="width:100%; bottom:0;"
          class="mp3controllerSp"
        />
      </v-img>
    </v-flex>
    <v-flex md8 class="programInfo">
      <h2 class="item title">
        {{ nowPlaying.title }} : {{ isNaN(nowPlaying.count) ? nowPlaying.count : '第' + nowPlaying.count + '回' }}
      </h2>
      <h3 class="item">
        {{
          nowPlaying.update.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }}: {{ nowPlaying.schedule }}
      </h3>
      <h3 class="item">
        {{ nowPlaying.personality }}
      </h3>
      <audio
        v-if="!isMobile"
        :src="nowPlaying.moviePath"
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
      return this.$store.state.favoriteProgram
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
    addFavorite (item) {
      if (this.favoriteProgram.find(val => val === item)) {
        this.$store.dispatch('removeFavoriteProgram', item)
      } else {
        this.$store.dispatch('addFavoriteProgram', item)
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
