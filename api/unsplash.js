import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: '../unsplash.env' } );
console.log('Variáveis de ambiente:', process.env);


export default async function handler(req, res) {
  try {
    console.log('Endpoint /api/imagem foi chamado');
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const response = await fetch(`https://api.unsplash.com/photos/random?query=landscape&client_id=${accessKey}`, { method: 'GET'});
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagem do Unsplash' });
  }
}
