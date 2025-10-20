import pool from '../config/database.js';

export const createPost = async (postData) => {
  const { user_id, content, media_url } = postData;

  const query = `
    INSERT INTO posts (user_id, content, media_url)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(query, [user_id, content, media_url]);
  return result.rows[0];
};

export const getPostsByUserId = async (userId) => {
  const query = `
    SELECT p.*, u.name, u.username, u.avatar_url
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = $1
    ORDER BY p.created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const deletePost = async (id, userId) => {
  const query = 'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *';
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};
