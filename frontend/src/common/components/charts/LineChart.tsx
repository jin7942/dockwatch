// src/common/components/charts/LineChart.tsx
import { Box, Typography } from '@mui/material';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
    label: string;
    unit?: string;
    data: number[]; // 60개 미만 가능, 최신순
}

export const LineChart = ({ label, unit = '%', data }: LineChartProps) => {
    // 최신 값 기준으로 우→좌 1~60 슬라이딩 윈도우 변환
    const chartData = [...data].slice(-60).map((value, index, arr) => ({
        x: 60 - (arr.length - 1 - index),
        value:
            unit == '%'
                ? Math.min(100, Math.round(value * 100) / 100)
                : Math.round((value / 1024) * 100) / 100,
    }));
    const latest = chartData.length > 0 ? chartData[chartData.length - 1].value : 0;
    const yDomain = unit == '%' ? 100 : 200;

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* 상단: 라벨 + 단위 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mb: 2 }}>
                <Typography fontWeight="bold">{label}</Typography>
                <Typography color="bold">{`${latest.toFixed(1)}${unit}`}</Typography>
            </Box>

            {/* 메인 차트 */}
            <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <XAxis
                            dataKey="x"
                            type="number"
                            domain={[1, 60]}
                            reversed={false}
                            ticks={[1, 60]}
                            tickFormatter={(v) => (v === 1 || v === 60 ? `${v}` : '')}
                            axisLine
                            tickLine
                            tickMargin={8}
                        />
                        <YAxis
                            type="number"
                            domain={[0, yDomain]}
                            tickFormatter={(v) => `${v}${unit === '%' ? '%' : ''}`}
                            axisLine
                            tickLine
                            tickMargin={8}
                        />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                color: '#f8fafc',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.75rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                padding: '0.5rem 0.75rem',
                            }}
                            formatter={(v: number) => [`${v}${unit}`, label]}
                        />
                        <Area
                            dataKey="value"
                            type="linear"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="#3b82f6"
                            fillOpacity={0.15}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};
