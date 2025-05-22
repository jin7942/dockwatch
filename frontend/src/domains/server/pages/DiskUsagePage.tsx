import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { BarChart } from '../../../common/components/charts/BarChart';
import { api } from '../../../common/lib/axios';
import { TableComponent } from '../../../common/components/TableComponent';
import type { Column } from '../../../common/components/TableComponent';

interface MountDisk {
    mountPath: string;
    total: number;
    used: number;
    use: number; // percent
}

interface ContainerDisk {
    name: string;
    used: number;
    isActive: boolean;
}

export const DiskUsagePage = () => {
    const [mounts, setMounts] = useState<MountDisk[]>([]);
    const [containers, setContainers] = useState<ContainerDisk[]>([]);

    useEffect(() => {
        const fetchMount = async () => {
            const res = await api.get('/server/mount-disk');
            setMounts(res.data.data);
        };

        const fetchContainer = async () => {
            const res = await api.get('/server/container-disk');
            setContainers(res.data.data);
        };

        fetchMount();
        fetchContainer();
    }, []);

    const totalDisk = mounts.reduce(
        (acc, cur) => ({
            total: acc.total + cur.total,
            used: acc.used + cur.used,
        }),
        { total: 0, used: 0 },
    );

    const totalPercent =
        totalDisk.total > 0 ? Math.round((totalDisk.used / totalDisk.total) * 100) : 0;

    const toGB = (byte: number) => Math.round((byte / 1_000_000_000) * 10) / 10;
    const toMB = (byte: number) => Math.round((byte / 1_000_000) * 10) / 10;

    const containerColumns: Column<ContainerDisk & { usedMB: string; statusLabel: string }>[] = [
        { id: 'name', label: '이름' },
        { id: 'usedMB', label: '사용량(MB)', align: 'right' },
        { id: 'statusLabel', label: '상태', align: 'center' },
    ];

    const containerTableRows = containers.map((c) => ({
        ...c,
        usedMB: `${toMB(c.used)} MB`,
        statusLabel: c.isActive ? 'Active' : 'Stopped',
    }));

    console.log(mounts);
    return (
        <Box sx={{ px: 4, py: 3, display: 'grid', gap: 4 }}>
            <Typography variant="h5" fontWeight="bold">
                디스크 사용량
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" mb={1}>
                    전체 디스크 사용량
                </Typography>
                <BarChart
                    label="Total"
                    percent={totalPercent}
                    value={`${toGB(totalDisk.used)} / ${toGB(totalDisk.total)} GB`}
                />
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" mb={2}>
                    마운트별 디스크 사용량
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                    {mounts.map((mount) => (
                        <BarChart
                            key={mount.mountPath}
                            label={mount.mountPath}
                            percent={mount.use}
                            value={`${toGB(mount.used)} / ${toGB(mount.total)} GB`}
                        />
                    ))}
                </Box>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" mb={2}>
                    컨테이너별 디스크 사용량
                </Typography>
                <TableComponent columns={containerColumns} rows={containerTableRows} />
            </Paper>
        </Box>
    );
};

export default DiskUsagePage;
