import http from 'http';
import app from './app';
import { initWebSocketServer } from './ws/socket';
import { CONFIG } from './common/_config/constants';

// 1. HTTP 서버 생성
const server = http.createServer(app);

// 2. WebSocket 서버 초기화
initWebSocketServer(server);

// 3. HTTP 서버 시작
server.listen(CONFIG.PORT, () => {
    console.log(`dockwatch-agent is running on port ${CONFIG.PORT}`);
});
