<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-radio-group v-model="fillterState" :mandatory="false">
        <v-radio label="All" value="0" />
        <v-radio label="月曜" value="1" />
        <v-radio label="火曜" value="2" />
        <v-radio label="水曜" value="3" />
        <v-radio label="木曜" value="4" />
        <v-radio label="金曜" value="5" />
        <v-radio label="土曜・日曜" value="6" />
        <v-radio label="お気に入り" value="7" />
      </v-radio-group>

      <v-checkbox v-model="isAutoplay" label="Autoplay" />

      <v-text-field
        v-model="annictUsername"
        append-icon="mic"
        class="mx-3"
        flat
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
        height="60"
        background-color="pink lighten-2"
        color="grey lighten-3"
        @keyup.enter="inputAnnictUsername"
      />
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      title: 'onsen.ag',
      fillterState: '0',
      checkboxState: false,
      annictUsername: '',
      isAutoplay: false
    }
  },
  computed: {
    preIsAutoplay() {
      return this.$store.state.isAutoplay
    }
  },
  watch: {
    fillterState(val) {
      this.$store.dispatch('setfillterState', val)
    },
    isAutoplay(val) {
      this.$store.dispatch('setAutoplay', val)
    }
  },
  created() {
    this.isAutoplay = this.preIsAutoplay
  },
  methods: {
    inputAnnictUsername() {
      this.$store.dispatch('setAnnictUserName', this.annictUsername)
    }
  }
}
</script>
