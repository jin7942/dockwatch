import { WebSocket } from 'ws';
import { bridgeWebSocket } from '../../common/utils/ws-util';
import { IncomingMessage } from 'http';
/**
 * 서버 리소스 WebSocket 컨트롤러
 */
export class ServerWsController {
    /**
     * 서버 사용량 통합 실시간 스트림 핸들러
     *
     * @route CONNECTION /ws/server/usage
     * @param 클라이언트 WebSocket
     */
    public handleServerUsageStream = (ws: WebSocket, req: IncomingMessage): void => {
        bridgeWebSocket({
            req,
            clientWs: ws,
            route: 'server/usage',
        });
    };

    /**
     * 네트워크 송수신량(bps) 실시간 스트림 핸들러
     *
     * @route CONNECTION /ws/server/network
     * @param  클라이언트 WebSocket
     */
    public handleNetworkUsageStream = (ws: WebSocket, req: IncomingMessage): void => {
        bridgeWebSocket({
            req,
            clientWs: ws,
            route: 'server/network',
        });
    };
}
