// Simple express server
import express from 'express';

const app = express();
const port = 80;
const host = '0.0.0.0';

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
  console.log('Or http://localhost:8080 in local development');
});
