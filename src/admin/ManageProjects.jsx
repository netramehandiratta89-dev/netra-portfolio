import ManagerTable from './ManagerTable.jsx';

export default function ManageProjects() {
  return <ManagerTable title="Manage Projects" fields={['Title', 'Category', 'GitHub URL', 'Live Preview']} rows={['Nebula CRM', 'Orbit Finance', 'Astra AI Studio']} />;
}
