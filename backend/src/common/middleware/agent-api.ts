import axios from 'axios';

export const agent = axios.create({
    baseURL: process.env.AGENT_BASE_URL || 'http://localhost:7000',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});
