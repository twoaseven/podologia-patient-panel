import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const AnamnesisForm = ({ initialData, patientId, onSuccess }) => {
  const [formData, setFormData] = useState({
    medical_history: initialData?.medical_history || '',
    allergies: initialData?.allergies || '',
    medications: initialData?.medications || '',
    previous_surgeries: initialData?.previous_surgeries || '',
    diabetes: initialData?.diabetes || false,
    hypertension: initialData?.hypertension || false,
    circulatory_problems: initialData?.circulatory_problems || false,
    foot_conditions: initialData?.foot_conditions || '',
    observations: initialData?.observations || ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        patient_id: patientId,
        ...formData
      };

      let result;
      if (initialData) {
        result = await supabase
          .from('anamnesis')
          .update(data)
          .eq('id', initialData.id);
      } else {
        result = await supabase
          .from('anamnesis')
          .insert([data]);
      }

      if (!result.error) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Erro ao salvar anamnese:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
          Anamnese salva com sucesso!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Histórico Médico
          </label>
          <textarea
            name="medical_history"
            value={formData.medical_history}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Descreva seu histórico médico"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alergias
          </label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Liste suas alergias"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Medicamentos em Uso
          </label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Medicamentos que você está usando"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cirurgias Anteriores
          </label>
          <textarea
            name="previous_surgeries"
            value={formData.previous_surgeries}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Cirurgias realizadas anteriormente"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Condições de Saúde
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="diabetes"
              checked={formData.diabetes}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Diabetes</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hypertension"
              checked={formData.hypertension}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Hipertensão</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="circulatory_problems"
              checked={formData.circulatory_problems}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Problemas Circulatórios</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Condições nos Pés
        </label>
        <textarea
          name="foot_conditions"
          value={formData.foot_conditions}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Descreva quaisquer condições nos pés"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Observações Adicionais
        </label>
        <textarea
          name="observations"
          value={formData.observations}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Observações relevantes"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : initialData ? 'Atualizar Anamnese' : 'Salvar Anamnese'}
        </button>
      </div>
    </form>
  );
};

export default AnamnesisForm;