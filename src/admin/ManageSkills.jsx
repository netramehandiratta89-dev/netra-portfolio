import ManagerTable from './ManagerTable.jsx';

export default function ManageSkills() {
  return <ManagerTable title="Manage Skills" fields={['Skill', 'Level', 'Icon', 'Group']} rows={['React', 'Motion Design', 'Node.js']} />;
}
