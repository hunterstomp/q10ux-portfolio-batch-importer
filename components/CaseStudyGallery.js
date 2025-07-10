import React from 'react';
import styles from './CaseStudyGallery.module.css';

const CaseStudyGallery = ({ images = [] }) => (
  <section className={styles.gallery}>
    <h2>Gallery</h2>
    <div className={styles.images}>
      {images.length === 0 ? (
        <div className={styles.imagePlaceholder}>No images available</div>
      ) : (
        images.map((img) => (
          <div key={img._id} className={styles.imagePlaceholder}>
            <img src={img.thumbnail} alt={img.title} />
          </div>
        ))
      )}
    </div>
  </section>
);

export default CaseStudyGallery; 