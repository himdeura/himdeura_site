import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <img src="/logo.png" alt="Himdeura" />
        </NavLink>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.barOpen : styles.bar} />
          <span className={menuOpen ? styles.barHidden : styles.bar} />
          <span className={menuOpen ? styles.barOpen2 : styles.bar} />
        </button>
      </div>
    </header>
  )
}
