import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config({ path: '../unsplash.env' });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { method, url } = req;

  console.log('Método:', method);
  console.log('URL:', url);

  if (method === 'GET' && url === '/api/frases') {
    console.log('Entrou no bloco: frases');
    try {
      console.log('Buscando frase da API externa...');
      const response = await fetch('https://zenquotes.io/api/random', { method: 'GET' });
      console.log('Resposta da API externa:', response.status);
      const data = await response.json();
      console.log('Dados retornados:', data);
      res.status(response.status).json(data);
    } catch (error) {
      console.log('Erro ao buscar a frase');
      res.status(500).json( { error: 'Error ao buscar a frase' } );
    }
  } else if (method === 'GET' && req.url === 'https://visual-quotes-five.vercel.app/api/imagem') {
    console.log('Entrou no bloco: imagem');
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
