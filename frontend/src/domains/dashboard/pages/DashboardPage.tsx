import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { RadialChart } from '../../../common/components/charts/RadialChart';
import { TableComponent } from '../../../common/components/TableComponent';
import type { Column } from '../../../common/components/TableComponent';

const DashboardPage = () => {
    const columns: Column[] = [
        { id: 'name', label: '컨테이너 이름' },
        { id: 'image', label: '이미지', align: 'center' },
        { id: 'status', label: '상태', align: 'center' },
        { id: 'cpu', label: 'CPU (%)', align: 'right' },
        { id: 'memory', label: 'Memory (%)', align: 'right' },
    ];

    const rows = [
        {
            id: 'tmp',
            name: 'ray-server',
            image: 'nginx',
            status: 'Running',
            cpu: '34.7',
            memory: '58.2',
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                px: 0,
                pt: 0,
                pb: 4,
                width: '100%',
                overflowX: 'hidden',
            }}
        >
            {/* 상단 카드 영역 - CSS Grid 방식 */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 2,
                    width: '100%',
                }}
            >
                <Paper
                    sx={{
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        maxWidth: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <RadialChart label="CPU 사용률" value={34.7} />
                </Paper>

                <Paper
                    sx={{
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        maxWidth: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <RadialChart label="Memory 사용률" value={58.2} />
                </Paper>

                <Paper
                    sx={{
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        maxWidth: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <RadialChart label="Disk 사용률" value={35} />
                </Paper>

                <Paper
                    sx={{
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        maxWidth: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <RadialChart label="컨테이너 수" value={1} />
                </Paper>

                <Paper
                    sx={{
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        maxWidth: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <RadialChart label="네트워크 사용량" value={32} />
                </Paper>

                <Paper
                    sx={{
                        aspectRatio: '1 / 1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        maxWidth: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    <RadialChart label="Uptime" value={30} unit="h" />
                </Paper>
            </Box>

            {/* 하단 테이블 자리 */}
            <Paper
                sx={{
                    flex: 1,
                    minHeight: '400px',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <TableComponent columns={columns} rows={rows} />;
                {/* prop에 추가 onRowClick={(id) => navigate(`/container/${id}`) */}
            </Paper>
        </Box>
    );
};

export default DashboardPage;
