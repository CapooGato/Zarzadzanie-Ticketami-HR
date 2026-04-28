import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Dane wpisane do logowania dla testów
  const CREDENTIALS = {
    admin: { email: 'admin@hr.pl', password: 'admin123' },
    pracownik: { email: 'pracownik@hr.pl', password: 'user123' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email === CREDENTIALS.admin.email && formData.password === CREDENTIALS.admin.password) {
      navigate('/admin'); 
    } else if (formData.email === CREDENTIALS.pracownik.email && formData.password === CREDENTIALS.pracownik.password) {
      navigate('/user'); 
    } else {
      alert("Błędny e-mail lub hasło!");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label>Adres e-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label>Hasło:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <button type="submit" className="button">
            {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? 'Nie masz jeszcze konta? ' : 'Masz już konto? '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-button"
          >
            {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;