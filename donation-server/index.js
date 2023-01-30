const express = require('express')
const cors = require('cors')
const db = require('./firebaseConfig')
const app = express()
app.use(express.json())
app.use(cors())

app.listen(8080, () => console.log("Up and Running 8080"))