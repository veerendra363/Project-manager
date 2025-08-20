import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import DashboardCard from "../../components/DashboardCard";
import Modal from "../../components/Model";
import AddNewOrganizationForm from "./OrganizationForm";
import Toast from "../../components/Toast";
import { GET_ORGANIZATIONS } from "../../graphql/organization/queries";

const columns = [
  { key: "name", label: "Organization Name", minWidth: 150, maxWidth: 250 },
  { key: "slug", label: "Slug", minWidth: 120, maxWidth: 200 },
  { key: "contactEmail", label: "Contact Email", minWidth: 200, maxWidth: 300 },
];

export default function OrganizationDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [editingOrg, setEditingOrg] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const orderBy = "desc";

  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_ORGANIZATIONS, {
    variables: { page, pageSize, orderBy },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const handleSuccess = async () => {
    const action = editingOrg ? "updated" : "added"
    setModalOpen(false);
    setToast({ message: `✅ Organization ${action} successfully!`, type: "success" });
    setPage(1);
    await refetch({ page: 1, pageSize, orderBy });
  };

  const handleError = (msg: string) => {
    setModalOpen(false);
    setToast({ message: `❌ ${msg}`, type: "error" });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (org: any) => {
    setEditingOrg(org); 
    setModalOpen(true);
  };

  const handleForward = (org: any) => {
    navigate(`/projects/${org.id}`, { state: { org } });
  };

  return (
    <div className="p-4">
      <DashboardCard
        dashboardType="org"
        data={data.organizations.results}
        columns={columns}
        totalCount={data.organizations.totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onAddNew={() => setModalOpen(true)}
        onView={(org) => console.log("View:", org)}
        onForward={(org) => handleForward(org)}
        onEdit={(org) => handleEdit(org)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingOrg ? "Edit Organization" : "Add New Organization"}
      >
        <AddNewOrganizationForm onSuccess={handleSuccess} onError={handleError} organization={editingOrg}/>
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
