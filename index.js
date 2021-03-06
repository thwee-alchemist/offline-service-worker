const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use('/test', express.static(path.join(__dirname, 'test')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))