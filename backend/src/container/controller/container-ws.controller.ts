import { ContainerController } from './container-http.controller';
import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { bridgeWebSocket } from '../../common/utils/ws-util';
import { parse } from 'url';

export class ContainerWsController {
    private containerController = new ContainerController();

    /**
     * 컨테이너별 리소스 사용량 스트림 핸들러
     *
     * @route CONNECTION /ws/container/resource?containerId=xxxxx
     * @param ws
     * @param req containerId를 쿼리 스트링으로 받음
     */
    public handleContainerUsageStream = (ws: WebSocket, req: IncomingMessage): void => {
        const { query } = parse(req.url || '', true);
        const containerId = query.containerId;

        if (typeof containerId === 'string') {
            this.containerController.validContainerId(containerId);
            bridgeWebSocket({
                req,
                clientWs: ws,
                route: 'container/resource',
            });
        } else {
            ws.close(); // 잘못된 요청
        }
    };
}
