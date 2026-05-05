import ManagerTable from './ManagerTable.jsx';

export default function ManageMessages() {
  return <ManagerTable title="Manage Contact Messages" fields={['Name', 'Email', 'Subject', 'Status']} rows={['Maya Shah', 'Leo Kim', 'Priya Rao']} />;
}
