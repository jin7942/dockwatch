// src/common/components/AppHeader.tsx
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box
            component="header"
            sx={{
                px: 3,
                py: 2,
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ p: 3 }}
            >
                <Link component={RouterLink} underline="hover" color="inherit" to="/">
                    Home
                </Link>

                {pathnames.length === 0 ? (
                    <Typography color="text.primary">Dashboard</Typography>
                ) : (
                    pathnames.map((value, index) => {
                        const to = '/' + pathnames.slice(0, index + 1).join('/');
                        const isLast = index === pathnames.length - 1;

                        return isLast ? (
                            <Typography color="text.primary" key={to}>
                                {decodeURIComponent(value)}
                            </Typography>
                        ) : (
                            <Link
                                key={to}
                                component={RouterLink}
                                underline="hover"
                                color="inherit"
                                to={to}
                            >
                                {decodeURIComponent(value)}
                            </Link>
                        );
                    })
                )}
            </Breadcrumbs>
        </Box>
    );
};
