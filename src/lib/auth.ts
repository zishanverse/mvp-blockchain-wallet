// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// Load environment variables
config();

const secret = process.env.JWT_SECRET as string; // Retrieve secret key from environment variables

export function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
