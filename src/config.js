import dotenv from 'dotenv';

dotenv.config();

const config = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000',
  IMAGE_LINK: process.env.REACT_APP_IMAGE_LINK || '',
};

export default config;
