import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dobrodošli na Zavrsisve</h1>
        <p className={styles.subtitle}>Izaberite opciju koja vam je potrebna</p>
      </div>

      <div className={styles.cardGrid}>
        <div 
          className={styles.card}
          onClick={() => navigate('/invitation-design')}
        >
          <div className={styles.cardIcon}>💌</div>
          <h2 className={styles.cardTitle}>Izradi pozivnice</h2>
          <p className={styles.cardDescription}>
            Kreirajte personalizovane pozivnice za vaše posebne trenutke
          </p>
        </div>

        <div 
          className={styles.card}
          onClick={() => navigate('/wedding-dresses')}
        >
          <div className={styles.cardIcon}>👗</div>
          <h2 className={styles.cardTitle}>Saloni venčanica</h2>
          <p className={styles.cardDescription}>
            Pronađite najbliže salone venčanica u vašoj okolini
          </p>
        </div>

        <div 
          className={styles.card}
          onClick={() => navigate('/contact')}
        >
          <div className={styles.cardIcon}>💭</div>
          <h2 className={styles.cardTitle}>Pitanja i sugestije</h2>
          <p className={styles.cardDescription}>
            Pošaljite nam vaša pitanja ili sugestije za poboljšanje usluga
          </p>
        </div>

        <div 
          className={styles.card}
          onClick={() => navigate('/photographers')}
        >
          <div className={styles.cardIcon}>📸</div>
          <h2 className={styles.cardTitle}>Zakaži fotografisanje</h2>
          <p className={styles.cardDescription}>
            Rezervišite termin za profesionalno fotografisanje
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 