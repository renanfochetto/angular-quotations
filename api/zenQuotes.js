import fetch from 'node-fetch';

export default async function handler(req, res) {
  try{
  const response = await fetch ('https://zenquotes.io/api/random', { method: 'GET'});
  const data = await response.json();

  res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar frase' });
  }
}
