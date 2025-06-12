import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual login logic here
    navigate('/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Dobrodošli</h1>
        <p className={styles.subtitle}>Prijavite se na vaš račun</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Unesite vaš email"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Unesite vašu lozinku"
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Prijavi se
          </button>
        </form>

        <p className={styles.footer}>
          Nemate račun? <a href="#" className={styles.link}>Registrujte se</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 