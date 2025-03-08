// src/App.js
import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Outlet 
} from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import NotFound from './pages/NotFound';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Layout Route for authenticated routes
const LayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<div>Campaigns Page</div>} />
            <Route path="/flows" element={<div>Flows Page</div>} />
            <Route path="/integrations" element={<div>Integrations Page</div>} />
            <Route path="/customers" element={<div>Customers Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/team" element={<div>Team Page</div>} />
            
            {/* Default route for authenticated users */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;