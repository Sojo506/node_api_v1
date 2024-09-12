import pg from 'pg';
import {
  PG_HOST,
  PG_NAME,
  PG_PASSWORD,
  PG_PORT,
  PG_USER,
} from './config.js';

export const pool = new pg.Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_NAME,
  port: PG_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});