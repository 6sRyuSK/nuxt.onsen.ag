<template>
  <section class="container">
    <programList />
  </section>
</template>

<script>
import axios from 'axios'
import programList from '~/components/programList'


export default {
  components: {
    programList,
  },
  async fetch ({ store, params }) {
    const programList_baseUrl = 'http://www.onsen.ag/api/shownMovie/shownMovie.json'
    const programList_getUrl = encodeURI(programList_baseUrl)
    const res = await axios.get(programList_getUrl).then(function(response) {
      return response.data.result
    })
    const programInfo_baseUrl = 'http://www.onsen.ag/data/api/getMovieInfo/'
    let programInfoList = []

    const promises = Object.keys(res).map((key) => {
      const item = res[key];
      const programInfo_getUrl = encodeURI( programInfo_baseUrl + item)
      return axios.get(programInfo_getUrl).then(function(response) {
        // console.log(response)
        return JSON.parse(response.data.replace('callback(', '').replace(');', ''))
      
      })
    });

    // promisesを実行
    await Promise.all(promises).then(function(response) {
      response.forEach(function(value) {
        try{
          if(!value.moviePath.pc){
            return
          }
          // console.log( value.title );
          programInfoList.push({
            title: value.title,
            thumbnailPath: value.thumbnailPath, 
            moviePath: value.moviePath.pc
          })
        } catch (err) {
          // console.log(err)
        }
      })
    })

    store.commit('setprogramsInfoList', programInfoList)

  }
  
  
}
</script>
