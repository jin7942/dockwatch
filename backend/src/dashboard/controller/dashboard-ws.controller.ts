import { WebSocket } from 'ws';
import { bridgeWebSocket } from '../../common/utils/ws-util';
import { IncomingMessage } from 'http';

export class DashboardWsController {
    /**
     * 대시보드용 실시간 자원 조회 핸들러
     *
     * @route CONNECTION /ws/dashboard/info
     * @param ws
     */
    public handleSysUsage = (ws: WebSocket, req: IncomingMessage): void => {
        bridgeWebSocket({
            req,
            clientWs: ws,
            route: 'dashboard/info',
        });
    };
}
