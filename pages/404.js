import React from 'react';

export default function Custom404() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafbfc',
      color: '#222',
      fontFamily: 'Inter, sans-serif',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" style={{ color: '#0070f3', fontSize: '1.2rem' }}>Go back home</a>
    </div>
  );
} 