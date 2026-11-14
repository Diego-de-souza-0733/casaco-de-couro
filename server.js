//Dependências //Executar da primeira vez
//npm init -y
//npm install express mysql2 dotenv
//npm install cors

//Para executar o servidor
//nodemon server.js

const cors = require('cors');

const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

/*
// Rota GET - Listar Produtos
app.get('/listarProd', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});*/

//Rota POST - Cadastrar um novo visitante
app.post('/cadVisitante', (req, res) => {
  // As variáveis dentro dos {} recebem os dados que vieram do front-end
  const { nome } = req.body;

  //Se os dados que vieram do font-end forem em branco
  if (!nome) {
    return res.status(400).json({ error: 'O nome está em branco' });
  }

  //Realiza a inserção dos dados recebidos no banco de dados
  const sql = 'INSERT INTO pessoas (nome_Pessoa) VALUES (?)';
  db.query(sql, [nome], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'pessoa já está cadastrada' });
      }
      return res.status(500).json({ error: err.message });
    }

    // Em caso de sucesso encaminha uma mensagem e o id do produto
    res.status(201).json({ message: 'O visitante foi cadastrado com sucesso', id: result.insertId });
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});