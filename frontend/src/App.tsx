// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard';

// import LogsPage from '@/pages/logs';
// import ContainersPage from '@/pages/containers';
// import NotFoundPage from '@/pages/not-found';
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                {/* <Route path='/containers' element={<ContainersPage />} />
                <Route path='/logs' element={<LogsPage />} />
                <Route path='*' element={<NotFoundPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
