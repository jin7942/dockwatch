import { CONFIG } from '../_config/constants';

const sockets = new Map<string, WebSocket>();

export function createWs(path: string): WebSocket {
    const fullUrl = `${CONFIG.WS_BASE_URL}${path}`;

    if (sockets.has(fullUrl)) {
        const existing = sockets.get(fullUrl)!;
        if (existing.readyState !== WebSocket.CLOSED && existing.readyState !== WebSocket.CLOSING) {
            return existing;
        }
    }

    const socket = new WebSocket(fullUrl);
    sockets.set(fullUrl, socket);

    return socket;
}

export function getWs(path: string): WebSocket | null {
    return sockets.get(`${CONFIG.WS_BASE_URL}${path}`) ?? null;
}

export function closeWs(path: string): void {
    const fullUrl = `${CONFIG.WS_BASE_URL}${path}`;
    const socket = sockets.get(fullUrl);
    if (socket) {
        socket.close();
        sockets.delete(fullUrl);
    }
}
