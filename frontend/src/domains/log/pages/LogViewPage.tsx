import { Box, Button, Paper, TextField, Typography, useTheme, Divider } from '@mui/material';
import { useEffect, useState } from 'react';

const containerList = ['nextuse-api', 'ray-server', 'upload-server'];
const logLevels = ['ALL', 'INFO', 'WARN', 'ERROR'];

export default function LogViewPage() {
    const theme = useTheme();

    const [rootNodes, setRootNodes] = useState([]);

    useEffect(() => {
        // 최초 1단계 디렉터리 로드
    }, []);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 2,
                px: 4,
                py: 3,
                width: '100%',
                bgcolor: theme.palette.background.default,
            }}
        >
            {/* 좌측 트리 뷰 영역 */}
            <Paper
                sx={{
                    height: 500,
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    (트리 뷰 자리)
                </Typography>
            </Paper>

            {/* 우측 로그 출력 영역 */}
            <Paper
                sx={{
                    p: 3,
                    display: 'grid',
                    gap: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                {/* 컨테이너 선택 */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight="bold" color="text.primary">
                        컨테이너 선택
                    </Typography>
                    {containerList.map((name) => (
                        <Button key={name} variant="outlined" size="small">
                            {name}
                        </Button>
                    ))}
                </Box>

                <Divider sx={{ borderColor: theme.palette.divider }} />

                {/* 로그 출력 헤더 */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                        로그 출력
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="로그 내용 검색"
                        sx={{ width: 200 }}
                        variant="outlined"
                    />
                </Box>

                <Typography variant="body2" color="text.secondary">
                    로그가 여기에 표시됩니다 (샘플)
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {logLevels.map((level) => (
                        <Button key={level} variant="outlined" size="small">
                            {level}
                        </Button>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
}
