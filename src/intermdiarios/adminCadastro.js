const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validarCadastroAdmin = async (req, res, next) => {
  const { nome, email, senha, nome_usuario } = req.body;

  if (!nome || !email || !senha || !nome_usuario) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(email)) {
    return res.status(400).json({ mensagem: 'Digite um email válido.' });
  }

  try {

    const adminLogado = await prisma.Admin.findUnique({
      where: {
        id: 1,
      },
    });

    if (!adminLogado || adminLogado.id !== 1) {
      return res.status(403).json({ mensagem: 'Este usuário não pode cadastrar novos administradores.' });
    }

    next();

  } catch (error) {
    console.error('Erro ao validar cadastro de admin:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

module.exports = validarCadastroAdmin;



