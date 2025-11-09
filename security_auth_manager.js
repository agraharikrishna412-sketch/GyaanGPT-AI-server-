// security/auth_manager.js
// JWT-based auth middleware and helpers.

import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const SECRET = config?.jwtSecret || process.env.JWT_SECRET || 'verysecret';
const DEFAULT_EXPIRES = '7d';

export function signToken(payload = {}, opts = {}) {
  const expiresIn = opts.expiresIn || DEFAULT_EXPIRES;
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

// Express middleware to protect routes
export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });
  req.user = payload;
  return next();
}