import axios from 'axios';
import { CONFIG } from '../_config/constants';

export const api = axios.create({
    baseURL: CONFIG.API_BASE_URL, // 백엔드 주소 (개발용)
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
