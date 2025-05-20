import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../domains/dashboard/pages/DashboardPage';
import { Layout } from '../layouts/Layout';

// SERVER
import ServerUsagePage from '../domains/server/pages/ServerUsagePage';
import NetworkUsagePage from '../domains/server/pages/NetworkUsagePage';
import DiskUsagePage from '../domains/server/pages/DiskUsagePage';
// import ContainerPage from '../domains/container/pages/ContainerPage';
// import LogPage from '../domains/log/pages/LogPage';
// import ServerPage from '../domains/server/pages/ServerPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <DashboardPage />,
            },
            {
                path: 'server/usage',
                element: <ServerUsagePage />,
            },
            {
                path: 'server/network-usage',
                element: <NetworkUsagePage />,
            },
            {
                path: 'server/disk-usage',
                element: <DiskUsagePage />,
            },
        ],
    },
]);
