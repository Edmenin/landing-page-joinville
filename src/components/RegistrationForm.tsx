import React, { useState } from 'react';

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  cnpj: string;
  vehiclePlate: string;
  termsAccepted: boolean;
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatVehiclePlate = (value: string) => {
    const letters = value.replace(/[^A-Za-z]/g, '').toUpperCase();
    const numbers = value.replace(/\D/g, '');
    return `${letters.slice(0, 3)}-${numbers.slice(0, 4)}`;
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setSubmitMessage('❌ Você deve aceitar os termos de uso para continuar.');
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
            className="form-input"
          />
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
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Celular *</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="(00) 00000-0000"
            maxLength={15}
            className="form-input"
          />
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
            className="form-input"
          />
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
            placeholder="ABC-1234"
            maxLength={8}
            className="form-input"
          />
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
              Li e aceito os <a 
                href="https://docs.google.com/document/d/1cn38UaikfhnxhRSaCLh9vN3GSHKywDqJmCEIWmkuG00/edit?tab=t.0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="terms-link"
              >
                termos de uso
              </a> e <a 
                href="https://docs.google.com/document/d/1cn38UaikfhnxhRSaCLh9vN3GSHKywDqJmCEIWmkuG00/edit?tab=t.0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="terms-link"
              >
                política de privacidade
              </a> *
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
          disabled={isSubmitting || !formData.termsAccepted}
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
