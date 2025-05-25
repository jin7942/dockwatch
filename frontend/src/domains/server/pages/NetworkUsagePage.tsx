import { Box, Typography, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { NetworkChart } from '../../../common/components/charts/NetworkChart';
import { api } from '../../../common/lib/axios';
import { useWs } from '../../../common/hooks/useWs';

interface NetInfo {
    interface: string;
    ip4: string;
    ip4Subnet: string;
    mac: string;
    speed: number;
}

interface NetUsage {
    interface: string;
    rx: number;
    tx: number;
}

const NetworkUsagePage = () => {
    const [netInfo, setNetInfo] = useState<NetInfo[]>([]);
    const [streamData, setStreamData] = useState<Record<string, { rx: number; tx: number }[]>>({});

    const ws = useWs('/server/network');

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event: MessageEvent) => {
            const parsed = JSON.parse(event.data);
            const resData: NetUsage[] = parsed.data;

            setStreamData((prev) => {
                const updated = { ...prev };
                resData.forEach(({ interface: name, rx, tx }) => {
                    const history = updated[name] ?? [];
                    updated[name] = [...history.slice(-59), { rx, tx }];
                });
                return updated;
            });
        };

        ws.addEventListener('message', handleMessage);
        return () => ws.removeEventListener('message', handleMessage);
    }, [ws]);

    useEffect(() => {
        const getInfo = async () => {
            const res = await api.get('/server/network-interfaces');
            const data: NetInfo[] = res.data.data;
            setNetInfo(data);
        };
        getInfo();
    }, []);

    return (
        <Box sx={{ px: 4, py: 3, display: 'grid', gap: 4 }}>
            <Typography variant="h5" fontWeight="bold">
                네트워크 사용량
            </Typography>

            {netInfo
                .filter((intf) => {
                    const usage = streamData[intf.interface];
                    if (!usage) return false;
                    return usage.some((v) => v.rx > 0 || v.tx > 0);
                })
                .map((intf) => (
                    <Box
                        key={intf.interface}
                        sx={{
                            border: '1px solid #334155',
                            borderRadius: 2,
                            p: 2,
                            backgroundColor: '#1e293b',
                            display: 'grid',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                {intf.interface}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                {intf.ip4} / {intf.mac} / {Math.round(intf.speed / 1_000)} Kbps
                            </Typography>
                        </Box>

                        <Divider sx={{ borderColor: '#475569' }} />

                        <NetworkChart
                            label={intf.interface}
                            speed={intf.speed}
                            data={streamData[intf.interface] ?? []}
                            unit="Kbps"
                        />
                    </Box>
                ))}
        </Box>
    );
};

export default NetworkUsagePage;
