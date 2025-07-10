import React from 'react';
import styles from './CaseStudyOverview.module.css';

const CaseStudyOverview = ({ overview = 'This is a short overview of the case study. Replace with real content.' }) => (
  <section className={styles.overview}>
    <h2>Overview</h2>
    <p>{overview}</p>
  </section>
);

export default CaseStudyOverview; 