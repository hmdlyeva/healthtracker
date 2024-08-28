const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

//body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//cors
const cors = require('cors')
app.use(cors())

//db
require('./src/config/db')

//router
const router = require('./src/router/router')
app.use("/",router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})