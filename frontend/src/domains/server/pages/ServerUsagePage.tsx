import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LineChart } from '../../../common/components/charts/LineChart';

import { TableComponent } from '../../../common/components/TableComponent';
import type { Column } from '../../../common/components/TableComponent';

import { useWs } from '../../../common/hooks/useWs';
import { api } from '../../../common/lib/axios';

interface ContainerRow {
    idx: number;
    pid: number;
    user: string;
    s: string;
    mem: number;
    command: string;
}
interface WsData {
    cpu: {
        usagePercent: number[];
        topTable: ContainerRow[];
    };
    memory: {
        usagePercent: number[];
        topTable: ContainerRow[];
    };
    disk: {
        activity: number[];
    };
}

interface HttpData {
    cpu: {
        model: string;
        speedGHz: number;
        cores: number;
        thread: number;
    };
    memory: {
        total: number;
        used: number;
    };
    disk: {
        total: number;
        used: number;
    };
}

const ServerUsagePage = () => {
    const [wsData, setWsData] = useState<WsData>({
        cpu: {
            usagePercent: [0],
            topTable: [],
        },
        memory: {
            usagePercent: [0],
            topTable: [],
        },
        disk: {
            activity: [0],
        },
    });
    const [httpData, setHttpData] = useState<HttpData>({
        cpu: {
            model: '',
            speedGHz: 0,
            cores: 0,
            thread: 0,
        },
        memory: {
            total: 0,
            used: 0,
        },
        disk: {
            total: 0,
            used: 0,
        },
    });
    const ws = useWs('/server/usage');

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event: MessageEvent) => {
            const parsed = JSON.parse(event.data);
            const { cpu, memory, disk } = parsed.data as {
                cpu: { usagePercent: number; topTable: ContainerRow[] };
                memory: { usagePercent: number; topTable: ContainerRow[] };
                disk: { activity: number };
            };

            setWsData((prev) => ({
                cpu: {
                    usagePercent: [...prev.cpu.usagePercent, cpu.usagePercent].slice(-60),
                    topTable: cpu.topTable,
                },
                memory: {
                    usagePercent: [...prev.memory.usagePercent, memory.usagePercent].slice(-60),
                    topTable: memory.topTable,
                },
                disk: {
                    activity: [...prev.disk.activity, disk.activity].slice(-60),
                },
            }));
        };

        ws.addEventListener('message', handleMessage);

        return () => ws.removeEventListener('message', handleMessage);
    }, [ws]);

    useEffect(() => {
        const getInfo = async () => {
            const res = await api.get('/server/info');
            const { cpu, memory, disk }: HttpData = res.data.data;

            setHttpData({ cpu, memory, disk });
        };
        getInfo();
    }, []);

    // 테이블 구성
    const columns: Column<ContainerRow>[] = [
        { id: 'idx', label: 'idx', align: 'center' },
        { id: 'pid', label: 'pid', align: 'center' },
        { id: 'user', label: 'user', align: 'center' },
        { id: 's', label: 'status', align: 'center' },
        { id: 'mem', label: 'memory', align: 'right' },
        { id: 'command', label: 'command', align: 'right' },
    ];

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '6fr 4fr',
                gridTemplateRows: 'repeat(3, minmax(240px, auto))',
                gap: 2,
                width: '100%',
                px: 0,
                pt: 0,
                pb: 4,
            }}
        >
            {/* CPU */}
            <Paper sx={{ ...panelStyle, gridColumn: '1 / 2', gridRow: '1 / 2' }}>
                <LineChart label={'CPU 사용율'} data={wsData.cpu.usagePercent} />
            </Paper>
            <Paper sx={{ ...panelStyle, gridColumn: '2 / 3', gridRow: '1 / 2' }}>
                <Box sx={{ height: '100%', overflowY: 'auto', width: '100%' }}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                        {httpData.cpu.model} | {httpData.cpu.cores}C / {httpData.cpu.thread}T |{' '}
                        {httpData.cpu.speedGHz}GHz
                    </Typography>
                    <TableComponent columns={columns} rows={wsData.cpu.topTable} />
                </Box>
            </Paper>

            {/* MEM */}
            <Paper sx={{ ...panelStyle, gridColumn: '1 / 2', gridRow: '2 / 3' }}>
                <LineChart label={'메모리 사용율'} data={wsData.memory.usagePercent} />
            </Paper>
            <Paper sx={{ ...panelStyle, gridColumn: '2 / 3', gridRow: '2 / 3' }}>
                <Box sx={{ height: '100%', overflowY: 'auto', width: '100%' }}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                        {Math.round(httpData.memory.used / 1024 / 1024)} MB /{' '}
                        {Math.round(httpData.memory.total / 1024 / 1024)} MB
                    </Typography>
                    <TableComponent columns={columns} rows={wsData.memory.topTable} />
                </Box>
            </Paper>

            {/* DISK */}
            <Paper sx={{ ...panelStyle, gridColumn: '1 / 3', gridRow: '3 / 4' }}>
                <LineChart
                    label={`디스크 I/O  (${(httpData.disk.used / 1024 ** 3).toFixed(1)} GB / ${(
                        httpData.disk.total /
                        1024 ** 3
                    ).toFixed(1)} GB)`}
                    data={wsData.disk.activity}
                    unit="KB/s"
                />
                <Box></Box>
            </Paper>
        </Box>
    );
};

const panelStyle = {
    p: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'background.paper',
    borderRadius: 2,
};

export default ServerUsagePage;
