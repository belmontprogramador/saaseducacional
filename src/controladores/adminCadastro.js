const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


const cadastroAdmin =  async (req, res) => {
  const {nome, email, senha, nome_usuario}  = req.body

    try {

        const senhaCriptografada = await bcrypt.hash(senha,10)
        const cadastroAdmin = await prisma.Admin.create({
            data:{
                nome:nome,
                email: email,
                nome_usuario: nome_usuario,
                senha: senhaCriptografada
        }
        })

      res.status(200).json({messagem:"Cadastrado com sucesso"})
    } catch (error) {
 
        return res.status(500).json({ message: error }) 
        
    }
}

module.exports = cadastroAdmin 