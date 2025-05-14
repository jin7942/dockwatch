// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4f6bed', // 파랑 + 퍼플 중간 느낌
        },
        secondary: {
            main: '#9c27b0', // 진한 보라
        },
        background: {
            default: '#131c31', // 전체 배경 – 딥블루 계열, 너무 어둡지 않게
            paper: 'rgba(30, 38, 60, 0.9)', // 카드 배경 – 반투명한 블루+보라톤
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b8d1',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                },
            },
        },
    },
});

export default theme;
