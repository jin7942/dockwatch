import { IncomingMessage } from 'http';
import WebSocket from 'ws';
import { parse } from 'url';
import { CONFIG } from '../_config/constants';

/**
 * agent -> backend -> client 를 중계하는 WebSocket 브릿지 유틸
 *
 * - 백엔드는 agent로부터 메시지를 받아 가공 없이 client로 그대로 전달
 * - 연결 종료 시 양측 소켓 모두 정리
 * - 쿼리는 controller에서 이미 검증되어 있다는 가정 하에 그대로 전달
 */

interface BridgeOptions {
    req: IncomingMessage;
    clientWs: WebSocket;
    route: string;
    onMessage?: (data: WebSocket.RawData) => void;
    onAgentOpen?: () => void;
    onClientClose?: () => void;
}

export const bridgeWebSocket = ({
    req,
    clientWs,
    route,
    onMessage,
    onAgentOpen,
    onClientClose,
}: BridgeOptions): void => {
    const query = parse(req.url || '', true).query;

    const queryString = Object.entries(query)
        .map(([key, val]) => `${key}=${encodeURIComponent(String(val))}`)
        .join('&');

    const agentWs = new WebSocket(`${CONFIG.AGENT_BASE_WS_URL}/ws/${route}?${queryString}`);

    agentWs.on('open', () => {
        onAgentOpen?.();
    });

    agentWs.on('message', (data) => {
        const msg = typeof data === 'string' ? data : data.toString();
        try {
            const parsed = JSON.parse(msg); // JSON 객체로 파싱 확인
            clientWs.send(JSON.stringify(parsed)); // 다시 문자열로 보내기
        } catch (e) {
            console.error('Invalid JSON from agent:', e);
            // fallback: raw 전송
            clientWs.send(msg);
        }
    });

    agentWs.on('close', () => {
        clientWs.close();
    });

    agentWs.on('error', () => {
        clientWs.close(1011, 'Agent error');
    });

    clientWs.on('close', () => {
        agentWs.close();
        onClientClose?.();
    });
};
