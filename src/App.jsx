import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import Login from './components/Auth/Login';
import { useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto pt-20">
          <Login />
        </div>
      </div>
    );
  }

  return <PatientDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;