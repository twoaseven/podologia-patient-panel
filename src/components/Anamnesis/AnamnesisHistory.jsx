import React from 'react';
import { formatDate } from '../../lib/utils';

const AnamnesisHistory = ({ histories }) => {
  if (!histories || histories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum registro de anamnese encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {histories.map((history, index) => (
        <div key={history.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium">Registro #{index + 1}</h4>
            <span className="text-sm text-gray-500">
              {formatDate(history.created_at)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {history.medical_history && (
              <div>
                <span className="font-medium">Histórico Médico:</span>
                <p className="text-gray-600">{history.medical_history}</p>
              </div>
            )}
            {history.allergies && (
              <div>
                <span className="font-medium">Alergias:</span>
                <p className="text-gray-600">{history.allergies}</p>
              </div>
            )}
            {history.medications && (
              <div>
                <span className="font-medium">Medicamentos:</span>
                <p className="text-gray-600">{history.medications}</p>
              </div>
            )}
            {history.foot_conditions && (
              <div>
                <span className="font-medium">Condições nos Pés:</span>
                <p className="text-gray-600">{history.foot_conditions}</p>
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-4 flex-wrap">
            {history.diabetes && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Diabetes</span>
            )}
            {history.hypertension && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Hipertensão</span>
            )}
            {history.circulatory_problems && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Problemas Circulatórios</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnamnesisHistory;