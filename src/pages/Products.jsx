import { useState, useEffect, useCallback } from 'react'
import styles from './Products.module.css'

function useProductData() {
  const [types, setTypes] = useState([])
  const [comingSoon, setComingSoon] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/products/products.txt')
      .then(r => r.text())
      .then(text => {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
        const soon = lines[0].split('=')[1].trim() === 'true'
        setComingSoon(soon)
        if (!soon) {
          const numTypes = parseInt(lines[1])
          const list = []
          for (let i = 0; i < numTypes; i++) {
            list.push(lines[i + 2])
          }
          setTypes(list)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { types, comingSoon, loading }
}

function useTypeProducts(typeName) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!typeName) return
    setLoading(true)
    setProducts([])
    fetch(`/products/${typeName}/content.txt`)
      .then(r => r.text())
      .then(text => {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
        const count = parseInt(lines[0])
        const list = []
        for (let i = 0; i < count; i++) list.push(lines[i + 1])
        setProducts(list)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [typeName])

  return { products, loading }
}

function ProductCard({ typeName, productName }) {
  const [images, setImages] = useState([])
  const [desc, setDesc] = useState('')
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch(`/products/${typeName}/${productName}/description.txt`)
      .then(r => r.text())
      .then(setDesc)
      .catch(() => setDesc(''))

    fetch(`/products/${typeName}/${productName}/imagenumber.txt`)
      .then(r => r.text())
      .then(text => {
        const count = parseInt(text.trim()) || 1
        const imgs = []
        for (let i = 1; i <= count; i++) {
          imgs.push(`/products/${typeName}/${productName}/image${i}.png`)
        }
        setImages(imgs)
        setCurrent(0)
      })
      .catch(() => {
        setImages([`/products/${typeName}/${productName}/image1.png`])
      })
  }, [typeName, productName])

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        {images.length > 0 ? (
          <img
            src={images[current]}
            alt={productName}
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
        {images.length > 1 && (
          <>
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev}>‹</button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next}>›</button>
            <div className={styles.dots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{productName}</h3>
        {desc && <p className={styles.cardDesc}>{desc}</p>}
      </div>
    </div>
  )
}

export default function Products() {
  const { types, comingSoon, loading: typesLoading } = useProductData()
  const [activeType, setActiveType] = useState('')

  useEffect(() => {
    if (types.length && !activeType) setActiveType(types[0])
  }, [types, activeType])

  const { products, loading: productsLoading } = useTypeProducts(activeType)

  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className="section-label">What We Offer</p>
          <h1 className={styles.heroTitle}>Our Products</h1>
          <div className={styles.heroDivider} />
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="section-inner">
          {typesLoading ? (
            <div className={styles.loading}>Loading…</div>
          ) : comingSoon ? (
            <div className={styles.comingSoon}>
              <span className={styles.comingSoonIcon}>🚧</span>
              <h2>Products Coming Soon</h2>
              <p>We're preparing our full catalogue. Check back shortly!</p>
            </div>
          ) : (
            <>
              <div className={styles.priceListBar}>
                <span>Need exact codes and MRPs?</span>
                <a
                  href="/Himdeura-Price-List-Jan-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.priceListBtn}
                >
                  Download Full Price List (PDF)
                </a>
              </div>

              {/* Category tabs */}
              <div className={styles.tabs}>
                {types.map(t => (
                  <button
                    key={t}
                    className={`${styles.tab} ${activeType === t ? styles.tabActive : ''}`}
                    onClick={() => setActiveType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Products grid */}
              {productsLoading ? (
                <div className={styles.loading}>Loading products…</div>
              ) : products.length === 0 ? (
                <div className={styles.empty}>No products in this category yet.</div>
              ) : (
                <div className={styles.grid}>
                  {products.map(p => (
                    <ProductCard key={`${activeType}-${p}`} typeName={activeType} productName={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
