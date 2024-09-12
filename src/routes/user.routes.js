import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controllers.js';

const userRoutes = Router();

// ===== GET USERS =====
userRoutes.get('/users', getUsers);

// ===== GET ONE USER =====
userRoutes.get('/users/:id', getUser);

// ===== CREATE USER =====
userRoutes.post('/users', createUser);

// ===== DELETE USER =====
userRoutes.delete('/users/:id', deleteUser);

// ===== UPDATE USER =====
userRoutes.put('/users/:id', updateUser);

export default userRoutes;
