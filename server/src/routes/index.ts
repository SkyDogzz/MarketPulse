import { Router } from 'express';
import userRoutes from './users';
import postRoutes from './posts';
import productRoutes from './products';

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/products', productRoutes);

export default router;
