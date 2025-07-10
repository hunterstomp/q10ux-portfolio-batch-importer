import React, { useMemo } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styles from './FrontpageHero.module.css';

// List of images in the order used by the Hype animation
const images = [
  '1ApplePencil.png',
  '1iPadScreen.png',
  '3StaedlerPen.png',
  '4iPhone.png',
  '6PostItYellow-ang.png',
  '7PostitPink-ang.png',
  '8PostitBlue-ang.png',
  '9StaedlerPencil.png',
  '11magicmouse.png',
  '12Keyboard.png',
  '13Pencil.png',
  '14journalgrid.png',
  '15Coffee.png',
  '16journal2.png',
  'Group 3.png',
  'Gridbkg.png',
];

// Animation configs for desktop, tablet, mobile (based on Hype layout and breakpoints)
const getAnimConfigs = (width) => {
  if (width < 600) {
    // Mobile
    return [
      { x: -60, y: -40, scale: 0.7, rotate: -10, delay: 0.05 },
      { x: 0, y: -80, scale: 0.7, rotate: 8, delay: 0.1 },
      { x: 60, y: -30, scale: 0.7, rotate: 12, delay: 0.15 },
      { x: -70, y: 40, scale: 0.7, rotate: -8, delay: 0.18 },
      { x: 70, y: 60, scale: 0.7, rotate: 10, delay: 0.22 },
      { x: -40, y: 80, scale: 0.7, rotate: 6, delay: 0.25 },
      { x: 40, y: 90, scale: 0.7, rotate: -6, delay: 0.28 },
      { x: 0, y: 100, scale: 0.7, rotate: 0, delay: 0.3 },
      { x: 80, y: -60, scale: 0.7, rotate: 14, delay: 0.33 },
      { x: -80, y: 0, scale: 0.7, rotate: -12, delay: 0.36 },
      { x: 60, y: 80, scale: 0.7, rotate: 10, delay: 0.39 },
      { x: 0, y: 0, scale: 0.7, rotate: 0, delay: 0.42 },
      { x: 0, y: 0, scale: 0.7, rotate: 0, delay: 0.45 },
      { x: 0, y: 0, scale: 0.7, rotate: 0, delay: 0.48 },
      { x: 0, y: 0, scale: 0.7, rotate: 0, delay: 0.51 },
      { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.54 },
    ];
  } else if (width < 900) {
    // Tablet
    return [
      { x: -120, y: -80, scale: 0.85, rotate: -12, delay: 0.05 },
      { x: 0, y: -140, scale: 0.85, rotate: 10, delay: 0.1 },
      { x: 120, y: -60, scale: 0.85, rotate: 16, delay: 0.15 },
      { x: -140, y: 80, scale: 0.85, rotate: -10, delay: 0.18 },
      { x: 140, y: 120, scale: 0.85, rotate: 12, delay: 0.22 },
      { x: -80, y: 160, scale: 0.85, rotate: 8, delay: 0.25 },
      { x: 80, y: 180, scale: 0.85, rotate: -8, delay: 0.28 },
      { x: 0, y: 200, scale: 0.85, rotate: 0, delay: 0.3 },
      { x: 160, y: -120, scale: 0.85, rotate: 18, delay: 0.33 },
      { x: -160, y: 0, scale: 0.85, rotate: -16, delay: 0.36 },
      { x: 120, y: 160, scale: 0.85, rotate: 12, delay: 0.39 },
      { x: 0, y: 0, scale: 0.85, rotate: 0, delay: 0.42 },
      { x: 0, y: 0, scale: 0.85, rotate: 0, delay: 0.45 },
      { x: 0, y: 0, scale: 0.85, rotate: 0, delay: 0.48 },
      { x: 0, y: 0, scale: 0.85, rotate: 0, delay: 0.51 },
      { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.54 },
    ];
  }
  // Desktop (default)
  return [
    { x: -200, y: -120, scale: 1, rotate: -15, delay: 0.05 },
    { x: 0, y: -220, scale: 1, rotate: 12, delay: 0.1 },
    { x: 200, y: -100, scale: 1, rotate: 20, delay: 0.15 },
    { x: -220, y: 120, scale: 1, rotate: -12, delay: 0.18 },
    { x: 220, y: 180, scale: 1, rotate: 15, delay: 0.22 },
    { x: -120, y: 240, scale: 1, rotate: 10, delay: 0.25 },
    { x: 120, y: 260, scale: 1, rotate: -10, delay: 0.28 },
    { x: 0, y: 280, scale: 1, rotate: 0, delay: 0.3 },
    { x: 240, y: -180, scale: 1, rotate: 22, delay: 0.33 },
    { x: -240, y: 0, scale: 1, rotate: -20, delay: 0.36 },
    { x: 200, y: 240, scale: 1, rotate: 15, delay: 0.39 },
    { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.42 },
    { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.45 },
    { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.48 },
    { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.51 },
    { x: 0, y: 0, scale: 1, rotate: 0, delay: 0.54 },
  ];
};

function useWindowWidth() {
  const [width, setWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

export default function FrontpageHero() {
  const width = useWindowWidth();
  const animConfigs = useMemo(() => getAnimConfigs(width), [width]);
  const { scrollY } = useViewportScroll();
  const scrollRange = [0, 400];

  return (
    <section className={styles.heroSection} style={{ height: width < 600 ? 420 : width < 900 ? 520 : 568 }}>
      <div className={styles.heroContainer}>
        {/* Animated Images */}
        {images.map((img, i) => {
          const cfg = animConfigs[i] || { x: 0, y: 0, scale: 1, rotate: 0, delay: 0 };
          // Parallax on scroll
          const y = useTransform(scrollY, scrollRange, [0, cfg.y]);
          const x = useTransform(scrollY, scrollRange, [0, cfg.x]);
          const rotate = useTransform(scrollY, scrollRange, [0, cfg.rotate]);
          const scale = useTransform(scrollY, scrollRange, [cfg.scale, cfg.scale]);

          // Special style for Gridbkg.png
          if (img === 'Gridbkg.png') {
            return (
              <motion.img
                key={img}
                src={`/heroanim/Q10QuentifyEXPERIMENT4.hyperesources/${img}`}
                alt={img.replace('.png', '')}
                style={{
                  position: 'absolute',
                  top: 67,
                  left: 78,
                  width: 1019,
                  height: 667,
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                  padding: 0,
                  verticalAlign: 'baseline',
                  fontWeight: 400,
                  zIndex: 2 + i,
                  pointerEvents: 'none',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: cfg.delay, duration: 1.1 }}
                loading="lazy"
              />
            );
          }

          return (
            <motion.img
              key={img}
              src={`/heroanim/Q10QuentifyEXPERIMENT4.hyperesources/${img}`}
              alt={img.replace('.png', '')}
              className={styles.heroImage}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                y,
                x,
                rotate,
                scale,
                willChange: 'transform',
                zIndex: 2 + i,
                pointerEvents: 'none',
              }}
              initial={{
                y: cfg.y,
                x: cfg.x,
                rotate: cfg.rotate,
                scale: 0.2,
                opacity: 0,
              }}
              animate={{
                y: 0,
                x: 0,
                rotate: 0,
                scale: cfg.scale,
                opacity: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 70,
                damping: 14,
                delay: cfg.delay,
                duration: 1.1,
                bounce: 0.45,
              }}
              loading="lazy"
            />
          );
        })}
        {/* Hero Message Centered Above Images */}
        <div className={styles.heroMessage}>
          <h1 className={styles.heroHeadline}>Better Experiences. Real Results.</h1>
          <p className={styles.heroSubheadline}>Where business needs and user needs align, every click is a step toward success.</p>
          <a href="#portfolio" className={styles.heroCTA}>View Portfolio</a>
        </div>
      </div>
    </section>
  );
} 