const { Client } = require('pg');

module.exports = async (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const result = await client.query('SELECT NOW()');
  await client.end();

  res.status(200).json({ time: result.rows[0].now });
};
