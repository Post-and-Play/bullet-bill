const express = require('express');
const cors = require('cors'); // Importe o pacote cors

const app = express();

// Configure o middleware cors para permitir solicitações de qualquer origem (não recomendado em produção)
app.use(cors());

// Outras configurações e rotas do servidor

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

const corsOptions = {
  origin: 'http://localhost:3000', // Substitua com a origem do seu aplicativo React
};

app.use(cors(corsOptions));