import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { api } from '../../../common/lib/axios';
import { useWs } from '../../../common/hooks/useWs';

interface ContainerInfo {
    id: string;
    name: string;
}

export default function LogLivePage() {
    const [containerList, setContainerList] = useState<ContainerInfo[]>([
        {
            id: '',
            name: '',
        },
    ]);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const getRunningContainer = async () => {
            const res = await api.get('/log/active');
            const data: ContainerInfo[] = res.data.data;
            setContainerList(data);
            console.log(containerList);
        };
        getRunningContainer();
    }, []);

    return (
        <Box sx={{ px: 4, py: 3, display: 'grid', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
                실시간 로그 보기
            </Typography>

            {containerList.map((container) => (
                <Button variant="contained" sx={{ width: 'fit-content' }} key={container.id}>
                    {container.name}
                </Button>
            ))}

            <Paper
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
