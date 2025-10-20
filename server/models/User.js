import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
  const { email, password, name, username, google_id, avatar_url } = userData;
  const passwordHash = password ? await bcrypt.hash(password, 10) : null;

  const query = `
    INSERT INTO users (email, password_hash, name, username, google_id, avatar_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, name, username, avatar_url, stage_level, bio, tagline, created_at
  `;

  const result = await pool.query(query, [email, passwordHash, name, username, google_id || null, avatar_url || null]);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const query = 'SELECT id, email, name, username, avatar_url, stage_level, bio, tagline, college, year, interests, skills, github_url, linkedin_url, created_at FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const findUserByUsername = async (username) => {
  const query = 'SELECT id, email, name, username, avatar_url, stage_level, bio, tagline, college, year, interests, skills, github_url, linkedin_url, created_at FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

export const updateUser = async (id, updates) => {
  const fields = [];
  const values = [];
  let index = 1;

  Object.keys(updates).forEach(key => {
    if (key !== 'id' && key !== 'created_at') {
      fields.push(`${key} = $${index}`);
      values.push(updates[key]);
      index++;
    }
  });

  if (fields.length === 0) return null;

  values.push(id);
  const query = `
    UPDATE users
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${index}
    RETURNING id, email, name, username, avatar_url, stage_level, bio, tagline, college, year, interests, skills, github_url, linkedin_url
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
