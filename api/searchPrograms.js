import axios from 'axios'

export default async (req, res, next) => {
  const searchWord = req._parsedUrl.query.split('word=')[1]

  const searchProgramURL = `https://www.onsen.ag/web_api/programs/search?word=${searchWord}`
  const programIdList = await axios.get(searchProgramURL).then((result) => {
    // console.log(result)
    return result.data
  })
  // console.log(res, programIdList)
  res.end(programIdList.toString())
  next()
}
