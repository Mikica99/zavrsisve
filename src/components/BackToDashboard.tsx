import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/BackToDashboard.module.css';

const BackToDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the button on login or dashboard pages
  if (location.pathname === '/login' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <button 
      className={styles.backButton}
      onClick={() => navigate('/dashboard')}
      title="Nazad na početnu"
    >
      <span className={styles.icon}>🏠</span>
      <span className={styles.text}>Dashboard</span>
    </button>
  );
};

export default BackToDashboard; 