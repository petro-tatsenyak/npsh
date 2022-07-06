import axios from 'axios';
import config from '../config';

const instance = axios.create({ baseURL: config.SERVER_URL });
export default instance
