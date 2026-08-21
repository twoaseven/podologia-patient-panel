import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { getStatusColor, getStatusLabel, formatDate, formatTime } from '../../lib/utils';

const AppointmentList = ({ appointments, onCancel }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum agendamento encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{formatDate(appointment.appointment_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{formatTime(appointment.appointment_time)}</span>
                </div>
              </div>
              
              <div>
                <span className="font-medium">Serviço: </span>
                <span className="text-gray-600">{appointment.service_type}</span>
              </div>
              
              {appointment.notes && (
                <div>
                  <span className="font-medium">Observações: </span>
                  <span className="text-gray-600 text-sm">{appointment.notes}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusLabel(appointment.status)}
              </span>
              
              {appointment.status === 'pending' && (
                <button
                  onClick={() => onCancel(appointment.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;