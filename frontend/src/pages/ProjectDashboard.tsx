import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DashboardCard from '../components/DashboardCard';
import { GET_PROJECTS_BY_ORG } from '../graphql/project/queries';

const columns = [
  { key: 'name', label: 'Project Name' },
  { key: 'status', label: 'Status' },
  { key: 'dueDate', label: 'Due Date'},
  { key: 'description', label: 'Description'}
];

export default function ProjectDashboard() {
  const { orgId } = useParams<{ orgId: string }>();
  const location = useLocation();
  const org = location.state?.org;

  const { loading, error, data } = useQuery(GET_PROJECTS_BY_ORG, {
    variables: { organizationId: orgId },
  });

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Projects for {org?.name || 'Organization'}
      </h2>
      <DashboardCard data={data.projects} columns={columns} />
    </div>
  );
}
