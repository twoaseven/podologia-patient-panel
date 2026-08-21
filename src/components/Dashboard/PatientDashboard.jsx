import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import AppointmentCard from './AppointmentCard';
import StatsCard from './StatsCard';
import AnamnesisForm from '../Anamnesis/AnamnesisForm';
import AppointmentCalendar from '../Appointments/AppointmentCalendar';
import { Bell, Calendar, FileText, History, User } from 'lucide-react';

const PatientDashboard = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [anamnesis, setAnamnesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: appData } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: true });

      setAppointments(appData || []);

      const today = new Date().toISOString().split('T')[0];
      const upcoming = appData?.filter(
        app => app.status !== 'cancelled' && 
        app.status !== 'completed' && 
        app.appointment_date >= today
      ) || [];
      setUpcomingAppointments(upcoming);

      const { data: anamData } = await supabase
        .from('anamnesis')
        .select('*')
        .eq('patient_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      setAnamnesis(anamData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const [notifications] = useState([
    { id: 1, message: 'Seu agendamento para amanhã foi confirmado', date: '2026-08-20' },
  ]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'appointments', label: 'Agendamentos', icon: Calendar },
    { id: 'anamnesis', label: 'Anamnese', icon: FileText },
    { id: 'history', label: 'Histórico', icon: History },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">🦶 Podologia</h1>
              <span className="ml-2 text-sm text-gray-500">Olá, {profile?.full_name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => supabase.auth.signOut()}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <>
            {upcomingAppointments.length > 0 && (
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-700">
                    Próximos atendimentos:
                  </span>
                  <span className="ml-2 text-blue-600">
                    {upcomingAppointments[0].appointment_date} às {upcomingAppointments[0].appointment_time}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Próximos Agendamentos"
                value={upcomingAppointments.length}
                icon={Calendar}
                color="blue"
              />
              <StatsCard
                title="Total de Atendimentos"
                value={appointments.length}
                icon={History}
                color="green"
              />
              <StatsCard
                title="Anamnese"
                value={anamnesis ? 'Completa' : 'Pendente'}
                icon={FileText}
                color={anamnesis ? 'green' : 'yellow'}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">📅 Próximos Agendamentos</h2>
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(app => (
                    <AppointmentCard key={app.id} appointment={app} />
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum agendamento próximo</p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">📅 Agendamentos</h2>
            <AppointmentCalendar 
              appointments={appointments}
              onNewAppointment={() => setActiveTab('anamnesis')}
            />
          </div>
        )}

        {activeTab === 'anamnesis' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">📋 Ficha de Anamnese</h2>
            <AnamnesisForm 
              initialData={anamnesis}
              patientId={user.id}
              onSuccess={fetchData}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">📜 Histórico de Atendimentos</h2>
            <div className="space-y-4">
              {appointments.filter(a => a.status === 'completed').map(app => (
                <div key={app.id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{app.appointment_date}</p>
                      <p className="text-sm text-gray-600">Horário: {app.appointment_time}</p>
                      <p className="text-sm text-gray-600">Serviço: {app.service_type}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Concluído
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;