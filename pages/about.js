import React from 'react';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>👋 About Me</h1>
        <p className={styles.intro}>Hi, I'm [Your Name], a UX designer passionate about crafting delightful, human-centered digital experiences. I believe in the power of empathy, clarity, and a little bit of magic ✨.</p>
      </section>
      <section className={styles.section}>
        <h2>Quick Facts</h2>
        <ul className={styles.facts}>
          <li className={styles.listItem}>🌎 Based in: [City, Country]</li>
          <li className={styles.listItem}>💼 Years in UX: [X+]</li>
          <li className={styles.listItem}>🎓 Education: [Your Degree/School]</li>
          <li className={styles.listItem}>🛠️ Favorite Tools: Figma, Miro, Notion, React</li>
          <li className={styles.listItem}>☕ Fuel: Coffee, curiosity, and good playlists</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Design Tenets</h2>
        <ul className={styles.tenets}>
          <li className={styles.listItem}>Empathy first—always design for real people</li>
          <li className={styles.listItem}>Clarity over cleverness</li>
          <li className={styles.listItem}>Prototype early, test often</li>
          <li className={styles.listItem}>Collaboration is the secret sauce</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Skills</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillItem}>UX Research</div>
          <div className={styles.skillItem}>Wireframing</div>
          <div className={styles.skillItem}>Prototyping</div>
          <div className={styles.skillItem}>UI Design</div>
          <div className={styles.skillItem}>Design Systems</div>
          <div className={styles.skillItem}>Accessibility</div>
          <div className={styles.skillItem}>Front-end (React)</div>
          <div className={styles.skillItem}>Workshop Facilitation</div>
        </div>
      </section>
      <section className={styles.section}>
        <h2>Stories</h2>
        <div className={styles.story}>
          <h3>How I fell in love with UX</h3>
          <p>[Short story about your journey into UX]</p>
        </div>
        <div className={styles.story}>
          <h3>My proudest project</h3>
          <p>[Short story about a project you loved]</p>
        </div>
      </section>
      <section className={styles.section}>
        <h2>Let's Work Together!</h2>
        <p>Ready to create something amazing? <a href="/contact" className={styles.cta}>Get in touch</a> and let's chat about your next project.</p>
      </section>
    </main>
  );
} 