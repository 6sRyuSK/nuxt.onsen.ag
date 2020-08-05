import axios from 'axios'

const express = require('express')

const app = express()

app.get('/search', async (req, res) => {
  const searchWord = req.query.word
  const searchProgramURL = encodeURI(`https://www.onsen.ag/web_api/programs/search?word=${searchWord}`)
  const programIdList = await axios.get(searchProgramURL).then((result) => {
    return result.data
  })
  res.send(programIdList)
})

module.exports = {
  path: '/api',
  handler: app
}
