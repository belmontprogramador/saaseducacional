const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.get('/estados', async (req, res) => {
  try {
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const estados = response.data.map(estado => ({
      id: estado.id,
      nome: estado.nome,
    }));
    res.json(estados);
  } catch (error) {
    console.error('Erro ao obter estados:', error);
    res.status(500).json({ error: 'Erro ao obter estados' });
  }
});

app.get('/municipios/:estadoId', async (req, res) => {
  const estadoId = req.params.estadoId;

  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
    const municipios = response.data.map(municipio => ({
      id: municipio.id,
      nome: municipio.nome,
    }));
    res.json(municipios);
  } catch (error) {
    console.error('Erro ao obter municípios:', error);
    res.status(500).json({ error: 'Erro ao obter municípios' });
  }
});

const cadastrarEmpresa = async (req, res) => {
    const { cnpj, razao_social, nome_fantasia, dia_do_pagamento, cep, logradouro, numero, complemento, bairro, estadoId, municipioId, usuario, senha } = req.body;
  
    try {
      const novaEmpresa = await prisma.empresa.create({
        data: {
          cnpj,
          razao_social,
          nome_fantasia,
          dia_do_pagamento,
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          estadoId,      // Utilize o ID do estado fornecido dinamicamente pela API
          municipioId,   // Utilize o ID do município fornecido dinamicamente pela API
          usuario,
          senha: await bcrypt.hash(senha, 10),
        },
      });
  
      res.status(200).json(novaEmpresa);
    } catch (error) {
      console.error('Erro ao cadastrar empresa:', error);
      res.status(500).json(error.message);
    }
  };
module.exports = cadastrarEmpresa;
