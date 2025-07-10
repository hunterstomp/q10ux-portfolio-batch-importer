import React, { useEffect, useState } from 'react';
import sanityClient from '../lib/sanity';
import styles from './PortfolioGrid.module.css';

const projectQuery = `*[_type == "project" && (!defined(nda) || nda != true)]{_id, title, slug, description, coverImage}`;
const imageQuery = `*[_type == "portfolioImage"]{_id, title, thumbnail, project->{title, slug}}`;

const PortfolioGrid = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    sanityClient.fetch(projectQuery).then(setProjects);
    sanityClient.fetch(imageQuery).then(setImages);
  }, []);

  return (
    <section className={styles.portfolioGrid}>
      <h1>Portfolio</h1>
      <h2>Projects</h2>
      <div className={styles.grid}>
        {projects.length === 0 && <div>Loading projects...</div>}
        {projects.map((project) => (
          <div key={project._id} className={styles.card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <h2 style={{marginTop: '2rem'}}>Portfolio Images</h2>
      <div className={styles.grid}>
        {images.length === 0 && <div>Loading images...</div>}
        {images.map((img) => (
          <div key={img._id} className={styles.card}>
            <h4>{img.title}</h4>
            {img.thumbnail && img.thumbnail.asset && (
              <img src={img.thumbnail.asset.url} alt={img.title} style={{width: '100%', borderRadius: 8}} />
            )}
            <div style={{fontSize: '0.9em', color: '#888'}}>{img.project?.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid; 