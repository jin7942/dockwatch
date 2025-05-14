// src/layouts/Layout.tsx
import { Sidebar } from '../common/components/Sidebar';
import { Header } from '../common/components/Header';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar /> {/* 고정 */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box component="main" sx={{ p: 3, overflowY: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
