import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAppointments = (patientId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId) return;
    fetchAppointments();
  }, [patientId]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    refreshAppointments: fetchAppointments
  };
};