import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../domains/dashboard/pages/DashboardPage';
import { Layout } from '../layouts/Layout';

// SERVER
import ServerUsagePage from '../domains/server/pages/ServerUsagePage';
import NetworkUsagePage from '../domains/server/pages/NetworkUsagePage';
import DiskUsagePage from '../domains/server/pages/DiskUsagePage';

// LOG
import LogLivePage from '../domains/log/pages/LogLivePage';

// CONTAINER
import ContainerPage from '../domains/container/pages/ContainerPage';
// import ContainerDetailPage from '../domains/container/pages/ContainerDetailPage';

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
        path: 'server/network',
        element: <NetworkUsagePage />,
    },
    {
        path: 'server/disk',
        element: <DiskUsagePage />,
    },
];

const logRoutes = [
    {
        path: 'log/live',
        element: <LogLivePage />,
    },
    // {
    //     path: 'log/view',
    //     element: <LogViewPage />,
    // },
];

const containerRoutes = [
    {
        path: 'container',
        element: <ContainerPage />,
    },
    // {
    //     path: 'container/:id',
    //     element: <ContainerDetailPage />,
    // },
];

// 최종 라우터 구성
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [...dashboardRoutes, ...serverRoutes, ...logRoutes, ...containerRoutes],
    },
]);
