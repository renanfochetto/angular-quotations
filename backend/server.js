const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/frases', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar frase' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
