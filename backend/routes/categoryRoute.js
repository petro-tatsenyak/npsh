import express from 'express';
import categoriesController from '../categories/category.controller';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get('/', categoriesController.getCategories);

router.post('/', isAuth, isAdmin, categoriesController.createCategory);

router.patch('/:id', isAuth, isAdmin, categoriesController.updateCategory);

export default router;
