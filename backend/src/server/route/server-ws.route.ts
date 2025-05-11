import { WebSocket } from 'ws';
import { ServerWsController } from '../controller/server-ws.controller';
import { IncomingMessage } from 'http';

export class ServerWsRouter {
    private serverWsController: ServerWsController = new ServerWsController();

    public handle = (ws: WebSocket, pathname: string, req: IncomingMessage): void => {
        // 라우팅 테이블 (req 포함)
        const routes: Record<string, (ws: WebSocket, req: IncomingMessage) => void> = {
            '/usage': this.serverWsController.handleServerUsageStream,
            '/network': this.serverWsController.handleNetworkUsageStream,
        };

        const handler = routes[pathname];

        if (handler) {
            handler(ws, req); // req 전달
        } else {
            ws.close(1000, 'Unknown WebSocket sub-route');
        }
    };
}
