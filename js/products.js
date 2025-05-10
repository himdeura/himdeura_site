document.addEventListener('DOMContentLoaded', function() {
  fetch('products/products.txt')
    .then(response => response.text())
    .then(content => {
      const lines = content.split('\n');
      const comingSoon = lines[0].split('=')[1].trim() === 'true';
      const numTypes = parseInt(lines[1].trim());
      const types = [];
      for (let i = 0; i < numTypes; i++) {
        types.push(lines[i + 2].trim());
      }
      const typesContainer = document.getElementById('product-types');
      if (comingSoon) {
        document.getElementById('products-container').innerHTML = '<div class="coming-soon">COMING SOON</div>';
        typesContainer.innerHTML = '';
        return;
      }
      // Render types as clickable buttons
      typesContainer.innerHTML = `
        <div class="product-types-title">Complete range of:</div>
        <div class="product-types-btns">
          ${types.map((type, idx) =>
            `<button class="product-type-btn" data-type="${type}" ${idx === 0 ? 'data-active="true"' : ''}>${type}</button>`
          ).join('')}
        </div>
      `;
      // Show products of first type by default
      loadProductsOfType(types[0]);
      // Add click handlers
      document.querySelectorAll('.product-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.product-type-btn').forEach(b => b.removeAttribute('data-active'));
          this.setAttribute('data-active', 'true');
          loadProductsOfType(this.getAttribute('data-type'));
        });
      });
    });
});

function loadProductsOfType(typeName) {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = '<div class="loading">Loading products...</div>';
  fetch(`products/${typeName}/content.txt`)
    .then(response => response.text())
    .then(content => {
      const lines = content.split('\n');
      const numProducts = parseInt(lines[0].trim());
      let productsHTML = '';
      for (let i = 0; i < numProducts; i++) {
        const productName = lines[i + 1].trim();
        productsHTML += createProductCard(typeName, productName);
      }
      productsContainer.innerHTML = productsHTML;
      initializeProducts(typeName);
    })
    .catch(error => {
      productsContainer.innerHTML = '<div class="error">No products found for this category.</div>';
    });
}

function createProductCard(typeName, productName) {
  const safeType = typeName.replace(/\s+/g, '-');
  const safeProduct = productName.replace(/\s+/g, '-');
  return `
    <div class="product-card" data-type="${safeType}" data-product="${safeProduct}">
      <div class="product-carousel">
        <div class="carousel-container" id="carousel-${safeType}-${safeProduct}">
          <div class="loading">Loading images...</div>
        </div>
        <button class="carousel-arrow prev" onclick="moveCarousel('${safeType}-${safeProduct}', -1)">❮</button>
        <button class="carousel-arrow next" onclick="moveCarousel('${safeType}-${safeProduct}', 1)">❯</button>
      </div>
      <h2>${productName}</h2>
      <div class="product-description" id="desc-${safeType}-${safeProduct}">Loading description...</div>
    </div>
  `;
}

function initializeProducts(typeName) {
  const safeType = typeName.replace(/\s+/g, '-');
  document.querySelectorAll(`.product-card[data-type="${safeType}"]`).forEach(card => {
    const safeProduct = card.dataset.product;
    // Load description
    fetch(`products/${typeName}/${card.dataset.product.replace(/-/g, ' ')}/description.txt`)
      .then(response => response.text())
      .then(description => {
        document.getElementById(`desc-${safeType}-${safeProduct}`).textContent = description;
      })
      .catch(() => {
        document.getElementById(`desc-${safeType}-${safeProduct}`).textContent = "Description not available.";
      });
    // Load image count
    fetch(`products/${typeName}/${card.dataset.product.replace(/-/g, ' ')}/imagenumber.txt`)
      .then(response => response.text())
      .then(number => {
        const imageCount = parseInt(number.trim());
        loadProductImages(typeName, card.dataset.product.replace(/-/g, ' '), safeType, safeProduct, imageCount);
      })
      .catch(() => {
        loadProductImages(typeName, card.dataset.product.replace(/-/g, ' '), safeType, safeProduct, 1);
      });
  });
}

function loadProductImages(typeName, productName, safeType, safeProduct, imageCount) {
  const carouselContainer = document.getElementById(`carousel-${safeType}-${safeProduct}`);
  carouselContainer.innerHTML = '';
  for (let i = 1; i <= imageCount; i++) {
    const img = document.createElement('img');
    img.src = `products/${typeName}/${productName}/image${i}.png`;
    img.className = i === 1 ? 'active' : '';
    img.alt = `${productName} - Image ${i}`;
    img.onerror = function() {
      this.src = 'placeholder.png';
      this.alt = 'Image not available';
    };
    carouselContainer.appendChild(img);
  }
  if (imageCount === 0) {
    const img = document.createElement('img');
    img.src = 'placeholder.png';
    img.className = 'active';
    img.alt = 'No images available';
    carouselContainer.appendChild(img);
  }
}

window.moveCarousel = function(carouselId, direction) {
  const carousel = document.getElementById(`carousel-${carouselId}`);
  const images = carousel.querySelectorAll('img');
  let currentIndex = 0;
  images.forEach((img, index) => {
    if (img.classList.contains('active')) {
      currentIndex = index;
      img.classList.remove('active');
    }
  });
  let newIndex = (currentIndex + direction) % images.length;
  if (newIndex < 0) newIndex = images.length - 1;
  images[newIndex].classList.add('active');
};
