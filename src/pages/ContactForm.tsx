import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Initialize EmailJS with your public key
      emailjs.init("A66fPG9BhAlibWhCV"); // Replace with your actual public key

      const templateParams = {
        to_name: 'Zavrsisve Admin',
        from_name: `${formData.name} ${formData.surname}`,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email
      };

      await emailjs.send(
        'service_u36ecvw', 
        'template_3nc6ysx', 
        templateParams
      );

      setSubmitStatus({
        type: 'success',
        message: 'Hvala vam na vašoj poruci! Odgovorićemo vam uskoro.'
      });

      // Reset form
      setFormData({
        name: '',
        surname: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Pitanja i sugestije</h1>
        <p className={styles.subtitle}>Pošaljite nam vaše pitanje ili sugestiju</p>

        {submitStatus.type && (
          <div className={`${styles.alert} ${styles[submitStatus.type]}`}>
            {submitStatus.message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Ime</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Unesite vaše ime"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="surname">Prezime</label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Unesite vaše prezime"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Unesite vašu email adresu"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Poruka</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Unesite vašu poruku"
              required
              rows={5}
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
            disabled={isSubmitting}
          >
            <span className={styles.buttonIcon}>
              {isSubmitting ? '⏳' : '📨'}
            </span>
            {isSubmitting ? 'Slanje...' : 'Pošalji poruku'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm; 