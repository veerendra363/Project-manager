import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrganizationDashboard from '../pages/organization/OrganizationDashboard';
import ProjectDashboard from '../pages/project/ProjectDashboard';
import NotFound from '../pages/NotFound';
import TaskDashboard from '../pages/task/TaskDashboad';
import Task from '../pages/task/Task';
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrganizationDashboard />} />
        <Route path="/projects/:orgId" element={<ProjectDashboard />} />
        <Route path="/tasks/:projectId" element={<TaskDashboard />} />
        <Route path="/discussions/:taskId" element={<Task />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
