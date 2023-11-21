const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

require('dotenv').config();

const validarCadastroAdmin = async (req, res, next) => {
  const { nome, email, senha, nome_usuario, token } = req.body;
 

  if (!nome || !email || !senha || !nome_usuario) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(email)) {
    return res.status(400).json({ mensagem: 'Digite um email válido.' });
  }

  try {

    const tokenUsuario = jwt.verify(token, process.env.SENHA_TOKEN);

    const adminLogado = await prisma.Admin.findUnique({
      where: {
        id: tokenUsuario.id,
      },
    });
    
    if (!adminLogado) {
      return res.status(403).json({ mensagem: 'Este usuário não pode cadastrar novos administradores.' });
    }

    next();

  } catch (error) {
    console.error('Erro ao validar cadastro de admin:', error);
    return res.status(500).json({ mensagem: 'Errrro interno no servidor' });
  }
};

module.exports = validarCadastroAdmin;



