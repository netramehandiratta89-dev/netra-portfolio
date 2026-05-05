import ManagerTable from './ManagerTable.jsx';

export default function ManageBlogs() {
  return <ManagerTable title="Manage Blogs" fields={['Title', 'Slug', 'Category', 'Status']} rows={['Motion That Feels Expensive', 'Scaling React Apps', 'CMS Model']} />;
}
