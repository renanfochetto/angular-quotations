export default async function handler(req, res) {
  const apiUrl = 'https://zenquotes.io/random';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', 'https://angular-visual-quotes.vercel.app/');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar frase' });
  }
}
