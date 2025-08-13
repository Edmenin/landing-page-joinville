import './App.css';
import RegistrationForm from './components/RegistrationForm';
import Map from './components/Map';

function App() {
  const scrollToRegister = () => {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="/logo-cdl-joinville.png" alt="CDL Joinville" className="logo-image" />
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="promo-banner">
              <h2 className="promo-title">Desconto na bomba: economize até</h2>
              <div className="promo-value">R$ 0,30/litro</div>
              <p className="promo-condition">Sem limite de abastecimento!</p>
              <button className="activate-button" onClick={scrollToRegister}>Ativar benefício</button>
            </div>
          </div>
        </div>
      </section>

      <section id="discounts" className="fuel-discounts">
        <div className="container">
          <div className="discounts-header">
            <h2 className="discounts-title">Aproveite o desconto</h2>
            <p className="discounts-subtitle">abastecendo com a CDL Joinville</p>
          </div>
          <div className="discounts-grid">
            <div className="discount-card">
              <div className="card-icon-container">
                <div className="icon-circle">
                  <div className="fuel-pump-icon">⛽</div>
                </div>
              </div>
              <h3>Gasolina comum ou aditivada</h3>
              <div className="discount-value">R$0,30 por litro</div>
            </div>
            
            <div className="discount-card">
              <div className="card-icon-container">
                <div className="icon-circle">
                  <div className="ethanol-icon">🌿</div>
                </div>
              </div>
              <h3>Etanol</h3>
              <div className="discount-value">R$0,12 por litro</div>
            </div>
            
            <div className="discount-card">
              <div className="card-icon-container">
                <div className="icon-circle">
                  <div className="gnv-icon">📊</div>
                </div>
              </div>
              <h3>GNV</h3>
              <div className="discount-value">R$0,12 por m³</div>
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="registration">
        <div className="container">
          <h2>Cadastro de Associado</h2>
          <p>Preencha os dados para se cadastrar no sistema</p>
          <RegistrationForm />
        </div>
      </section>

      <section id="steps" className="step-by-step">
        <div className="container">
          <div className="steps-content">
            <div className="steps-text">
              <h2>Passo a Passo</h2>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Preencha o formulário</h3>
                    <p>Informe seus dados para confirmar seu vínculo como associado da CDL.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Aguarde nosso contato:</h3>
                    <p>Validaremos suas informações e, após a confirmação, você receberá uma mensagem no WhatsApp com a liberação do cadastro.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Abasteça com desconto:</h3>
                    <p>Com seus dados validados, basta ir até um dos postos credenciados, informar que é da Unicooper e apresentar seu CPF. Pronto!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="steps-image">
              <div className="fueling-photo">
                <img src="/combustivel.jpg" alt="Abastecimento de combustível" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="partners">
        <div className="container">
          <h2>Localização dos Postos Parceiros</h2>
          <p>Encontre o posto parceiro mais próximo de você</p>
          <Map />
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <img src="/logo-cdl-joinville.png" alt="CDL Joinville" className="footer-logo-image" />
              </div>
              <p className="footer-slogan">Descontos em todos os postos parceiros</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/JoinvilleCDL/?locale=pt_BR" className="social-icon facebook">
                  <img src="/facebook-3-logo-svgrepo-com.svg" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/cdljoinville" className="social-icon instagram">
                  <img src="/instagram-1-svgrepo-com.svg" alt="Instagram" />
                </a>
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-column">
                <h3>Sobre nós</h3>
                <ul>
                  <li><a href="https://cdljoinville.com.br">Quem somos</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;