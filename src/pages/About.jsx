import { Link } from 'react-router-dom'
import styles from './About.module.css'

const values = [
  {
    title: 'Quality First',
    desc: 'We source and supply only products that meet our strict quality benchmarks, because your trust is our foundation.',
  },
  {
    title: 'Healthy Living',
    desc: 'Our vision is healthy living for all. Every product we offer is chosen to improve everyday comfort and safety.',
  },
  {
    title: 'Customer as Brand Ambassador',
    desc: 'We believe a satisfied customer is our best marketing. Your experience defines who we are.',
  },
  {
    title: 'Artisanal Craftsmanship',
    desc: 'Himdeura is where traditional craftsmanship meets modern engineering and passion in every piece.',
  },
]

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className="section-label">Our Story</p>
          <h1 className={styles.heroTitle}>About Himdeura</h1>
          <div className={styles.heroDivider} />
        </div>
      </section>

      {/* Mission */}
      <section className={`section ${styles.mission}`}>
        <div className="section-inner">
          <div className={styles.missionGrid}>
            <div>
              <p className="section-label">Who We Are</p>
              <h2 className="section-title">A Brand Built on Trust &amp; Craftsmanship</h2>
              <div className="divider" />
              <p className={styles.para}>
                Himdeura operates with the aim of providing the complete range of sanitaryware
                and piping solutions at the best quality and price for customers all over India.
              </p>
              <p className={styles.para}>
                Aligning to our vision of <strong>healthy living for all</strong>, we sell products
                showcasing elegance and durability. Himdeura is a brand where artisanal
                craftsmanship combines with the latest technology and design to deliver products
                with love.
              </p>
              <p className={styles.para}>
                We value our customers as our <strong>Brand Ambassadors</strong> and are committed
                to serving them with reliable products that are designed with passion.
              </p>
            </div>
            <div className={styles.statsBlock}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>∞</span>
                <span className={styles.statLabel}>Commitment to Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.values}`}>
        <div className="section-inner">
          <div className={styles.valuesHeader}>
            <p className="section-label">What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
            <div className="divider" />
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueNum}>0{i + 1}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Partner with Us</h2>
          <p className={styles.ctaSub}>
            Dealers, distributors, and contractors can reach out to discuss how Himdeura can
            support your projects.
          </p>
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  )
}
