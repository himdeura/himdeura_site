import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Certified Quality',
    desc: 'Every product meets rigorous quality standards, engineered for safety, built to last.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Pan-India Supply',
    desc: 'Delivering premium sanitaryware and piping solutions across every corner of India.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Crafted with Passion',
    desc: 'Artisanal craftsmanship meets cutting-edge design and delivers products with love.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>Premium Sanitaryware</span>
          <img src="/hero_logo.png" alt="HIMDEURA" className={styles.heroLogo} />
          <p className={styles.heroTagline}>
            House of Premium Bathroom &amp; Kitchen Sanitaryware<br />
            and Piping Solutions
          </p>
          <div className={styles.heroCtas}>
            <Link to="/products" className="btn-primary">Explore Products</Link>
            <Link to="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to discover</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Features strip */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          {features.map(f => (
            <div key={f.title} className={styles.featureItem}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className={`section ${styles.about}`}>
        <div className="section-inner">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className="section-label">Who We Are</p>
              <h2 className={`section-title ${styles.aboutTitle}`}>
                Elegance Meets<br />Durability
              </h2>
              <div className="divider" />
              <p className={styles.aboutPara}>
                Himdeura operates with the aim of providing a complete range of sanitaryware and
                piping solutions at the best quality and price for customers all over India.
              </p>
              <p className={styles.aboutPara}>
                Aligning to our vision of <strong>healthy living for all</strong>, we showcase
                products of elegance and durability, where artisanal craftsmanship combines with
                the latest technology and design.
              </p>
              <Link to="/about" className={`btn-primary ${styles.aboutBtn}`}>Our Story</Link>
            </div>
            <div className={styles.aboutImageWrap}>
              <img src="/hero.jpg" alt="Premium sanitaryware" className={styles.aboutImage} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Space?</h2>
          <p className={styles.ctaSubtitle}>
            Talk to us about your requirements, and we bring quality products to your doorstep.
          </p>
          <Link to="/contact" className="btn-primary">Contact Us Today</Link>
        </div>
      </section>
    </>
  )
}
