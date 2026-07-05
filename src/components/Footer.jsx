import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Himdeura" className={styles.logo} />
          <p className={styles.tagline}>
            House of Premium Bathroom &amp; Kitchen Sanitaryware and Piping Solutions.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/himdeura/" aria-label="Instagram" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          <ul className={styles.colList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <ul className={styles.colList}>
            <li><a href="tel:+919873583535">+91 98735 83535</a></li>
            <li><a href="tel:+919599030433">+91 95990 30433</a></li>
            <li><a href="mailto:info@himdeura.com">info@himdeura.com</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Address</h4>
          <address className={styles.address}>
            1581-A, Khasra No. 32<br />
            Hindon Vihar<br />
            Ghaziabad – 201001<br />
            Uttar Pradesh, India
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Himdeura. All rights reserved.</p>
        <button className={styles.backTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to top
        </button>
      </div>
    </footer>
  )
}
