<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <div style="margin-left: 15px;">
        <v-radio-group v-model="filterState">
          <v-radio label="All" :value="0" />
          <v-radio label="月曜" :value="1" />
          <v-radio label="火曜" :value="2" />
          <v-radio label="水曜" :value="3" />
          <v-radio label="木曜" :value="4" />
          <v-radio label="金曜" :value="5" />
          <v-radio label="土曜・日曜" :value="6" />
          <br>
          <v-radio label="お気に入り" :value="7" />
          <v-radio label="新番組" :value="8" />
        </v-radio-group>

        <v-checkbox v-model="autoplay" label="Autoplay" />
      </div>

      <label for="searchByAnnict">Annict.comのユーザー情報をもとに番組を検索することができます。 (beta)</label>
      <v-text-field
        v-model="annictUsername"
        name="searchByAnnict"
        class="mx-3"
        flat
        label="input your username"
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
      <span>作った人: <a href="https://twitter.com/6sRyuSk" target="_blank">@6sRyuSk</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      fixed: false,
      title: 'onsen.ag',
      annictUsername: ''
    }
  },
  computed: {
    filterState: {
      get () {
        return this.$store.state.filterState
      },
      set (val) {
        this.$store.dispatch('setfilterState', val)
      }
    },
    autoplay: {
      get () {
        return this.$store.state.autoplay
      },
      set (val) {
        this.$store.dispatch('setAutoplay', val)
      }
    },
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.dispatch('setDrawer', val)
      }
    }
  },
  methods: {
    inputAnnictUsername () {
      this.$nuxt.$emit('setAnnictUserName', this.annictUsername)
    }
  }
}
</script>
