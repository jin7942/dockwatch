import { useEffect, useState } from 'react';
import { createWs, closeWs } from '../lib/ws';

export function useWs(path: string) {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = createWs(path);
        setWs(socket);

        return () => {
            closeWs(path); // 언마운트 시 연결 정리
        };
    }, [path]);

    return ws;
}
