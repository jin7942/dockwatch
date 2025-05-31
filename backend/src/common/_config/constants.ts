export const CONFIG = {
    ORIGIN_URL: ['https://dockwatch.jin7942.co.kr'],
    AGENT_BASE_URL: process.env.AGENT_BASE_URL || 'http://host.docker.internal:7000',
    AGENT_BASE_WS_URL: process.env.AGENT_BASE_WS_URL || 'ws://host.docker.internal:7000',
    // CONTAINER_CONTROL_KEY: process.env.CONTAINER_CONTROL_KEY,
    PORT: Number(process.env.PORT) || 3738,
};
