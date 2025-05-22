// src/layouts/Sidebar.tsx
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    Storage,
    Layers,
    SettingsEthernet,
    Description,
} from '@mui/icons-material';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

export const Sidebar = () => {
    const [openServer, setOpenServer] = useState(true);
    const [openLog, setOpenLog] = useState(true);
    const [openContainer, setOpenContainer] = useState(true);

    const linkStyle = { p: 3, textDecoration: 'none', color: 'inherit' };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'rgba(18, 24, 40, 0.9)',
                    color: 'white',
                    backdropFilter: 'blur(6px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                },
            }}
        >
            <Box sx={linkStyle} component={RouterLink} to="/">
                <Typography variant="h6" fontWeight="bold">
                    DockWatch
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    jin-network
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            <List dense>
                <Typography px={2} mt={1} mb={0.5} variant="caption" color="text.secondary">
                    Platform
                </Typography>

                {/* 서버 */}
                <ListItemButton onClick={() => setOpenServer(!openServer)}>
                    <ListItemIcon>
                        <Storage sx={{ color: 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="서버" />
                    {openServer ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openServer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={RouterLink} to="/server/usage" sx={{ pl: 6 }}>
                            <ListItemText primary="사용량" />
                        </ListItemButton>
                        <ListItemButton
                            component={RouterLink}
                            to="/server/network-usage"
                            sx={{ pl: 6 }}
                        >
                            <ListItemText primary="네트워크" />
                        </ListItemButton>
                        <ListItemButton
                            component={RouterLink}
                            to="/server/disk-usage"
                            sx={{ pl: 6 }}
                        >
                            <ListItemText primary="파일" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* 로그 */}
                <ListItemButton onClick={() => setOpenLog(!openLog)}>
                    <ListItemIcon>
                        <Description sx={{ color: 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="로그" />
                    {openLog ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openLog} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={RouterLink} to="/log/live" sx={{ pl: 6 }}>
                            <ListItemText primary="실시간 로그" />
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to="/log/view" sx={{ pl: 6 }}>
                            <ListItemText primary="로그 보기" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* 컨테이너 */}
                <ListItemButton onClick={() => setOpenContainer(!openContainer)}>
                    <ListItemIcon>
                        <Layers sx={{ color: 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="컨테이너" />
                    {openContainer ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openContainer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={RouterLink} to="/container/info" sx={{ pl: 6 }}>
                            <ListItemText primary="배포상태" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* 프록시 */}
                {/* <ListItemButton>
                    <ListItemIcon>
                        <SettingsEthernet sx={{ color: 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="프록시" />
                </ListItemButton> */}
            </List>
        </Drawer>
    );
};
