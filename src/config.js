import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:5000/api',
};
