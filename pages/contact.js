import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Placeholder: handle form submission (e.g., send to API or email)
    setSubmitted(true);
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Contact</h1>
        <p className={styles.intro}>Let's connect! Whether you have a project in mind, want to collaborate, or just want to say hi, I'd love to hear from you.</p>
        <p className={styles.email}>Or email me directly: <a href="mailto:youremail@example.com">youremail@example.com</a></p>
      </section>
      <section className={styles.section}>
        {submitted ? (
          <div className={styles.thankyou}>Thank you for reaching out! I'll get back to you soon.</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className={styles.input} />
            </label>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        )}
      </section>
    </main>
  );
} 