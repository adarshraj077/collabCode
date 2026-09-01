
const Card = ({
  imageSrc = "/coderun.jpg",
  title = "PDF Compilation",
  description = "Compile your LaTeX project in a single click and instantly preview the generated PDF alongside your editor."
  
}) => {
  return (
    <div style={styles.cardContainer}>
      {/* Top Image Box */}
      <div style={styles.imageWrapper}>
        <img src={imageSrc} alt={title} style={styles.image} />
      </div>

      {/* Content Section */}
      <div style={styles.textContainer}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  );
};

import type { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px', // Reduced to make it less of a main focus
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: '4 / 3', // Widescreen ratio to reduce height
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0 0 0',
    gap: '8px',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '500',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  description: {
    color: '#a1a1aa',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    margin: 0,
    fontWeight: '400',
  },
};

export default Card;