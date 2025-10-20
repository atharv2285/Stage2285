import pool from '../config/database.js';

export const createPost = async (postData) => {
  const { user_id, content, media_url, display_order } = postData;

  const query = `
    INSERT INTO posts (user_id, content, media_url, display_order)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const result = await pool.query(query, [user_id, content, media_url, display_order || 0]);
  return result.rows[0];
};

export const getPostsByUserId = async (userId) => {
  const query = `
    SELECT p.*, u.name, u.username, u.avatar_url
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = $1
    ORDER BY p.display_order, p.created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const updatePost = async (id, userId, updates) => {
  const fields = [];
  const values = [];
  let index = 1;

  Object.keys(updates).forEach(key => {
    if (key !== 'id' && key !== 'user_id' && key !== 'created_at') {
      fields.push(`${key} = $${index}`);
      values.push(updates[key]);
      index++;
    }
  });

  if (fields.length === 0) return null;

  values.push(id, userId);
  const query = `
    UPDATE posts
    SET ${fields.join(', ')}
    WHERE id = $${index} AND user_id = $${index + 1}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deletePost = async (id, userId) => {
  const query = 'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *';
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};
