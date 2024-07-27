const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  // Hash password and store user in database
  res.json({ userId: 1, token: 'dummy-token' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // Verify user and return token
  res.json({ userId: 1, token: 'dummy-token' });
});

// Other API routes...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
