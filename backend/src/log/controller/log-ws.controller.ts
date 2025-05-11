import { WebSocket } from 'ws';
import { bridgeWebSocket } from '../../common/utils/ws-util';
import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ContainerController } from '../../container/controller/container-http.controller';

export class LogWsController {
    private containerController = new ContainerController();

    /**
     * 컨테이너별 실시간 로그 스트림 핸들러
     *
     * @route CONNECTION /ws/log/stream?containerId=xxxxxxx
     * @param ws
     * @param req containerId를 쿼리 스트링으로 받음
     */
    public handleLogStream = (ws: WebSocket, req: IncomingMessage): void => {
        const { query } = parse(req.url || '', true);
        const containerId = query.containerId;

        if (typeof containerId === 'string') {
            this.containerController.validContainerId(containerId);
            bridgeWebSocket({
                req,
                clientWs: ws,
                route: 'log/stream',
            });
        } else {
            ws.close(); // 잘못된 요청
        }
    };
}
