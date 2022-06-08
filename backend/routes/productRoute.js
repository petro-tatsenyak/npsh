import express from 'express';
import productsController from '../products/product.controller';
import {isAuth, isAdmin, isSeller} from '../util';

const router = express.Router();

router.get('/', productsController.getProductsByCategory);

router.get('/seller', isAuth, isSeller, productsController.getProductsBySeller);

router.get('/:id', productsController.getProductId);

router.post('/:id/reviews', isAuth, productsController.addReviewForProduct);

router.put('/:id', isAuth, isAdmin, productsController.updateProduct);

router.delete('/:id', isAuth, isAdmin, productsController.deleteProduct);

router.post('/', isAuth, isAdmin, productsController.createProduct);

export default router;
