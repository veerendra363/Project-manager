import { useQuery } from '@apollo/client';
import DashboardCard from '../components/DashboardCard';
import { GET_ORGANIZATIONS } from '../graphql/organization/queries';
import { useNavigate } from 'react-router-dom';


const columns = [
  { key: 'name', label: 'Organization Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'contactEmail', label: 'Contact Email' },
];

export default function OrganizationDashboard() {
 const { loading, error, data } = useQuery(GET_ORGANIZATIONS);
 const navigate = useNavigate() 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleRowClick = (org: any) => {
    navigate(`/projects/${org.id}`, { state: { org } })
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Organization Dashboard</h2>
      <DashboardCard data={data.organizations} columns={columns} onRowClick={handleRowClick}/>
    </div>
  );
}
