export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatTime = (time) => {
  if (!time) return '';
  return time.substring(0, 5);
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || colors.pending;
};

export const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    cancelled: 'Cancelado'
  };
  return labels[status] || status;
};