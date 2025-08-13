import React, { useState } from 'react';

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  cnpj: string;
  vehiclePlate: string;
  termsAccepted: boolean;
}

interface FormErrors {
  name?: string;
  cpf?: string;
  phone?: string;
  cnpj?: string;
  vehiclePlate?: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    phone: '',
    cnpj: '',
    vehiclePlate: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validação de CPF
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  // Validação de CNPJ
  const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;
    
    return true;
  };

  // Validação de celular/telefone
  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Verifica se tem 10 ou 11 dígitos e se o DDD é válido
    if (cleanPhone.length !== 10 && cleanPhone.length !== 11) return false;
    
    // Lista de DDDs válidos no Brasil
    const validDDDs = [
      '11', '12', '13', '14', '15', '16', '17', '18', '19',
      '21', '22', '24', '27', '28',
      '31', '32', '33', '34', '35', '37', '38',
      '41', '42', '43', '44', '45', '46', '47', '48', '49',
      '51', '53', '54', '55',
      '61', '62', '63', '64', '65', '66', '67', '68', '69',
      '71', '73', '74', '75', '77', '79',
      '81', '82', '83', '84', '85', '86', '87', '88', '89',
      '91', '92', '93', '94', '95', '96', '97', '98', '99'
    ];
    
    const ddd = cleanPhone.substring(0, 2);
    return validDDDs.includes(ddd);
  };

  // Validação de placa do veículo (padrão brasileiro e Mercosul)
  const validateVehiclePlate = (plate: string): boolean => {
    const cleanPlate = plate.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    // Padrão brasileiro: ABC-1234 (3 letras + 4 números)
    const brazilianPattern = /^[A-Z]{3}[0-9]{4}$/;
    
    // Padrão Mercosul: ABC1D23 (3 letras + 1 número + 1 letra + 2 números)
    const mercosulPattern = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    
    return brazilianPattern.test(cleanPlate) || mercosulPattern.test(cleanPlate);
  };

  // Função para validar um campo específico
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'cpf':
        if (!value) return 'CPF é obrigatório';
        if (!validateCPF(value)) return 'CPF inválido';
        return undefined;
      
      case 'cnpj':
        if (!value) return 'CNPJ é obrigatório';
        if (!validateCNPJ(value)) return 'CNPJ inválido';
        return undefined;
      
      case 'phone':
        if (!value) return 'Celular é obrigatório';
        if (!validatePhone(value)) return 'Celular inválido ';
        return undefined;
      
      case 'vehiclePlate':
        if (!value) return 'Placa do veículo é obrigatória';
        if (!validateVehiclePlate(value)) return 'Placa inválida ';
        return undefined;
      
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        return undefined;
      
      default:
        return undefined;
    }
  };

  // Função para validar todo o formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.cpf = validateField('cpf', formData.cpf);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.cnpj = validateField('cnpj', formData.cnpj);
    newErrors.vehiclePlate = validateField('vehiclePlate', formData.vehiclePlate);
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    // Se tiver 11 dígitos (celular): (00) 00000-0000
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    // Se tiver 10 dígitos (telefone fixo): (00) 0000-0000
    if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    // Formatação parcial durante digitação
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    
    return numbers;
  };

  const formatVehiclePlate = (value: string) => {
    const cleanValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    // Se for padrão Mercosul (ABC1D23)
    if (cleanValue.length >= 7 && /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(cleanValue.slice(0, 7))) {
      return cleanValue.slice(0, 7);
    }
    
    // Se for padrão brasileiro (ABC1234)
    if (cleanValue.length >= 7 && /^[A-Z]{3}[0-9]{4}$/.test(cleanValue.slice(0, 7))) {
      return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3, 7)}`;
    }
    
    // Formatação parcial durante digitação
    if (cleanValue.length <= 3) {
      return cleanValue;
    } else if (cleanValue.length <= 7) {
      return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`;
    }
    
    return cleanValue.slice(0, 7);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }

    switch (name) {
      case 'cpf':
        formattedValue = formatCPF(value);
        break;
      case 'cnpj':
        formattedValue = formatCNPJ(value);
        break;
      case 'phone':
        formattedValue = formatPhone(value);
        break;
      case 'vehiclePlate':
        formattedValue = formatVehiclePlate(value);
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Validação em tempo real
    const error = validateField(name, formattedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setSubmitMessage('❌ Você deve aceitar os termos de uso para continuar.');
      return;
    }
    
    // Validação completa antes de enviar
    if (!validateForm()) {
      setSubmitMessage('❌ Por favor, corrija os erros no formulário antes de enviar.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const airtableData = {
        records: [
          {
            fields: {
              cpf: formData.cpf.replace(/\D/g, ''), 
              nome: formData.name,
              placaVeiculo: formData.vehiclePlate,
              cnpjAssociado: formData.cnpj.replace(/\D/g, ''), 
              celular: formData.phone.replace(/\D/g, '') 
            }
          }
        ]
      };

      const response = await fetch('https://api.airtable.com/v0/appDuylO6HJa3H4Z2/Cadastros', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer patEin9XUwuU3TOvN.7c802095c636b0ba1142e6fb004e43ca74a93d14a32d60c38cfc1dd8c93f8c6e',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(airtableData)
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const result = await response.json();
      
      if (result.records && result.records.length > 0) {
        setSubmitMessage('✅ Cadastro realizado com sucesso! Seus dados estão em análise e você receberá um retorno via WhatsApp em até 48 horas.');
        setFormData({
          name: '',
          cpf: '',
          phone: '',
          cnpj: '',
          vehiclePlate: '',
          termsAccepted: false
        });
        setErrors({});
      } else {
        throw new Error('Resposta inválida da API');
      }
    } catch (error) {
      console.error('Erro ao enviar cadastro:', error);
      setSubmitMessage('❌ Erro ao realizar cadastro. Tente novamente ou entre em contato conosco.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Nome Completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Digite seu nome completo"
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF *</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required
            placeholder="000.000.000-00"
            maxLength={14}
            className={`form-input ${errors.cpf ? 'error' : ''}`}
          />
          {errors.cpf && <span className="error-message">{errors.cpf}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Celular/Telefone *</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="(00) 00000-0000 ou (00) 0000-0000"
            maxLength={15}
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          <small className="help-text">Formato: (00) 00000-0000 (celular) ou (00) 0000-0000 (fixo)</small>
        </div>

        <div className="form-group">
          <label htmlFor="cnpj">CNPJ do Associado *</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            required
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className={`form-input ${errors.cnpj ? 'error' : ''}`}
          />
          {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="vehiclePlate">Placa do Veículo *</label>
          <input
            type="text"
            id="vehiclePlate"
            name="vehiclePlate"
            value={formData.vehiclePlate}
            onChange={handleInputChange}
            required
            placeholder="ABC-1234 ou ABC1D23"
            maxLength={8}
            className={`form-input ${errors.vehiclePlate ? 'error' : ''}`}
          />
          {errors.vehiclePlate && <span className="error-message">{errors.vehiclePlate}</span>}
          <small className="help-text">Formato: ABC-1234 ou ABC1D23</small>
        </div>

        <div className="form-group terms-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              required
              className="terms-checkbox"
            />
            <span className="checkbox-custom"></span>
            <span className="terms-text">
              Li e aceito os termos de uso *
            </span>
          </label>
          {!formData.termsAccepted && (
            <div className="terms-error">
              Você deve aceitar os termos de uso para continuar
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.termsAccepted || Object.values(errors).some(error => error !== undefined)}
          className="submit-button"
        >
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('sucesso') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
