import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../domains/dashboard/pages/DashboardPage';
import { Layout } from '../layouts/Layout';
import ServerUsagePage from '../domains/server/pages/ServerUsagePage';
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
        ],
    },
]);
