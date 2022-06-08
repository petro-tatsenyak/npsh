import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => jwt.sign(
  {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isSeller: user.isSeller,
  },
  config.JWT_SECRET,
  {
    expiresIn: '48h',
  },
);

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    const decoded = await jwt.verify(onlyToken, config.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: 'Invalid Token' });
    }

    req.user = decoded;

    return next();
  }
  return res.status(401).send({ message: 'Token is not supplied.' });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

const isSeller = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    return next();
  }
  return res.status(401).send({ message: 'Seller Token is not valid.' });
};

export { getToken, isAuth, isAdmin, isSeller };
