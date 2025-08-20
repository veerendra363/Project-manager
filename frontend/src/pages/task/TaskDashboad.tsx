import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import DashboardCard from '../../components/DashboardCard';
import { GET_TASKS_BY_PROJ } from '../../graphql/Task/queries';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Modal from '../../components/Model';
import Toast from '../../components/Toast';
// import AddNewTaskForm from './AddNewTaskForm'; // assume you have this form

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'status', label: 'Status' },
  { key: 'assigneeEmail', label: 'Assignee Email' },
  { key: 'description', label: 'Description' },
];

export default function TaskDashboard() {
  const { projId } = useParams<{ projId: string }>();
  const location = useLocation();
  const proj = location.state?.proj;

  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const orderBy = 'desc';

  const { loading, error, data, refetch } = useQuery(GET_TASKS_BY_PROJ, {
    variables: { projectId: projId, page, pageSize, orderBy },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSuccess = async () => {
    setModalOpen(false);
    setToast({ message: '✅ Task added successfully!', type: 'success' });
    await refetch();
  };

  const handleError = (msg: string) => {
    setModalOpen(false);
    setToast({ message: `❌ ${msg}`, type: 'error' });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Tasks for {proj?.name || 'Project'}
      </h2>

      <DashboardCard
        dashboardType="task" // this will show Discussion icon
        data={data.tasks.results} // paginated results
        totalCount={data.tasks.total_count} // total tasks for pagination
        pageSize={pageSize}
        columns={columns}
        onPageChange={handlePageChange}
        onAddNew={() => setModalOpen(true)}
        onForward={(task) => console.log('Go to discussion for', task)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Task"
      >
        {/* <AddNewTaskForm projectId={projId!} onSuccess={handleSuccess} onError={handleError} /> */}/
        <Error />  
      </Modal>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
