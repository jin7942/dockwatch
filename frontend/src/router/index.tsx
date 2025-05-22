import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../domains/dashboard/pages/DashboardPage';
import { Layout } from '../layouts/Layout';

// SERVER
import ServerUsagePage from '../domains/server/pages/ServerUsagePage';
import NetworkUsagePage from '../domains/server/pages/NetworkUsagePage';
import DiskUsagePage from '../domains/server/pages/DiskUsagePage';

// LOG
import LogLivePage from '../domains/log/pages/LogLivePage';
import LogViewPage from '../domains/log/pages/LogViewPage';

// CONTAINER
import ContainerPage from '../domains/container/pages/ContainerPage';

// 도메인별 라우트 그룹
const dashboardRoutes = [
    {
        path: '',
        element: <DashboardPage />,
    },
];

const serverRoutes = [
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
];

const logRoutes = [
    {
        path: 'log/live',
        element: <LogLivePage />,
    },
    {
        path: 'log/view',
        element: <LogViewPage />,
    },
];

const containerRoutes = [
    {
        path: 'container/info',
        element: <ContainerPage />,
    },
];

// 최종 라우터 구성
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [...dashboardRoutes, ...serverRoutes, ...logRoutes, ...containerRoutes],
    },
]);
