const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/images/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`https://http.dog/${code}.jpg`, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching image');
  }
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
