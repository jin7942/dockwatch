import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { api } from '../../../common/lib/axios';

interface ContainerInfo {
    id: string;
    name: string;
}

const BASE_WS_URL = 'ws://localhost:3738/ws';

export default function LogLivePage() {
    const [containerList, setContainerList] = useState<ContainerInfo[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const logRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const getConnection = (containerId: string) => {
        // 이전 연결 종료
        wsRef.current?.close();

        const url = new URL(`${BASE_WS_URL}/log/stream`);
        url.searchParams.set('containerId', containerId);

        const ws = new WebSocket(url.toString());
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const value = JSON.parse(event.data).data.value;
                setLogs((prev) => [...prev, value]);
            } catch (e) {
                console.log(e);
            }
        };

        ws.onerror = () => console.error('WebSocket 오류');
        ws.onclose = () => console.info('WebSocket 종료');
    };

    useEffect(() => {
        const getRunningContainer = async () => {
            const res = await api.get('/log/active');
            const data: ContainerInfo[] = res.data.data;
            setContainerList(data);
        };
        getRunningContainer();
    }, []);

    useEffect(() => {
        const el = logRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [logs]);

    useEffect(() => {
        return () => {
            wsRef.current?.close();
        };
    }, []);

    return (
        <Box sx={{ px: 4, display: 'grid', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
                실시간 로그 보기
            </Typography>

            {containerList.length > 0 ? (
                containerList.map((container) => (
                    <Button
                        variant="contained"
                        sx={{ width: 'fit-content' }}
                        key={container.id}
                        onClick={() => getConnection(container.id)}
                    >
                        {container.name}
                    </Button>
                ))
            ) : (
                <Typography variant="h6" fontWeight="bold">
                    실행중인 컨테이너가 없습니다.
                </Typography>
            )}

            <Paper
                ref={logRef}
                sx={{
                    height: 500,
                    overflowY: 'auto',
                    p: 2,
                    backgroundColor: '#000',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    display: 'grid',
                    gridAutoRows: 'max-content',
                }}
            >
                {logs.map((line, i) => (
                    <Typography
                        key={i}
                        variant="body2"
                        component="pre"
                        sx={{ m: 0, whiteSpace: 'pre-wrap' }}
                    >
                        {line}
                    </Typography>
                ))}
            </Paper>
        </Box>
    );
}
