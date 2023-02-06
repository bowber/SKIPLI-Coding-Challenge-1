// Simple express server
import express from 'express';
import cors from 'cors';
import { CreateNewAccessCode, ValidateAccessCode } from './data';
import { sendOTP } from './twilio';

const app = express();
const port = 80;
const host = '0.0.0.0';

app.use(cors())
app.use(express.json());


app.get('/', (_req, res) => {
  res.send('OK');
});


app.post('/login/access-code', async (req, res) => {
  const phoneNumber = req.body.phoneNumber as string;
  if (!phoneNumber) {
    res.status(400).send({ error: 'Missing phone number' });
    return;
  }

  const accessCode = await CreateNewAccessCode(phoneNumber);

  if (!accessCode) {
    res.status(404).send({ error: 'Phone number not found' });
    return;
  }
  sendOTP(phoneNumber, accessCode.toString(10))
    .then(async () => {
      console.log(`Sent access code ${accessCode} to ${phoneNumber}`);
    })

  res.send({ success: true });
});


app.post('/login/validate', async (req, res) => {
  const phoneNumber = req.body.phoneNumber as string;
  const accessCode = req.body.accessCode as string;

  if (!phoneNumber || !accessCode) {
    res.status(400).send({ error: 'Missing phone number or access code' });
    return;
  }

  const valid = await ValidateAccessCode(phoneNumber, parseInt(accessCode));

  if (!valid) {
    res.status(401).send({ error: 'Invalid access code' });
    return;
  }

  res.send({
    success: true,
  });

  console.log(`User ${phoneNumber} logged in`);
});



app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
  console.log(`Or http://localhost:${port} in local development`);
});
