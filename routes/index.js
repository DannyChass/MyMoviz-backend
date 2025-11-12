var express = require('express');
var router = express.Router();
require('dotenv').config();

const APIToken = process.env.APIToken;

router.get('/movies', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        headers: {
          Authorization: `Bearer ${APIToken}`,
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Erreur TMDB :', error.message);
    res.status(500).json({ error: 'Impossible de récupérer les découvertes' });
  }
});

module.exports = router;