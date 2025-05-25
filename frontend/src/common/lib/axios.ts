import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.0.77:3738/api', // 백엔드 주소 (개발용)
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
