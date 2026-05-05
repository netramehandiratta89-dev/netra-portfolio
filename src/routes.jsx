import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import ManageProjects from './admin/ManageProjects.jsx';
import ManageSkills from './admin/ManageSkills.jsx';
import ManageBlogs from './admin/ManageBlogs.jsx';
import ManageCertificates from './admin/ManageCertificates.jsx';
import ManageMessages from './admin/ManageMessages.jsx';
import { useAuth } from './hooks/useAuth.js';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<ManageProjects />} />
      <Route path="skills" element={<ManageSkills />} />
      <Route path="blogs" element={<ManageBlogs />} />
      <Route path="certificates" element={<ManageCertificates />} />
      <Route path="messages" element={<ManageMessages />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
