<template>
  <section>
    <v-text-field
      v-model="inputSearchWord"
      append-icon="mic"
      class="mx-3"
      flat
      label="Search"
      prepend-inner-icon="search"
      solo-inverted
      height="60"
      background-color="pink lighten-2"
      color="grey lighten-3"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      inputSearchWord: ''
    }
  },
  watch: {
    inputSearchWord(val) {
      this.$store.dispatch('setInputSearchWord', val)
    }
  }
}
</script>
