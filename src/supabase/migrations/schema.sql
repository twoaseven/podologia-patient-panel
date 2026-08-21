-- Criar tabela de perfis
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  birth_date DATE,
  cpf TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de anamnese
CREATE TABLE anamnesis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(id) NOT NULL,
  medical_history TEXT,
  allergies TEXT,
  medications TEXT,
  previous_surgeries TEXT,
  diabetes BOOLEAN DEFAULT FALSE,
  hypertension BOOLEAN DEFAULT FALSE,
  circulatory_problems BOOLEAN DEFAULT FALSE,
  foot_conditions TEXT,
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de agendamentos
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(id) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  service_type VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_anamnesis_updated_at
BEFORE UPDATE ON anamnesis
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Políticas de segurança (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE anamnesis ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para anamnesis
CREATE POLICY "Users can view own anamnesis"
  ON anamnesis FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own anamnesis"
  ON anamnesis FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own anamnesis"
  ON anamnesis FOR UPDATE
  USING (auth.uid() = patient_id);

-- Políticas para appointments
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = patient_id);