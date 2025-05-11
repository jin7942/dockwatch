import express from 'express';
import cors from 'cors';
import { serverRouter } from './server/route/server-http.route';
import { errorHandler } from './common/error/error-handler';
import { logRouter } from './log/route/log-http.route';
import { containerRouter } from './container/route/container-http.route';
import { dashboardRouter } from './dashboard/route/dashboard-http.route';

const app = express();
const allowedOrigins = ['http://localhost:3000']; // 허용할 도메인만 나열

// cors 설정
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('CORS 차단: 허용되지 않은 Origin'));
            }
        },
        credentials: false, // 쿠키나 세션이 필요한 경우
    }),
);

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
