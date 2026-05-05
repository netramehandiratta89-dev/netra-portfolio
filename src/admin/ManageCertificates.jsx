import ManagerTable from './ManagerTable.jsx';

export default function ManageCertificates() {
  return <ManagerTable title="Manage Certificates" fields={['Certificate', 'Issuer', 'Date', 'File']} rows={['AWS Cloud Architect', 'Meta Front-End', 'Google UX']} />;
}
