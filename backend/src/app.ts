import express from 'express';
import cors from 'cors';
import { serverRouter } from './server/route/server-http.route';
import { errorHandler } from './common/error/error-handler';
import { logRouter } from './log/route/log-http.route';
import { containerRouter } from './container/route/container-http.route';
import { dashboardRouter } from './dashboard/route/dashboard-http.route';

import { CONFIG } from './common/_config/constants';

const app = express();

// cors 설정
app.use((req, res, next) => {
    if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
        // WebSocket Upgrade 요청은 CORS 검사 건너뜀
        return next();
    }
    cors({
        origin: (origin, callback) => {
            if (!origin || CONFIG.ORIGIN_URL.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('CORS 차단: 허용되지 않은 Origin'));
            }
        },
        credentials: false,
    })(req, res, next);
});

// 기본 미들웨어 설정
app.use(express.json());

// API 라우트 등록
app.use('/api/server', serverRouter);
app.use('/api/container', containerRouter);
app.use('/api/log', logRouter);
app.use('/api/dashboard', dashboardRouter);

// 공통 에러 핸들러 등록
app.use(errorHandler);
//
export default app;
