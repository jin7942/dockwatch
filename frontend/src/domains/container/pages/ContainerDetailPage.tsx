import { Box, Typography, Paper, Divider, Chip, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../../common/lib/axios';

interface ContainerDetail {
    id: string;
    name: string;
    image: string;
    status: string;
    ports: string;
    network: string;
}

export default function ContainerDetailPage() {
    const { id } = useParams();
    const [detail, setDetail] = useState<ContainerDetail | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await api.get(`/container/info?containerId=${id}`);
            setDetail(res.data.data);
        };
        fetchDetail();
    }, [id]);

    if (!detail) return null;

    // const handleAction = async (action: 'start' | 'stop' | 'restart') => {
    //     await api.post(`/container/${action}`, { id: detail.id });
    // };

    return (
        <Box sx={{ px: 4, py: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                컨테이너 상세 정보
            </Typography>

            <Paper sx={{ p: 3, display: 'grid', gap: 1, maxWidth: 800 }}>
                <Typography variant="h6">{detail.name}</Typography>
                <Divider />

                <Stack direction="row" spacing={2}>
                    <Typography variant="body2">ID: {detail.id}</Typography>
                    <Typography variant="body2">Image: {detail.image}</Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography variant="body2">Ports: {detail.ports}</Typography>
                    <Typography variant="body2">Network: {detail.network}</Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Chip label={detail.status} color="primary" size="small" />
                    {/* <Button variant="outlined" onClick={() => handleAction('start')}>
                        시작
                    </Button>
                    <Button variant="outlined" onClick={() => handleAction('stop')}>
                        중지
                    </Button>
                    <Button variant="outlined" onClick={() => handleAction('restart')}>
                        재시작
                    </Button> */}
                </Stack>
            </Paper>
        </Box>
    );
}
