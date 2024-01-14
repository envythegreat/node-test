// src/index.ts
import express from 'express';
import authRoutes from './routes/auth.routes';
import { prisma } from './models/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
