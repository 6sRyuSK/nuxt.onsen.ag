<template>
  <section>
    <v-text-field
      v-model="SearchText"
      append-icon="mic"
      class="mx-3 inputSearch"
      flat
      label="Search"
      prepend-inner-icon="search"
      solo-inverted
      :height="height"
      background-color="pink lighten-2"
      color="grey lighten-3"
    />
  </section>
</template>

<script>
export default {
  data () {
    return {
      inputSearchText: '',
      height: 60
    }
  },
  computed: {
    SearchText: {
      get () {
        return this.inputSearcText
      },
      set (val) {
        this.inputSearchText = val
        this.debouncedInputSearchWord()
      }
    }
  },
  created () {
    this.debouncedInputSearchWord = _.debounce(this.inputSearchWord, 250)
  },
  mounted () {
    if (window.innerWidth <= 600) {
      this.height = 30
    }
  },
  methods: {
    inputSearchWord () {
      this.$nuxt.$emit('setInputSearchWord', this.inputSearchText)
    }
  }
}
</script>
