import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config({ path: '../unsplash.env' });

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { method } = req;

  if (method === 'GET' && req.url === '/api/frases') {
    try {
      const response = await fetch('https://zenquotes.io/api/random', { method: 'GET' });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json( { error: 'Error ao buscar a frase' } );
    }
  } else if (method === 'GET' && req.url === '/api/imagem') {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=landscape&client_id=${accessKey}`, { method: 'GET'});
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json( { error: 'Erro ao buscar a imagem' } );
    }
  } else {
    res.status(404).json( { error: 'Rota não encontrada. ' } );
  }
}
