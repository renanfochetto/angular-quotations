require('dotenv').config({ path: '../unsplash.env' });

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

app.get('/api/imagem', async(req, res) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://api.unsplash.com/photos/random?query=landscape&client_id=${accessKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagem do Unsplash' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
