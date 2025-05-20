// src/common/components/charts/NetworkChart.tsx
import { Box, Typography } from '@mui/material';
import { LineChart, Line, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface NetworkChartProps {
    label: string; // ex: eth0
    unit?: string; // default: Mbps
    speed: number; // ex: 1000000000 (bps)
    data: { rx: number; tx: number }[]; // 최신순
}

export const NetworkChart = ({ label, unit = 'Mbps', speed, data }: NetworkChartProps) => {
    const maxMbps = Math.round(speed / 1_000_000); // ex: 1Gbps -> 1000

    const chartData = [...data].slice(-60).map((v, i, arr) => ({
        x: 60 - (arr.length - 1 - i),
        rx: Math.round((v.rx / 1000) * 100) / 100, // bps → Kbps
        tx: Math.round((v.tx / 1000) * 100) / 100,
    }));

    const latest = chartData[chartData.length - 1] ?? { rx: 0, tx: 0 };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mb: 2 }}>
                <Typography fontWeight="bold">{label}</Typography>
                <Typography>
                    RX: {latest.rx.toFixed(1)}
                    {unit} / TX: {latest.tx.toFixed(1)}
                    {unit}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="x"
                            type="number"
                            domain={[1, 60]}
                            tickFormatter={(v) => (v === 1 || v === 60 ? `${v}` : '')}
                            axisLine
                            tickLine
                            tickMargin={8}
                        />
                        <YAxis
                            type="number"
                            domain={[0, maxMbps]}
                            tickFormatter={(v) => `${v} ${unit}`}
                            axisLine
                            tickLine
                            tickMargin={8}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                color: '#f8fafc',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.75rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                padding: '0.5rem 0.75rem',
                            }}
                            formatter={(value: number, name: string) => [
                                `${value} ${unit}`,
                                name.toUpperCase(),
                            ]}
                        />
                        <Line
                            type="monotone"
                            dataKey="rx"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="tx"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};
