import { Box, Button, Chip, Paper, Typography, useTheme } from '@mui/material';

interface ContainerInfo {
    name: string;
    tag: string;
    port: string;
    status: 'RUNNING' | 'EXITED';
}

const mockContainers: ContainerInfo[] = [
    {
        name: 'nextuse-api',
        tag: 'nextuse:latest',
        port: '3000:3000',
        status: 'RUNNING',
    },
    {
        name: 'ray-server',
        tag: 'ray:1.4.1',
        port: '7979:7979',
        status: 'EXITED',
    },
];

export default function ContainerPage() {
    const theme = useTheme();

    return (
        <Box sx={{ px: 4, py: 3, display: 'grid', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
                컨테이너 목록
            </Typography>

            {mockContainers.map((container, idx) => (
                <Paper
                    key={idx}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
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
                            {container.tag}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Port: {container.port}
                        </Typography>
                    </Box>

                    {/* 우측: 상태 뱃지 + 제어 버튼 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                            label={container.status}
                            color={container.status === 'RUNNING' ? 'primary' : 'error'}
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
