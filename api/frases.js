export default async function handler(req, res) {
  const apiUrl = 'https://zenquotes.io/random';
  console.log("Chamando a API:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Erro ao buscar dados:', response.status, response.statusText);
      return res.status(response.status).json({ error: 'Erro ao buscar dados' });
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro no processamento:', error);
    res.status(500).json({ error: 'Erro ao buscar frase' });
  }
}

