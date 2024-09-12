import { pool } from '../db.js';

// ===== GET USERS =====
const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');

    return res.status(200).json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Error fetching users:', error);

    return res
      .status(500)
      .json({ status: 'error', message: 'Error fetching users' });
  }
};

// ===== GET ONE USER =====
const getUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid user ID' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    return res.status(200).json({ status: 'success', data: rows[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res
      .status(500)
      .json({ status: 'error', message: 'Error fetching user' });
  }
};

// ===== CREATE USER =====
const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Name and email are required' });
  }

  try {
    const { rowCount: existingCount } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingCount > 0) {
      return res
        .status(409)
        .json({ status: 'error', message: 'User already exists' });
    }

    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    return res.status(201).json({ status: 'success', data: rows[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    return res
      .status(500)
      .json({ status: 'error', message: 'Error creating user' });
  }
};

// ===== DELETE USER =====
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid user ID' });
  }

  try {
    const { rowCount } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId]
    );

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    res.sendStatus(204); // Success, no content to return
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ status: 'error', message: 'Error deleting user' });
  }
};

// ===== UPDATE USER =====
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Name and email are required' });
  }

  try {
    const { rowCount, rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, userId]
    );

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: rows[0] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ status: 'error', message: 'Error updating user' });
  }
};

export { getUsers, getUser, createUser, deleteUser, updateUser };
