import axios from 'axios';
import { SERVER_URL } from '../config';

const instance = axios.create({ baseURL: SERVER_URL });
export default instance
