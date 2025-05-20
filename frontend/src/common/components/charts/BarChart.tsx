import { Box, Typography } from '@mui/material';

interface BarChartProps {
    label: string;
    percent: number; // 0 ~ 100
    value: string; // 예: "320 / 500 GB"
}

export const BarChart = ({ label, percent, value }: BarChartProps) => {
    return (
        <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize="0.875rem" fontWeight="bold">
                    {label}
                </Typography>
                <Typography fontSize="0.75rem" color="#cbd5e1">
                    {value}
                </Typography>
            </Box>

            <Box
                sx={{
                    height: 12,
                    width: '100%',
                    backgroundColor: '#334155',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: `${Math.min(percent, 100)}%`,
                        height: '100%',
                        backgroundColor: percent >= 80 ? '#ef4444' : '#3b82f6', // 빨강/파랑
                        transition: 'width 0.3s ease',
                    }}
                />
            </Box>
        </Box>
    );
};
