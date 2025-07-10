import React from 'react'

function Error({ statusCode }) {
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
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Something went wrong</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        {statusCode
          ? `An error ${statusCode} occurred on server.`
          : 'An error occurred on client.'}
      </p>
      <a href="/" style={{ color: '#0070f3', fontSize: '1.2rem' }}>Go back home</a>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 