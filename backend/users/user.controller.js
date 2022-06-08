import bcrypt from 'bcryptjs';

import userService from './user.service';
import { getToken } from '../util';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config';

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Invalid Email or Password.' });
    }

    return res.send({
      ...user,
      password: '',
      token: getToken(user),
    });
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  try {
    const user = await userService.createUser({
      name,
      email,
      lastName,
      password: bcrypt.hashSync(password, 10),
    });

    if (!user) return res.status(401).send({ message: 'Invalid User Data.' });

    return res.send({ ...user, token: getToken(user) });
  } catch (error) {
    return next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      name: 'Admin',
      email: ADMIN_EMAIL,
      lastName: 'Admin',
      password: bcrypt.hashSync(ADMIN_PASSWORD, 10),
      isAdmin: true,
    });

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, lastName, email } = req.body;

  try {
    const user = await userService.updateUserById(id, { name, lastName, email });

    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }

    return res.status(201).send({
      data: user,
      message: 'User updated successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  createAdmin,
  updateUser,
};
