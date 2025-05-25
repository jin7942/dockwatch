import axios from 'axios';
import { CONFIG } from '../../common/_config/constants';

export const agent = axios.create({
    baseURL: CONFIG.AGENT_BASE_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});
