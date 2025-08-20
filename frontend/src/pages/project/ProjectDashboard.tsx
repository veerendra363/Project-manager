import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DashboardCard from '../../components/DashboardCard';
import { GET_PROJECTS_BY_ORG } from '../../graphql/project/queries';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Modal from '../../components/Model';
import Toast from '../../components/Toast';
import AddNewProjectForm from './ProjectForm';
import { useState } from 'react';

const columns = [
  { key: 'name', label: 'Project Name' },
  { key: 'status', label: 'Status' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'description', label: 'Description' }
];

export default function ProjectDashboard() {
  const [editingProject, setEditingProject] = useState();
  const { orgId } = useParams<{ orgId: string }>();
  const location = useLocation();
  const org = location.state?.org;
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const orderBy = "desc";

  const { loading, error, data, refetch } = useQuery(GET_PROJECTS_BY_ORG, {
    variables: { organizationId: orgId, page, pageSize, orderBy },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const handleForward = (proj: any) => {
    navigate(`/tasks/${proj.id}`, { state: { proj } });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSuccess = async () => {
    const action = editingProject ? "updated" : "added"
    setModalOpen(false);
    setToast({ message: `✅ Project ${action} successfully!`, type: "success" });
    setPage(1);
    await refetch({ page: 1, pageSize, orderBy });
  };

  const handleError = (msg: string) => {
    setModalOpen(false);
    setToast({ message: `❌ ${msg}`, type: "error" });
  };

  const handleEdit = (proj: any) =>{
    setEditingProject(proj);
    setModalOpen(true);
  } 

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-5 capitalize">
        {org?.name || 'Organization'} Projects
      </h2>

      <DashboardCard
        dashboardType="proj"
        data={data.projects.results}
        columns={columns}
        totalCount={data.projects.totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onAddNew={() => setModalOpen(true)}
        onView={(proj) => console.log("View:", proj)}
        onForward={handleForward}
        onEdit={(proj) => handleEdit(proj)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Project"
      >
        <AddNewProjectForm
          onSuccess={handleSuccess}
          onError={handleError}
          organizationId={orgId!}
          project={editingProject}
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
