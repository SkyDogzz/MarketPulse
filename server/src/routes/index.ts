import { Router } from 'express';
import userRoutes from './users';
import productRoutes from './products';
import cartRoutes from './carts';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

export default router;
