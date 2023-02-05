// Simple express server
import express from 'express';
import cors from 'cors';
import { CreateNewAccessCode, ValidateAccessCode } from './data';
import jwt from 'jsonwebtoken';

const app = express();
const port = 80;
const host = '0.0.0.0';
const ACCESS_TOKEN_PRIVATE = 'this should be saved in a secret manager';

app.use(cors())
app.use(express.json());


app.get('/', (_req, res) => {
  res.send('OK');
});


app.post('/login/access-code', async (req, res) => {
  const phoneNumber = req.body.phoneNumber as string;
  console.log(process.env.FIRESTORE_EMULATOR_HOST);

  if (!phoneNumber) {
    res.status(400).send({ error: 'Missing phone number' });
    return;
  }

  const accessCode = await CreateNewAccessCode(phoneNumber);

  if (!accessCode) {
    res.status(404).send({ error: 'Phone number not found' });
    return;
  }
  res.send({ success: true });
});


app.post('/login/validate', async (req, res) => {
  const phoneNumber = req.body.phoneNumber as string;
  const accessCode = req.body.accessCode as string;

  if (!phoneNumber || !accessCode) {
    res.status(400).send({ error: 'Missing phone number or access code' });
    return;
  }

  const valid = await ValidateAccessCode(phoneNumber, accessCode);

  if (!valid) {
    res.status(401).send({ error: 'Invalid access code' });
    return;
  }

  res.send({
    success: true,
    token: generateJwt(phoneNumber)
  });

  console.log(`User ${phoneNumber} logged in`);
});


const generateJwt = (phoneNumber) => {
  const payload = {
    sub: phoneNumber,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
  };
  return jwt.sign(payload, ACCESS_TOKEN_PRIVATE);
};


const validateJwt = (token) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_PRIVATE);
    return decoded;
  } catch (err) {
    return null;
  }
};


app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
  console.log(`Or http://localhost:${port} in local development`);
});
