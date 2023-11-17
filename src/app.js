const express = require('express')
const admin = require('./rotas/admin')
const app = express()

app.use(express.json())

app.use(admin)


module.exports = app
 

 