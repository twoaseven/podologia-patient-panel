import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, Bell } from 'lucide-react';

const Navbar = ({ notificationCount = 0 }) => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">🦶 Podologia</h1>
            <span className="ml-2 text-sm text-gray-500">
              Olá, {user?.user_metadata?.full_name || 'Paciente'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm">Perfil</span>
            </button>
            
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;