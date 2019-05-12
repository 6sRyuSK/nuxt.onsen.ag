import axios from 'axios'
const getProgramInfo = async (programList) => {
  const programInfo_baseUrl = 'http://www.onsen.ag/data/api/getMovieInfo/'
    let programInfoList = []

    const promises = Object.keys(programList).map((key) => {
      const item = programList[key];
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
          programInfoList.push({
            title: value.title,
            thumbnailPath: value.thumbnailPath, 
            moviePath: value.moviePath.pc,
            update: new Date(value.update),
            schedule: value.schedule,
            personality: value.personality,
          })
        } catch (err) {
          // console.log(err)
        }
      })
    })

    return programInfoList
}

export default getProgramInfo