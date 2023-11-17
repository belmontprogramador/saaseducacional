const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const cadastroAdmin =  async (req, res) => {

    const {nome, email, nome_usuario, senha }  = req.body

    try {
        const senhaCriptografada = bcrypt.hash(senha,10)

        const admin = await prisma.Admin.create({
            data: {
              nome: "Felipe Belmont da Costa",
              email: "belmontprogramador@gmail.com",
              nome_usuario: "belmont",
              senha: senhaCriptografada
            },
          });
        
          console.log('Admin criado:', admin);
          res.status(200).json({ mensagem: 'Admin cadastrado com sucesso', admin })

    seed()  
    } catch (error) {
        
        console.error('Erro ao semear o banco de dados:', error);
        
    }
  
 
}

 module.exports = cadastroAdmin 