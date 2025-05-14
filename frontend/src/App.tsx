// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Layout } from './layouts/Layout';

import theme from './theme';
import { router } from './router';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                <RouterProvider router={router} />
            </Layout>
        </ThemeProvider>
    );
}

export default App;
