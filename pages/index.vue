<template>
  <section class="container">
    <inputSearch />
    <programList />
  </section>
</template>

<script>
import axios from 'axios'
import programList from '~/components/programList'
import inputSearch from '~/components/inputSearch'
// import getProgramInfo from '~/plugins/getProgramInfo'
import getJsonp from '~/plugins/getJsonp'
export default {
  components: {
    programList,
    inputSearch,
  },
  created() {
    this.getPreProgram()
  },
  methods: {
    async getPreProgram(){
      // const programList_baseUrl = 'https://www.onsen.ag/api/shownMovie/shownMovie.json'
      // const programList_getUrl = encodeURI(programList_baseUrl)
      // const res = await axios.get(programList_getUrl).then(function(response) {
      //   return response.data.result
      // })
      const headNode = document.querySelector('body')
      const paddingScript = document.createElement('script')
      paddingScript.src = 'https://www.onsen.ag/api/shownMovie/shownMovie.json'
      // paddingScript.type = 'application/json'
      // paddingScript.id = 'shownMovie'
      headNode.appendChild(paddingScript)
      const elem = document.getElementById("shownMovie");
      // const json = elem.textContent
      console.log(elem, "--------------------------------")
      
      // const programInfoList = await getProgramInfo(res)
      // thid.$store.commit('setprogramsInfoList', programInfoList)
    }
  },
  async fetch ({ store, params }) {
    

  }
  
  
}
</script>
