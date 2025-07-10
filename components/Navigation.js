import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Helper to check if a link is active
  const isActive = (href) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" passHref legacyBehavior>
          <a className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/frontpage/favicons/apple-touch-icon.png" alt="Hunter Stomp Logo" width={36} height={36} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            <span>UX Portfolio for Quentin Little</span>
          </a>
        </Link>
        <button
          className="nav-hamburger"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(m => !m)}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li className={isActive('/') ? 'active' : ''}>
            <Link href="/" legacyBehavior><a style={{ textDecoration: 'none' }}>Home</a></Link>
          </li>
          <li className={isActive('/case-studies') ? 'active' : ''}>
            <Link href="/case-studies" legacyBehavior><a style={{ textDecoration: 'none' }}>Case Studies</a></Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link href="/about" legacyBehavior><a style={{ textDecoration: 'none' }}>About</a></Link>
          </li>
          <li className={isActive('/blog') ? 'active' : ''}>
            <Link href="/blog" legacyBehavior><a style={{ textDecoration: 'none' }}>Blog</a></Link>
          </li>
          <li className={isActive('/contact') ? 'active' : ''}>
            <Link href="/contact" legacyBehavior><a style={{ textDecoration: 'none' }}>Contact</a></Link>
          </li>
        </ul>
        {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />}
      </div>
      <style jsx>{`
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1100;
        }
        .hamburger-bar {
          width: 28px;
          height: 3px;
          background: var(--primary-color);
          margin: 4px 0;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .nav-links {
          display: flex;
          gap: var(--spacing-xl);
          list-style: none;
          font-size: 1.25rem;
        }
        .nav-links a,
        .nav-links a:visited,
        .nav-links a:focus,
        .nav-links a:active {
          text-decoration: none !important;
        }
        .nav-links li.active a {
          font-weight: 700;
          color: var(--primary-color, #2563eb) !important;
          border-bottom: 2px solid var(--primary-color, #2563eb) !important;
          background: rgba(37,99,235,0.07);
        }
        .nav-links li:not(.active) a:hover {
          border-bottom: 2px solid var(--primary-color, #2563eb);
        }
        .nav-links.open {
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          right: 0;
          width: 80vw;
          max-width: 320px;
          height: 100vh;
          background: #fff;
          box-shadow: -2px 0 16px rgba(0,0,0,0.08);
          padding: var(--spacing-2xl) var(--spacing-xl);
          z-index: 1200;
          align-items: flex-start;
          justify-content: flex-start;
          font-size: 1.2rem;
          animation: slideIn 0.3s;
        }
        .nav-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.2);
          z-index: 1199;
        }
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </nav>
  )
} 