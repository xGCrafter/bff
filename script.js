document.addEventListener('DOMContentLoaded', function() {
  // Cart state
  let cart = [];
  
  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.backgroundColor = 'transparent';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .catalog-item, .color-option, .dot');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = 'var(--color-accent)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'var(--color-accent)';
      });
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Image slider functionality
  const imageContainers = document.querySelectorAll('.image-container');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.slider-arrow.prev');
  const nextButton = document.querySelector('.slider-arrow.next');
  let currentIndex = 0;
  
  function changeImage(index) {
    imageContainers.forEach(container => container.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    imageContainers[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  let slideInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % imageContainers.length;
    changeImage(nextIndex);
  }, 6000);
  
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      clearInterval(slideInterval);
      const index = parseInt(this.getAttribute('data-index'));
      changeImage(index);
      slideInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % imageContainers.length;
        changeImage(nextIndex);
      }, 6000);
    });
  });
  
  prevButton.addEventListener('click', () => {
    clearInterval(slideInterval);
    let prevIndex = (currentIndex - 1 + imageContainers.length) % imageContainers.length;
    changeImage(prevIndex);
    slideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % imageContainers.length;
      changeImage(nextIndex);
    }, 6000);
  });
  
  nextButton.addEventListener('click', () => {
    clearInterval(slideInterval);
    let nextIndex = (currentIndex + 1) % imageContainers.length;
    changeImage(nextIndex);
    slideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % imageContainers.length;
      changeImage(nextIndex);
    }, 6000);
  });
  
  const slideshowContainer = document.querySelector('.scrolling-section');
  
  slideshowContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slideshowContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % imageContainers.length;
      changeImage(nextIndex);
    }, 6000);
  });
  
  // Navigation buttons
  const navButtons = document.querySelectorAll('.nav-button');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Color options in catalog items
  const colorOptions = document.querySelectorAll('.color-option');
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      const parent = this.closest('.color-options');
      parent.querySelectorAll('.color-option').forEach(opt => {
        opt.style.outline = 'none';
      });
      this.style.outline = '2px solid var(--color-accent)';
      this.style.outlineOffset = '2px';
    });
  });
  
  // Smooth reveal animations on scroll
  const revealElements = document.querySelectorAll('.catalog-item, .category-item, .section-header');
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  window.addEventListener('load', revealOnScroll);
  window.addEventListener('scroll', revealOnScroll);
  
  // Modal management
  const modals = {
    quickView: document.getElementById('quick-view-modal'),
    search: document.getElementById('search-modal'),
    cart: document.getElementById('cart-modal')
  };

  // Initialize all modals as hidden
  function initializeModals() {
    Object.values(modals).forEach(modal => {
      modal.style.display = 'none';
    });
  }

  function closeAllModals() {
    Object.values(modals).forEach(modal => {
      modal.style.display = 'none';
    });
  }

  function openModal(modalKey) {
    closeAllModals();
    modals[modalKey].style.display = 'flex';
  }

  // Call initializeModals to ensure modals are hidden on load
  initializeModals();

  // Quick view modal functionality
  const quickViewClose = document.querySelector('.modal-close');
  const quickViewButtons = document.querySelectorAll('.quick-view');

  quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const catalogItem = this.closest('.catalog-item');
      const imageSrc = catalogItem.querySelector('.catalog-image img').src;
      const title = catalogItem.querySelector('.catalog-info h3').textContent;
      const price = catalogItem.querySelector('.item-price').innerHTML;
      const colors = catalogItem.querySelector('.color-options').innerHTML;

      modals.quickView.querySelector('.modal-image img').src = imageSrc;
      modals.quickView.querySelector('.modal-title').textContent = title;
      modals.quickView.querySelector('.modal-price').innerHTML = price;
      modals.quickView.querySelector('.modal-colors').innerHTML = colors;

      openModal('quickView');
    });
  });

  quickViewClose.addEventListener('click', () => {
    closeAllModals();
  });

  window.addEventListener('click', (e) => {
    if (e.target === modals.quickView) {
      closeAllModals();
    }
  });

  // Add to cart functionality
  const addToCartButton = document.querySelector('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');

  addToCartButton.addEventListener('click', () => {
    const catalogItem = modals.quickView.querySelector('.modal-title').textContent;
    const priceText = modals.quickView.querySelector('.modal-price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

    cart.push({ title: catalogItem, price: price });
    cartCount.textContent = cart.length;
    alert('Item added to cart!');
    closeAllModals();
    updateCartModal();
  });

  // WhatsApp catalog button
  const whatsappButton = document.querySelector('.whatsapp-catalog');
  whatsappButton.addEventListener('click', () => {
    const productTitle = modals.quickView.querySelector('.modal-title').textContent;
    const message = encodeURIComponent(`I'm interested in ${productTitle}. Can you share the catalog?`);
    const phoneNumber = '+919740003659';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    closeAllModals();
  });

  // Search modal functionality
  const searchClose = document.querySelector('.search-modal-close');
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const collections = Array.from(document.querySelectorAll('.catalog-item')).map(item => ({
    title: item.querySelector('.catalog-info h3').textContent,
    element: item
  }));

  searchButton.addEventListener('click', () => {
    openModal('search');
    searchInput.focus();
  });

  searchClose.addEventListener('click', () => {
    closeAllModals();
    searchInput.value = '';
    searchResults.innerHTML = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modals.search) {
      closeAllModals();
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';

    const filteredCollections = collections.filter(collection =>
      collection.title.toLowerCase().includes(query)
    );

    if (filteredCollections.length === 0) {
      searchResults.innerHTML = '<li>No results found</li>';
    } else {
      filteredCollections.forEach(collection => {
        const li = document.createElement('li');
        li.textContent = collection.title;
        li.addEventListener('click', () => {
          collection.element.scrollIntoView({ behavior: 'smooth' });
          closeAllModals();
          searchInput.value = '';
          searchResults.innerHTML = '';
        });
        searchResults.appendChild(li);
      });
    }
  });

  // Cart modal functionality
  const cartClose = document.querySelector('.cart-modal-close');
  const cartButton = document.querySelector('.cart-button');

  cartButton.addEventListener('click', () => {
    updateCartModal();
    openModal('cart');
  });

  cartClose.addEventListener('click', () => {
    closeAllModals();
  });

  window.addEventListener('click', (e) => {
    if (e.target === modals.cart) {
      closeAllModals();
    }
  });

  function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty</p>';
      cartTotal.textContent = 'Total: ₹0';
    } else {
      let total = 0;
      cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <span>${item.title}</span>
          <span>₹${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(div);
        total += item.price;
      });
      cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
    }
  }

  // Checkout button (placeholder)
  const checkoutButton = document.querySelector('.checkout-button');
  checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    closeAllModals();
  });
});