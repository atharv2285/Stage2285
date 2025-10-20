import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let pool;

try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
  });

  pool.query('SELECT NOW()', (err) => {
    if (err) {
      console.warn('⚠️  Database connection failed. Please set up PostgreSQL and update DATABASE_URL in server/.env');
      console.warn('   See server/schema.sql for the database schema');
    } else {
      console.log('✅ Database connected successfully');
    }
  });
} catch (error) {
  console.error('Database initialization error:', error.message);
  console.warn('⚠️  Please set up PostgreSQL and configure DATABASE_URL in server/.env');
}

export default pool;
