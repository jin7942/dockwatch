import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { api } from '../../../common/lib/axios';
import { CONFIG } from '../../../common/_config/constants';

interface ContainerInfo {
    id: string;
    name: string;
}

export default function LogLivePage() {
    const [containerList, setContainerList] = useState<ContainerInfo[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const logRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const getConnection = (containerId: string) => {
        // 기존 로그 제거
        setLogs([]);
        // 이전 연결 종료
        wsRef.current?.close();

        const url = new URL(`${CONFIG.WS_BASE_URL}/log/stream`);
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
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {containerList.map((container) => (
                        <Button
                            variant="contained"
                            key={container.id}
                            onClick={() => getConnection(container.id)}
                        >
                            {container.name}
                        </Button>
                    ))}
                </Box>
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
                        sx={{ m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                    >
                        {line}
                    </Typography>
                ))}
            </Paper>
        </Box>
    );
}
