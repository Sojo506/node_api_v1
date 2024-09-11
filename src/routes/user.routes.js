import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/users', (req, res) => {
  res.send('Obteniendo usuarios...');
});

userRoutes.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send('Obteniendo usuario: ' + userId);
});

userRoutes.post('/users', (req, res) => {
  res.send('Creando usuario');
});

userRoutes.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send('Eliminando usuario: ' + userId);
});

userRoutes.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send('Actualizando usuario: ' + userId);
});

export default userRoutes;
