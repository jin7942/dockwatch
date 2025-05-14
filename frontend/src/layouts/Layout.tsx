import Sidebar from '../common/components/Sidebar';
import Header from '../common/components/Header';
import { Box } from '@mui/material';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* 최상단 헤더 */}
            <Header />

            {/* 아래 영역: Sidebar + Content */}
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar />

                <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
