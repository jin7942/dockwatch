import { Box, Chip, Paper, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';

import { api } from '../../../common/lib/axios';
import { useNavigate } from 'react-router-dom';

interface ContainerInfo {
    id: string;
    name: string;
    image: string;
    status: string;
    ports: string;
    network: string;
}

export default function ContainerPage() {
    const [containerList, setContainerList] = useState<ContainerInfo[]>([
        {
            id: '',
            name: '',
            image: '',
            status: '',
            ports: '',
            network: '',
        },
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const getInfo = async () => {
            const res = await api.get('/container/list');
            setContainerList(res.data.data);
        };

        getInfo();
    }, []);

    return (
        <Box sx={{ px: 4, py: 3, display: 'grid', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
                컨테이너 목록
            </Typography>

            {containerList.map((container) => (
                <Paper
                    key={container.id}
                    onClick={() => navigate(`/container/${container.id}`)}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    {/* 좌측: 컨테이너 정보 */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {container.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {container.image}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {container.ports}
                        </Typography>
                    </Box>

                    {/* 우측: 상태 뱃지 + 제어 버튼 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {container.network}
                        </Typography>
                        <Chip
                            label={container.status}
                            size="small"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        />
                        <Button size="small" variant="outlined">
                            시작
                        </Button>
                        <Button size="small" variant="outlined">
                            중지
                        </Button>
                        <Button size="small" variant="outlined">
                            재시작
                        </Button>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}
