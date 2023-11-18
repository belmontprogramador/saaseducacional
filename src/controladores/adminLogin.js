const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
 

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
      return res.status(401).json({ mensagem: 'Nome de usuário ou senha incorretos.' });
    }

    

    res.status(200).json({ mensagem: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor', error: error.message });
  }
};

module.exports = login;

