import styles from './Contact.module.css'

const contactItems = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    lines: [
      <a key="1" href="tel:+919873583535">+91 98735 83535</a>,
      <a key="2" href="tel:+919599030433">+91 95990 30433</a>,
    ],
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    lines: [
      <a key="1" href="mailto:info@himdeura.com">info@himdeura.com</a>,
      <a key="2" href="mailto:aryanenterprisesup@gmail.com">aryanenterprisesup@gmail.com</a>,
    ],
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address',
    lines: [
      'Plot No. 1581/A, 1581/B & 1582',
      'Vishwakarma Marg, Hindon Vihar',
      'Ghaziabad – 201003, U.P.',
    ],
  },
]

export default function Contact() {
  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className="section-label">Reach Us</p>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <div className={styles.heroDivider} />
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="section-inner">
          <div className={styles.grid}>
            {/* Contact cards */}
            <div className={styles.infoCol}>
              <p className="section-label">Get in Touch</p>
              <h2 className="section-title" style={{ color: 'var(--navy)' }}>
                We'd Love to Hear From You
              </h2>
              <div className="divider" />
              <p className={styles.subtext}>
                Whether you're a homeowner planning a renovation, a contractor sourcing bulk
                supplies, or a dealer looking to partner, we're here to help.
              </p>

              <div className={styles.contactCards}>
                {contactItems.map(item => (
                  <div key={item.label} className={styles.contactCard}>
                    <div className={styles.contactIcon}>{item.icon}</div>
                    <div>
                      <p className={styles.contactLabel}>{item.label}</p>
                      <div className={styles.contactLines}>
                        {item.lines.map((line, i) => (
                          <span key={i}>{line}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.socials}>
                <p className={styles.socialsLabel}>Follow Us</p>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.instagram.com/himdeura/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialBtn}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                    @himdeura
                  </a>
                  <a href="#" className={styles.socialBtn}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className={styles.mapCol}>
              <div className={styles.mapWrap}>
                <iframe
                  title="Himdeura location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d394.30969491939874!2d77.41473286950335!3d28.67657532202395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQwJzM1LjYiTiA3N8KwMjQnNTQuMyJF!5e1!3m2!1sen!2sin!4v1746808964774!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className={styles.mapCaption}>
                📍 Hindon Vihar, Ghaziabad – 201003
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
