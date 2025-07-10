import React, { useEffect, useState } from 'react';
import sanityClient from '../lib/sanity';
import styles from './PortfolioPreview.module.css';

// Only fetch images with a valid asset and project, and not NDA
const imageQuery = `*[_type == "portfolioImage" && (!defined(nda) || nda != true) && defined(thumbnail.asset._ref) && defined(project)]{_id, title, thumbnail, project->{title, slug}}[0...6]`;
const projectQuery = `*[_type == "project" && (!defined(nda) || nda != true)]{_id, title, slug, description, coverImage, tags}`;

const PortfolioPreview = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient.fetch(projectQuery).then(setProjects).catch(err => setError('Failed to load projects.'));
    sanityClient.fetch(imageQuery).then(setImages).catch(err => setError('Failed to load images.'));
  }, []);

  if (error) {
    return <div className={styles.portfolioPreview}><h2>Error</h2><p>{error}</p></div>;
  }

  return (
    <section className={styles.portfolioPreview}>
      <h2 className={styles.sectionHeader}>Featured Projects</h2>
      <div className={styles.grid}>
        {projects.length === 0 && <div>Loading projects...</div>}
        {projects.map((proj) => (
          <div key={proj._id} className={styles.card}>
            {proj.coverImage && proj.coverImage.asset && (
              <img src={proj.coverImage.asset.url} alt={proj.title} className={styles.cardImage} />
            )}
            <h3 className={styles.cardTitle}>{proj.title}</h3>
            {proj.description && <p className={styles.cardDesc}>{proj.description}</p>}
            {proj.tags && proj.tags.length > 0 && (
              <div className={styles.cardTags}>
                {proj.tags.map((tag, i) => <span key={i} className={styles.cardTag}>{tag}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <h2 style={{marginTop: '2rem'}}>Featured Images</h2>
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

export default PortfolioPreview; 