export const CONFIG = {
    // 개발용
    ORIGIN_URL: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.0.54:5173'],
    // ORIGIN_URL: process.env.ORIGIN_URL?.split(',') || [],
    AGENT_BASE_URL: process.env.AGENT_BASE_URL || 'http://localhost:7000',
    CONTAINER_CONTROL_KEY: process.env.CONTAINER_CONTROL_KEY,
    PORT: Number(process.env.PORT) || 3738,
};
