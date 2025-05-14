import { Drawer, List, ListItemButton, ListItemText, Box } from '@mui/material';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Box sx={{ mt: 10 }}></Box>
            <List>
                {['Dashboard', 'Servers', 'Containers', 'Logs'].map((text) => (
                    <ListItemButton key={text}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
