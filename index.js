const express = require('express');
const Mercury = require('@postlight/mercury-parser');
const app = express();

app.get('/parser', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse URL', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mercury Parser API is running on port ${PORT}`);
});
