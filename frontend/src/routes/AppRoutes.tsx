import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrganizationDashboard from '../pages/OrganizationDashboard';
import ProjectDashboard from '../pages/ProjectDashboard';
import NotFound from '../pages/NotFound';
import TaskDashboad from '../pages/TaskDashboad';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrganizationDashboard />} />
        <Route path="/projects/:orgId" element={<ProjectDashboard />} />
        <Route path="/tasks" element={<TaskDashboad />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
