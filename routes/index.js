var express = require('express');
var router = express.Router();
require('dotenv').config();

const APIToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjNmYzlmYzZiMDZjYTViZGYyZTdjY2Q5Y2U0ZGIzZSIsIm5iZiI6MTc2MjkzODg5MC44NzM5OTk4LCJzdWIiOiI2OTE0NTAwYTNjZDgwY2UxN2YzYTNiN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.spu7Gqhah5FQ0Xy6wpDhebNJ_GjWPH6Twl_eJXXImKM';

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

    // ✅ Structure attendue par le test
    res.json({ movies: data.results });
  } catch (error) {
    console.error('Erreur TMDB :', error.message);
    res.status(500).json({ error: 'Impossible de récupérer les découvertes' });
  }
});

module.exports = router;