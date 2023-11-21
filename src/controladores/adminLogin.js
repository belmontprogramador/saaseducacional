const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { nome_usuario, senha } = req.body;

  try {
    const admin = await prisma.Admin.findUnique({
      where: {
        nome_usuario: nome_usuario,
        
      },
    });
    console.log('Resultado da consulta:', admin)
    

    if (!admin) {
      return res.status(401).json({ mensagem: 'Nmmmome de usuário ou senha incorretos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, admin.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Nome de useuário ou senha incorretos.' });
    }

    const { senha: _, ...usuarioLogado } = admin;

    const token = jwt.sign({id: admin.id}, process.env.SENHA_TOKEN, {expiresIn: '8h'})

     console.log(token);

    res.status(200).json({ mensagem: usuarioLogado, token: token });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor', error: error.message });
  }
};

module.exports = login;

