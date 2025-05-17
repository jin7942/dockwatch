// src/common/components/charts/RadialChart.tsx
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Box, Typography } from '@mui/material';

interface RadialChartProps {
    label: string;
    value: number; // 0 ~ 100 기준
    unit?: string; // % or h 등
}
export const RadialChart = ({ label, value, unit = '%' }: RadialChartProps) => {
    value = Math.round(value * 100) / 100;
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* 좌측 상단 라벨 */}
            <Box sx={{ position: 'absolute', top: 8, left: 12 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                    {label}
                </Typography>
            </Box>

            {/* 차트 */}
            <Box sx={{ width: '80%', height: '80%' }}>
                <Gauge
                    value={unit == '%' ? value : 100}
                    valueMax={100}
                    startAngle={0}
                    endAngle={360}
                    text={`${value}${unit}`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: '#4f6bed',
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                />
            </Box>

            <Typography
                variant="body2"
                sx={{
                    position: 'absolute',
                    top: '60%',
                    transform: 'translateY(-50%)',
                    fontWeight: 'bold',
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};
