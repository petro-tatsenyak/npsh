import express from 'express';
import usersController from '../users/user.controller';
import { isAuth } from '../util';

const router = express.Router();

router.put('/:id', isAuth, usersController.updateUser);

router.post('/signin',usersController.loginUser);

router.post('/register', usersController.registerUser);

router.get('/createadmin',usersController.createAdmin);

export default router;
