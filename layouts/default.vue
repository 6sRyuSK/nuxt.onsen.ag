<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-radio-group v-model="day" :mandatory="false">
        <v-radio label="All" value="0"></v-radio>
        <v-radio label="月曜" value="1"></v-radio>
        <v-radio label="火曜" value="2"></v-radio>
        <v-radio label="水曜" value="3"></v-radio>
        <v-radio label="木曜" value="4"></v-radio>
        <v-radio label="金曜" value="5"></v-radio>
        <v-radio label="土曜・日曜" value="6"></v-radio>
      </v-radio-group>

    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
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
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'onsen.ag',
      day: "0",
      checkboxState: false
    }
  },
  watch: {
    day(val){
      this.$store.dispatch('setfillterDayState', val)
      
    }
  }
}
</script>
