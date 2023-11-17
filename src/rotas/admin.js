const express = require('express')
const cadastroAdmin = require('../controladores/adminCadastro')
const validarCadastroAdmin = require('../intermdiarios/adminCadastro')
const login = require('../controladores/adminLogin')
 

const admin = express()

admin.use(express.json())

admin.post('/admincadastro', validarCadastroAdmin, cadastroAdmin)
admin.post('/login', login)

module.exports = admin 