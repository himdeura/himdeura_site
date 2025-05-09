// products.js - Place this in your js folder
document.addEventListener('DOMContentLoaded', function() {
    fetch('products/content.txt')
      .then(response => response.text())
      .then(content => {
        const lines = content.split('\n');
        const comingSoon = lines[0].split('=')[1].trim() === 'true';
        const productsContainer = document.getElementById('products-container');
        
        if (comingSoon) {
          // Display coming soon message
          productsContainer.innerHTML = '<div class="coming-soon">COMING SOON</div>';
        } else {
          // Parse and display products
          const numProducts = parseInt(lines[1].trim());
          let productsHTML = '';
          
          for (let i = 0; i < numProducts; i++) {
            const productName = lines[i + 2].trim();
            productsHTML += createProductCard(productName);
          }
          
          productsContainer.innerHTML = productsHTML;
          
          // Initialize products after they are loaded
          initializeProducts();
        }
      })
      .catch(error => {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = 
          '<div class="error">Error loading products. Please try again later.</div>';
      });
  });
  
  function createProductCard(productName) {
    return `
      <div class="product-card" data-product="${productName}">
        <div class="product-carousel">
          <div class="carousel-container" id="carousel-${productName.replace(/\s+/g, '-')}">
            <div class="loading">Loading images...</div>
          </div>
          <button class="carousel-arrow prev" onclick="moveCarousel('${productName.replace(/\s+/g, '-')}', -1)">❮</button>
          <button class="carousel-arrow next" onclick="moveCarousel('${productName.replace(/\s+/g, '-')}', 1)">❯</button>
        </div>
        <h2>${productName}</h2>
        <div class="product-description" id="desc-${productName.replace(/\s+/g, '-')}">Loading description...</div>
      </div>
    `;
  }
  
  function initializeProducts() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      const productName = card.dataset.product;
      const safeProductName = productName.replace(/\s+/g, '-');
      
      // Load description text
      fetch(`products/${productName}/description.txt`)
        .then(response => response.text())
        .then(description => {
          document.getElementById(`desc-${safeProductName}`).textContent = description;
        })
        .catch(error => {
          console.error(`Error loading description for ${productName}:`, error);
          document.getElementById(`desc-${safeProductName}`).textContent = 
            "Description not available.";
        });
      
      // Load the number of images from imagenumber.txt
      fetch(`products/${productName}/imagenumber.txt`)
        .then(response => response.text())
        .then(number => {
          const imageCount = parseInt(number.trim());
          loadProductImages(productName, imageCount);
        })
        .catch(error => {
          console.error(`Error loading image count for ${productName}:`, error);
          // Default to 1 image if imagenumber.txt is missing
          loadProductImages(productName, 1);
        });
    });
  }
  
  function loadProductImages(productName, imageCount) {
    const safeProductName = productName.replace(/\s+/g, '-');
    const carouselContainer = document.getElementById(`carousel-${safeProductName}`);
    carouselContainer.innerHTML = ''; // Clear loading message
    
    // Add all images based on the image count
    for (let i = 1; i <= imageCount; i++) {
      const img = document.createElement('img');
      img.src = `products/${productName}/image${i}.png`;
      img.className = i === 1 ? 'active' : '';
      img.alt = `${productName} - Image ${i}`;
      img.onerror = function() {
        this.src = 'placeholder.png'; // Fallback image
        this.alt = 'Image not available';
      };
      carouselContainer.appendChild(img);
    }
    
    // If no images were added, show a placeholder
    if (imageCount === 0) {
      const img = document.createElement('img');
      img.src = 'placeholder.png';
      img.className = 'active';
      img.alt = 'No images available';
      carouselContainer.appendChild(img);
    }
  }
  
  // This function needs to be global for the onclick handlers
  window.moveCarousel = function(productName, direction) {
    const carousel = document.getElementById(`carousel-${productName}`);
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;
    
    // Find current active image
    images.forEach((img, index) => {
      if (img.classList.contains('active')) {
        currentIndex = index;
        img.classList.remove('active');
      }
    });
    
    // Calculate new index with wrap-around
    let newIndex = (currentIndex + direction) % images.length;
    if (newIndex < 0) newIndex = images.length - 1;
    
    // Activate new image
    images[newIndex].classList.add('active');
  };
  
