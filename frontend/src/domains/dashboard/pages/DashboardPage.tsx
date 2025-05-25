import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { RadialChart } from '../../../common/components/charts/RadialChart';
import { TableComponent } from '../../../common/components/TableComponent';
import type { Column } from '../../../common/components/TableComponent';

import { useState, useEffect, useMemo } from 'react';

import { api } from '../../../common/lib/axios';
import { useWs } from '../../../common/hooks/useWs';

interface DashboardData {
    diskUsage: number;
    uptimeHours: number;
    cpuPercent: number;
    memoryPercent: number;
    networkUsage: number;
    runningContainer: ContainerInfo[];
}
interface ContainerInfo {
    id: number;
    name: string;
    image: string;
    status: string;
    ports: string;
    network: string;
    usage: {
        cpu: {
            percent: number;
        };
        memory: {
            percent: number;
        };
    };
}

interface ContainerRow {
    id: string;
    name: string;
    image: string;
    status: string;
    port: string;
    network: string;
    cpu: string;
    memory: string;
}

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        diskUsage: 0,
        uptimeHours: 0,
        cpuPercent: 0,
        memoryPercent: 0,
        networkUsage: 0,
        runningContainer: [],
    });

    const ws = useWs('/dashboard/info');

    // HTTP
    useEffect(() => {
        const getInfo = async () => {
            const res = await api.get('/dashboard/info');
            setDashboardData((prev) => ({
                ...prev,
                diskUsage: res.data.data.diskUsage,
                uptimeHours: res.data.data.uptimeHours,
            }));
        };
        getInfo();
    }, []);

    // Websocket
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === 'dashboard-usage') {
                const { cpuPercent, memoryPercent, networkUsage, runningContainer } = data.data;

                setDashboardData((prev) => ({
                    ...prev,
                    cpuPercent,
                    memoryPercent,
                    networkUsage,
                    runningContainer,
                }));
            }
        };

        ws.addEventListener('message', handleMessage);
        return () => ws.removeEventListener('message', handleMessage);
    }, [ws]);

    // 테이블 구성
    const columns: Column<ContainerRow>[] = [
        { id: 'name', label: '컨테이너 이름' },
        { id: 'image', label: '이미지', align: 'center' },
        { id: 'status', label: '상태', align: 'center' },
        { id: 'port', label: '포트', align: 'center' },
        { id: 'network', label: '네트워크', align: 'center' },
        { id: 'cpu', label: 'CPU (%)', align: 'right' },
        { id: 'memory', label: 'Memory (%)', align: 'right' },
    ];

    const rows: ContainerRow[] = useMemo(() => {
        return dashboardData.runningContainer.map((container) => ({
            id: container.id.toString(),
            name: container.name,
            image: container.image,
            status: container.status,
            port: container.ports,
            network: container.network,
            cpu: container.usage.cpu.percent?.toFixed(1) ?? '-',
            memory: container.usage.memory.percent?.toFixed(1) ?? '-',
        }));
    }, [dashboardData.runningContainer]);
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
            {/* 상단 카드 영역 */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 2,
                    width: '100%',
                }}
            >
                <Paper sx={cardStyle}>
                    <RadialChart label="CPU 사용률" value={dashboardData.cpuPercent} />
                </Paper>
                <Paper sx={cardStyle}>
                    <RadialChart label="Memory 사용률" value={dashboardData.memoryPercent} />
                </Paper>
                <Paper sx={cardStyle}>
                    <RadialChart label="Disk 사용률" value={dashboardData.diskUsage} />
                </Paper>
                <Paper sx={cardStyle}>
                    <RadialChart
                        label="컨테이너 수"
                        value={dashboardData.runningContainer.length}
                        unit="개"
                    />
                </Paper>
                <Paper sx={cardStyle}>
                    <RadialChart
                        label="네트워크 사용량"
                        value={dashboardData.networkUsage}
                        unit="bps"
                    />
                </Paper>
                <Paper sx={cardStyle}>
                    <RadialChart
                        label="서버 가동 시간"
                        value={dashboardData.uptimeHours}
                        unit="시간"
                    />
                </Paper>
            </Box>

            {/* 테이블 */}
            <Paper
                sx={{
                    flex: 1,
                    minHeight: '400px',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                // TODO: 라우팅 추가
                <TableComponent columns={columns} rows={rows} />
            </Paper>
        </Box>
    );
};

const cardStyle = {
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    maxWidth: '100%',
    bgcolor: 'background.paper',
};

export default DashboardPage;
