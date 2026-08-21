import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AppointmentCalendar = ({ appointments, onNewAppointment }) => {
  const [view, setView] = useState('month');

  const events = appointments.map(app => ({
    id: app.id,
    title: `${app.service_type} - ${app.status}`,
    start: new Date(`${app.appointment_date}T${app.appointment_time}`),
    end: new Date(`${app.appointment_date}T${app.appointment_time}`),
    status: app.status,
    allDay: false
  }));

  const eventStyleGetter = (event) => {
    const colors = {
      pending: { backgroundColor: '#FCD34D', color: '#000' },
      confirmed: { backgroundColor: '#60A5FA', color: '#000' },
      completed: { backgroundColor: '#34D399', color: '#000' },
      cancelled: { backgroundColor: '#F87171', color: '#000' }
    };

    return {
      style: colors[event.status] || colors.pending
    };
  };

  return (
    <div className="h-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Calendário de Agendamentos</h3>
        <button
          onClick={onNewAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Novo Agendamento
        </button>
      </div>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        view={view}
        onView={setView}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default AppointmentCalendar;