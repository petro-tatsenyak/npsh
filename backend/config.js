import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/npsh',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  FONDY_MERCHANT_ID: process.env.FONDY_MERCHANT_ID || 1396424,
  FONDY_SECRET_KEY: process.env.FONDY_SECRET_KEY || 'test',
  NOVA_POSHTA_API_KEY: process.env.NOVA_POSHTA_API_KEY || '',
  NOVA_POSHTA_API_LINK: process.env.NOVA_POSHTA_API_KEY || 'https://api.novaposhta.ua/v2.0/json/',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
  CLIENT_URL: process.env.MONGODB_URL || 'http://localhost:3000',
  SERVER_URL: process.env.MONGODB_URL || 'http://localhost:5000/api',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@example.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '1234'
};
