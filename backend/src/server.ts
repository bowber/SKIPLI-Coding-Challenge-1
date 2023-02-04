// Simple express server
import express from 'express';

const app = express();
const port = 8080;
const host = '0.0.0.0';

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
  console.log('Or http://localhost:8080 in local development');
});
