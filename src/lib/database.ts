// src/lib/database.js
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const db = createPool({ connectionString: POSTGRES_URL });

export const query = async (text, params) => {
  const client = await db.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

export { db };
