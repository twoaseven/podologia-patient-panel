import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: AlertCircle,
    confirmed: Calendar,
    completed: CheckCircle,
    cancelled: XCircle
  };

  const Icon = statusIcons[appointment.status] || AlertCircle;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{appointment.appointment_date}</span>
            <Clock className="h-4 w-4 text-gray-500 ml-2" />
            <span>{appointment.appointment_time}</span>
          </div>
          <p className="text-sm text-gray-600">Serviço: {appointment.service_type}</p>
          {appointment.notes && (
            <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColors[appointment.status]}`}>
          <Icon className="h-3 w-3" />
          {appointment.status === 'pending' && 'Pendente'}
          {appointment.status === 'confirmed' && 'Confirmado'}
          {appointment.status === 'completed' && 'Concluído'}
          {appointment.status === 'cancelled' && 'Cancelado'}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;