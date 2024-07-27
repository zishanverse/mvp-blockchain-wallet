import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { Client } from 'pg';
import 'dotenv/config'; // This will load the environment variables from the .env file

const client = new Client({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export async function post({ request }: RequestEvent) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const userCheckResult = await client.query(userCheckQuery, [email]);

    if (userCheckResult.rows.length > 0) {
      return json({ error: 'User already exists' }, { status: 400 });
    }

    // Add the new user to the database
    const insertQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    await client.query(insertQuery, [email, password]);

    return json({ message: 'User registered successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: 'An error occurred' }, { status: 500 });
  }
}
