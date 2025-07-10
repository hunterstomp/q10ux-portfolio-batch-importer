import React from 'react';
import styles from './ContactTeaser.module.css';

const ContactTeaser = () => (
  <section className={styles.contactTeaser}>
    <h2 className={styles.sectionHeader}>Let's Connect</h2>
    <p className={styles.sectionDesc}>Interested in working together or have a question?</p>
    <a href="/contact" className={styles.ctaBtn}>Contact Me</a>
  </section>
);

export default ContactTeaser; 