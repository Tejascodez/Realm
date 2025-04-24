import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';

config();
const app = express();
app.use(json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/rentals', rentalRoutes);


connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
