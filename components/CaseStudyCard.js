import React from 'react';
import styles from './CaseStudyCard.module.css';

const CaseStudyCard = ({ title = 'Case Study Title', summary = 'Short summary goes here.' }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{summary}</p>
    {/* <a href="#">Read More</a> */}
  </div>
);

export default CaseStudyCard; 