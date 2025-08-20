import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DashboardCard from '../../components/DashboardCard';
import { GET_TASKS_BY_PROJECT } from '../../graphql/task/queries';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Modal from '../../components/Model';
import Toast from '../../components/Toast';
import TaskForm from './TaskForm';
import { useState } from 'react';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'status', label: 'Status' },
  { key: 'assigneeEmail', label: 'Assignee Email' },
  { key: 'description', label: 'Description' }
];

export default function TaskDashboard() {
  const [editingTask, setEditingTask] = useState<any>(null);
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const project = location.state?.proj;
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const orderBy = "desc";

  const { loading, error, data, refetch } = useQuery(GET_TASKS_BY_PROJECT, {
    variables: { projectId, page, pageSize, orderBy },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const handleSuccess = async () => {
    const action = editingTask ? "updated" : "added";
    setModalOpen(false);
    setToast({ message: `✅ Task ${action} successfully!`, type: "success" });
    setPage(1);
    await refetch({ projectId, page: 1, pageSize, orderBy });
  };

  const handleError = (msg: string) => {
    setModalOpen(false);
    setToast({ message: `❌ ${msg}`, type: "error" });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Tasks for {project?.name || 'Project'}
      </h2>

      <DashboardCard
        dashboardType="task"
        data={data.tasks.results}
        columns={columns}
        totalCount={data.tasks.totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onAddNew={() => { setEditingTask(null); setModalOpen(true); }}
        onView={(task) => console.log("View:", task)}
        onEdit={handleEdit}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          projectId={projectId!}
          task={editingTask}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
