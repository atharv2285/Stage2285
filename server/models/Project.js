import pool from '../config/database.js';

export const createProject = async (projectData) => {
  const { user_id, title, description, tags, status, image_url, github_url, demo_url, display_order } = projectData;

  const query = `
    INSERT INTO projects (user_id, title, description, tags, status, image_url, github_url, demo_url, display_order)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const result = await pool.query(query, [
    user_id, title, description, tags || [], status || 'In Progress',
    image_url, github_url, demo_url, display_order || 0
  ]);
  return result.rows[0];
};

export const getProjectsByUserId = async (userId) => {
  const query = 'SELECT * FROM projects WHERE user_id = $1 ORDER BY display_order, created_at DESC';
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const getProjectById = async (id) => {
  const query = 'SELECT * FROM projects WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const updateProject = async (id, userId, updates) => {
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
    UPDATE projects
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${index} AND user_id = $${index + 1}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteProject = async (id, userId) => {
  const query = 'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *';
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};
