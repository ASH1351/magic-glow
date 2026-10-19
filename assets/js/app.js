/**
 * MAGIC GLOW - Interactive Application Engine
 * Pure Vanilla ES6+ - Fast, Accessible, High Performance
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // STATE STORE (Persisted to localStorage)
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    CART: 'magic_glow_cart_v1',
    WISHLIST: 'magic_glow_wishlist_v1',
    COUPON: 'magic_glow_coupon_v1'
  };

  const state = {
    cart: JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]'),
    wishlist: JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST) || '[]'),
    appliedCoupon: localStorage.getItem(STORAGE_KEYS.COUPON) || null,
    discountRate: 0.10, // 10% off for GLOW10
    freeShippingThreshold: 999,
    currentFilter: 'all',
    selectedSkinType: 'Combination',
    selectedConcerns: ['Dullness', 'Pigmentation'],
    activeModalProduct: null
  };

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist));
    if (state.appliedCoupon) {
      localStorage.setItem(STORAGE_KEYS.COUPON, state.appliedCoupon);
    } else {
      localStorage.removeItem(STORAGE_KEYS.COUPON);
    }
  }

  // --------------------------------------------------------------------------
  // DOM UTILITIES & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  function showToast(message, icon = 'fa-sparkles') {
    let toast = $('#toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: #FFD700;"></i> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 1. PRELOADER & LINE-ART DRAWING
  // --------------------------------------------------------------------------
  function initPreloader() {
    const preloader = $('#preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.add('site-loaded');
        // Trigger subtle entrance animations
      }, 1600);
    });

    // Safety fallback
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('preloader-hidden')) {
        preloader.classList.add('preloader-hidden');
      }
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER & MOBILE MENU
  // --------------------------------------------------------------------------
  function initHeader() {
    const header = $('.site-header');
    const hamburger = $('#hamburgerBtn');
    const mobileOverlay = $('#mobileNavOverlay');
    const mobileClose = $('#mobileNavClose');
    const mobileLinks = $$('.mobile-nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    function toggleMenu() {
      const isOpen = mobileOverlay?.classList.contains('open');
      if (isOpen) {
        mobileOverlay?.classList.remove('open');
        hamburger?.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileOverlay?.classList.add('open');
        hamburger?.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    hamburger?.addEventListener('click', toggleMenu);
    mobileClose?.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay?.classList.remove('open');
        hamburger?.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. DESKTOP CUSTOM CURSOR
  // --------------------------------------------------------------------------
  function initCustomCursor() {
    if (window.matchMedia('(max-width: 1024px)').matches || window.matchMedia('(hover: none)').matches) {
      return;
    }

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Hover effect on interactable elements
    const interactiveSelectors = 'a, button, input, select, .product-card, .category-card, .quiz-option-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.remove('cursor-hover');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. RENDER CATEGORIES
  // --------------------------------------------------------------------------
  function renderCategories() {
    const grid = $('#categoriesGrid');
    if (!grid || typeof CATEGORIES_DATA === 'undefined') return;

    grid.innerHTML = CATEGORIES_DATA.map(cat => `
      <a href="#productsSection" class="category-card" data-category="${cat.id}">
        <div class="category-circle-frame">
          <div class="category-circle-inner">
            <i class="fa-solid ${cat.icon} category-icon"></i>
          </div>
        </div>
        <h4 class="category-name">${cat.name}</h4>
        <span class="category-item-count">${cat.count} Ritual</span>
      </a>
    `).join('');

    // Clicking category filters products
    $$('.category-card', grid).forEach(card => {
      card.addEventListener('click', (e) => {
        const catId = card.getAttribute('data-category');
        filterProductsByCategory(catId);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. RENDER PRODUCTS & FILTERS
  // --------------------------------------------------------------------------
  function renderProducts(filter = 'all') {
    const grid = $('#productsGrid');
    if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

    let filtered = PRODUCTS_DATA;
    if (filter !== 'all') {
      filtered = PRODUCTS_DATA.filter(p => {
        if (filter === 'serums-creams') return p.filterTag === 'serums-creams';
        if (filter === 'cleansers-toners') return p.filterTag === 'cleansers-toners';
        if (filter === 'masks-scrubs') return p.filterTag === 'masks-scrubs';
        if (filter === 'combos') return p.filterTag === 'combos';
        return p.categorySlug === filter;
      });
    }

    grid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.some(item => item.id === product.id);
      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-image-box">
            ${product.badge ? `<span class="product-badge-tag">${product.badge}</span>` : ''}
            <button class="product-wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Add to Wishlist">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src=getFallbackProductSVG('${product.category}', '${product.name}')">
            <div class="product-quick-view-overlay">
              <button class="quick-view-btn" data-id="${product.id}">
                <i class="fa-solid fa-eye"></i> Quick View
              </button>
            </div>
          </div>
          <div class="product-info-box">
            <span class="product-cat-label">${product.category}</span>
            <h3 class="product-name-link" data-id="${product.id}">${product.name}</h3>
            <p class="product-benefit-brief">${product.shortBenefit}</p>
            <div class="product-rating-row">
              <div class="stars-gold">
                ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
                ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
              </div>
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>
            <div class="product-price-row">
              <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
              <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
              <span class="discount-pill">${product.discount}</span>
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
              <i class="fa-solid fa-bag-shopping"></i> Add To Cart
            </button>
          </div>
        </article>
      `;
    }).join('');

    bindProductEvents();
  }

  function filterProductsByCategory(catSlug) {
    state.currentFilter = catSlug;
    renderProducts(catSlug);

    // Update active tab UI if matched
    $$('.filter-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === catSlug);
    });

    const section = $('#productsSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function initProductFilters() {
    const tabs = $$('.filter-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        renderProducts(filter);
      });
    });
  }

  function bindProductEvents() {
    // Quick View click
    $$('.quick-view-btn, .product-name-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        openProductModal(id);
      });
    });

    // Add to Cart click
    $$('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });

    // Wishlist toggle
    $$('.product-wishlist-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleWishlist(id, btn);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. CART MANAGEMENT & SLIDE-IN DRAWER
  // --------------------------------------------------------------------------
  function addToCart(productId, size = null, quantity = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const chosenSize = size || (product.sizes ? product.sizes.find(s => s.default)?.size || product.sizes[0].size : product.volume);
    const chosenPrice = (product.sizes && size) ? (product.sizes.find(s => s.size === size)?.price || product.price) : product.price;

    const existingIndex = state.cart.findIndex(item => item.id === productId && item.size === chosenSize);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: chosenPrice,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        size: chosenSize,
        quantity: quantity
      });
    }

    saveState();
    updateCartUI();
    openCartDrawer();
    showToast(`Added "${product.name}" to your Cart`, 'fa-bag-shopping');
  }

  function removeFromCart(index) {
    if (state.cart[index]) {
      const removed = state.cart.splice(index, 1)[0];
      saveState();
      updateCartUI();
      showToast(`Removed "${removed.name}"`, 'fa-trash');
    }
  }

  function updateCartQty(index, delta) {
    if (!state.cart[index]) return;
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      removeFromCart(index);
    } else {
      saveState();
      updateCartUI();
    }
  }

  function updateCartUI() {
    // Badges count
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    $$('.cart-count-badge').forEach(b => b.textContent = totalCount);

    const cartList = $('#cartItemsList');
    const emptyBox = $('#cartEmptyState');
    const footer = $('#cartDrawerFooter');
    const shippingProgress = $('#freeShippingProgress');
    const shippingText = $('#freeShippingText');

    if (!cartList) return;

    if (state.cart.length === 0) {
      cartList.innerHTML = '';
      if (emptyBox) emptyBox.style.display = 'block';
      if (footer) footer.style.display = 'none';
      if (shippingProgress) shippingProgress.style.width = '0%';
      if (shippingText) shippingText.innerHTML = `Add items to enjoy <strong>FREE Luxury Delivery</strong> above ₹${state.freeShippingThreshold}!`;
      return;
    }

    if (emptyBox) emptyBox.style.display = 'none';
    if (footer) footer.style.display = 'block';

    // Subtotal
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = state.appliedCoupon ? Math.round(subtotal * state.discountRate) : 0;
    const finalTotal = subtotal - discountAmount;

    // Free shipping calculation
    const remainingForFree = state.freeShippingThreshold - subtotal;
    const progressPct = Math.min(100, Math.round((subtotal / state.freeShippingThreshold) * 100));

    if (shippingProgress) shippingProgress.style.width = `${progressPct}%`;
    if (shippingText) {
      if (remainingForFree <= 0) {
        shippingText.innerHTML = `<span style="color: #4ade80;">✦ Congratulations! You unlocked <strong>FREE Luxury Shipping</strong>!</span>`;
      } else {
        shippingText.innerHTML = `Add <strong>₹${remainingForFree.toLocaleString('en-IN')}</strong> more for <strong>FREE Luxury Shipping</strong>!`;
      }
    }

    // Render cart items
    cartList.innerHTML = state.cart.map((item, index) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src=getFallbackProductSVG('${item.category}', '${item.name}')">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <span style="font-size: 0.72rem; color: var(--gold-highlight);">${item.size}</span>
          <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          <div class="cart-qty-ctrls">
            <button class="qty-btn" onclick="window.magicGlow.updateCartQty(${index}, -1)" aria-label="Decrease quantity">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="window.magicGlow.updateCartQty(${index}, 1)" aria-label="Increase quantity">+</button>
            <button class="cart-item-remove" onclick="window.magicGlow.removeFromCart(${index})" aria-label="Remove item">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Summary lines
    const subtotalEl = $('#cartSubtotalVal');
    const discountEl = $('#cartDiscountVal');
    const totalEl = $('#cartTotalVal');

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (discountEl) {
      const discountRow = $('#cartDiscountRow');
      if (state.appliedCoupon) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
  }

  function openCartDrawer() {
    $('#drawerBackdrop')?.classList.add('active');
    $('#cartDrawer')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAllDrawers() {
    $('#drawerBackdrop')?.classList.remove('active');
    $('#cartDrawer')?.classList.remove('open');
    $('#wishlistDrawer')?.classList.remove('open');
    $('#productModal')?.classList.remove('active');
    $('#searchModal')?.classList.remove('active');
    $('#checkoutModal')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 7. WISHLIST MANAGEMENT
  // --------------------------------------------------------------------------
  function toggleWishlist(productId, buttonEl = null) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const index = state.wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast(`Removed from Wishlist`, 'fa-heart');
      if (buttonEl) {
        buttonEl.classList.remove('active');
        const icon = $('i', buttonEl);
        if (icon) icon.className = 'fa-regular fa-heart';
      }
    } else {
      state.wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
      showToast(`Saved "${product.name}" to Wishlist!`, 'fa-heart');
      if (buttonEl) {
        buttonEl.classList.add('active');
        const icon = $('i', buttonEl);
        if (icon) icon.className = 'fa-solid fa-heart';
      }
    }

    saveState();
    updateWishlistUI();
  }

  function updateWishlistUI() {
    $$('.wishlist-count-badge').forEach(b => b.textContent = state.wishlist.length);

    const list = $('#wishlistItemsList');
    const emptyBox = $('#wishlistEmptyState');
    if (!list) return;

    if (state.wishlist.length === 0) {
      list.innerHTML = '';
      if (emptyBox) emptyBox.style.display = 'block';
      return;
    }

    if (emptyBox) emptyBox.style.display = 'none';

    list.innerHTML = state.wishlist.map((item, index) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src=getFallbackProductSVG('${item.category}', '${item.name}')">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div style="display: flex; gap: 10px; margin-top: 8px;">
            <button class="btn btn-gold btn-sm" onclick="window.magicGlow.moveWishlistToCart('${item.id}', ${index})" style="padding: 6px 14px; font-size: 0.7rem;">
              <i class="fa-solid fa-bag-shopping"></i> Move To Cart
            </button>
            <button class="cart-item-remove" onclick="window.magicGlow.removeFromWishlist(${index})">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function moveWishlistToCart(productId, index) {
    addToCart(productId);
    state.wishlist.splice(index, 1);
    saveState();
    updateWishlistUI();
  }

  function removeFromWishlist(index) {
    state.wishlist.splice(index, 1);
    saveState();
    updateWishlistUI();
    showToast('Removed from Wishlist');
  }

  function openWishlistDrawer() {
    $('#drawerBackdrop')?.classList.add('active');
    $('#wishlistDrawer')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // --------------------------------------------------------------------------
  // 8. QUICK VIEW & PRODUCT DETAIL MODAL
  // --------------------------------------------------------------------------
  function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    state.activeModalProduct = product;
    const modal = $('#productModal');
    if (!modal) return;

    // Set content
    $('#modalProductImage').src = product.image;
    $('#modalProductImage').alt = product.name;
    $('#modalProductCategory').textContent = product.category;
    $('#modalProductName').textContent = product.name;
    $('#modalProductSubtitle').textContent = product.subtitle;
    $('#modalProductPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    $('#modalProductOriginalPrice').textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;
    $('#modalProductDiscount').textContent = product.discount;
    $('#modalProductDescription').textContent = product.description;

    // Sizes
    const sizesContainer = $('#modalSizeOptions');
    if (sizesContainer && product.sizes) {
      sizesContainer.innerHTML = product.sizes.map((s, idx) => `
        <button class="size-option-btn ${s.default ? 'selected' : ''}" data-size="${s.size}" data-price="${s.price}">
          ${s.size}
        </button>
      `).join('');

      $$('.size-option-btn', sizesContainer).forEach(btn => {
        btn.addEventListener('click', () => {
          $$('.size-option-btn', sizesContainer).forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          const newPrice = Number(btn.getAttribute('data-price'));
          $('#modalProductPrice').textContent = `₹${newPrice.toLocaleString('en-IN')}`;
        });
      });
    }

    // Benefits list
    const benefitsList = $('#modalProductBenefits');
    if (benefitsList && product.benefits) {
      benefitsList.innerHTML = product.benefits.map(b => `
        <li style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; font-size: 0.82rem; color: var(--text-ivory);">
          <i class="fa-solid fa-sparkles" style="color: var(--gold-highlight); margin-top: 4px;"></i>
          <span>${b}</span>
        </li>
      `).join('');
    }

    // Active Ingredients
    const activesBox = $('#modalProductActives');
    if (activesBox && product.activeIngredients) {
      activesBox.innerHTML = product.activeIngredients.map(ing => `
        <span class="ingredient-chip"><i class="fa-solid fa-leaf"></i> ${ing}</span>
      `).join('');
    }

    // How to Use
    const ritualList = $('#modalProductHowTo');
    if (ritualList && product.howToUse) {
      ritualList.innerHTML = product.howToUse.map((step, i) => `
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">
          <strong style="color: var(--gold-highlight);">Phase 0${i + 1}:</strong> ${step}
        </div>
      `).join('');
    }

    // Gallery thumbnails
    const thumbsRow = $('#modalThumbnailsRow');
    if (thumbsRow && product.gallery) {
      thumbsRow.innerHTML = product.gallery.map((img, i) => `
        <div class="modal-thumb ${i === 0 ? 'active' : ''}" data-img="${img}">
          <img src="${img}" alt="Thumbnail ${i}">
        </div>
      `).join('');

      $$('.modal-thumb', thumbsRow).forEach(thumb => {
        thumb.addEventListener('click', () => {
          $$('.modal-thumb', thumbsRow).forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          $('#modalProductImage').src = thumb.getAttribute('data-img');
        });
      });
    }

    // Modal Add To Cart button
    const modalAddBtn = $('#modalAddToCartBtn');
    if (modalAddBtn) {
      modalAddBtn.onclick = () => {
        const activeSizeBtn = $('.size-option-btn.selected', sizesContainer);
        const selectedSize = activeSizeBtn ? activeSizeBtn.getAttribute('data-size') : product.volume;
        addToCart(product.id, selectedSize, 1);
        closeAllDrawers();
      };
    }

    // Modal Buy Now button
    const modalBuyBtn = $('#modalBuyNowBtn');
    if (modalBuyBtn) {
      modalBuyBtn.onclick = () => {
        const activeSizeBtn = $('.size-option-btn.selected', sizesContainer);
        const selectedSize = activeSizeBtn ? activeSizeBtn.getAttribute('data-size') : product.volume;
        addToCart(product.id, selectedSize, 1);
        closeAllDrawers();
        openCheckoutModal();
      };
    }

    // Show modal
    $('#drawerBackdrop')?.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // --------------------------------------------------------------------------
  // 9. FIND YOUR ROUTINE (INTERACTIVE ENGINE)
  // --------------------------------------------------------------------------
  function initRoutineEngine() {
    const skinTypeBtns = $$('.skin-type-option');
    const concernBtns = $$('.concern-option');
    const generateBtn = $('#generateRoutineBtn');

    skinTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        skinTypeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedSkinType = btn.getAttribute('data-type');
        computeRoutine();
      });
    });

    concernBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        const concern = btn.getAttribute('data-concern');
        if (state.selectedConcerns.includes(concern)) {
          state.selectedConcerns = state.selectedConcerns.filter(c => c !== concern);
        } else {
          state.selectedConcerns.push(concern);
        }
        computeRoutine();
      });
    });

    generateBtn?.addEventListener('click', () => {
      computeRoutine();
      $('#routineResultPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('Customized Gold Ritual Generated!');
    });

    // Initial calculation
    computeRoutine();
  }

  function computeRoutine() {
    // Select curated products based on selections
    const morningIds = ['mg-01', 'mg-03', 'mg-04', 'mg-06', 'mg-09'];
    const nightIds = ['mg-02', 'mg-03', 'mg-05', 'mg-07'];

    const morningProducts = morningIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
    const nightProducts = nightIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);

    const morningList = $('#morningRoutineList');
    const nightList = $('#nightRoutineList');

    if (morningList) {
      morningList.innerHTML = morningProducts.map(p => `
        <div class="timeline-step-card">
          <img src="${p.image}" alt="${p.name}" class="timeline-step-img" onerror="this.src=getFallbackProductSVG('${p.category}', '${p.name}')">
          <div class="timeline-step-info">
            <span class="timeline-step-tag">${p.routineStep}</span>
            <h5 class="timeline-step-name">${p.name}</h5>
            <span class="timeline-step-price">₹${p.price.toLocaleString('en-IN')}</span>
          </div>
          <button class="btn btn-outline-gold btn-sm" onclick="window.magicGlow.addToCart('${p.id}')" style="padding: 6px 12px; font-size: 0.72rem;">
            + Add
          </button>
        </div>
      `).join('');
    }

    if (nightList) {
      nightList.innerHTML = nightProducts.map(p => `
        <div class="timeline-step-card">
          <img src="${p.image}" alt="${p.name}" class="timeline-step-img" onerror="this.src=getFallbackProductSVG('${p.category}', '${p.name}')">
          <div class="timeline-step-info">
            <span class="timeline-step-tag">${p.routineStep}</span>
            <h5 class="timeline-step-name">${p.name}</h5>
            <span class="timeline-step-price">₹${p.price.toLocaleString('en-IN')}</span>
          </div>
          <button class="btn btn-outline-gold btn-sm" onclick="window.magicGlow.addToCart('${p.id}')" style="padding: 6px 12px; font-size: 0.72rem;">
            + Add
          </button>
        </div>
      `).join('');
    }

    // Bundle CTA
    const allUnique = Array.from(new Set([...morningProducts, ...nightProducts]));
    const totalOriginal = allUnique.reduce((s, p) => s + p.price, 0);
    const bundledPrice = Math.round(totalOriginal * 0.85); // 15% discount for full routine bundle
    const savings = totalOriginal - bundledPrice;

    const bundleTotalEl = $('#routineBundleTotal');
    const bundleSavingsEl = $('#routineBundleSavings');
    const addAllBtn = $('#addAllRoutineBtn');

    if (bundleTotalEl) bundleTotalEl.textContent = `₹${bundledPrice.toLocaleString('en-IN')}`;
    if (bundleSavingsEl) bundleSavingsEl.textContent = `Save ₹${savings.toLocaleString('en-IN')} (15% OFF)`;

    if (addAllBtn) {
      addAllBtn.onclick = () => {
        allUnique.forEach(p => addToCart(p.id));
        showToast(`Added entire 7-piece custom ritual to your cart!`, 'fa-crown');
      };
    }
  }

  // --------------------------------------------------------------------------
  // 10. BEFORE / AFTER COMPARISON SLIDER
  // --------------------------------------------------------------------------
  function initComparisonSlider() {
    const container = $('#comparisonSlider');
    const afterImage = $('#comparisonAfterImg');
    const handleLine = $('#comparisonHandleLine');
    if (!container || !afterImage || !handleLine) return;

    let isDragging = false;

    function updateSlider(xPos) {
      const rect = container.getBoundingClientRect();
      let pos = (xPos - rect.left) / rect.width;
      pos = Math.max(0.02, Math.min(0.98, pos));
      const pct = pos * 100;

      afterImage.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
      handleLine.style.left = `${pct}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // --------------------------------------------------------------------------
  // 11. LIVE SEARCH MODAL
  // --------------------------------------------------------------------------
  function initSearch() {
    const searchModal = $('#searchModal');
    const searchInput = $('#searchInputField');
    const searchResults = $('#searchResultsList');
    const searchTriggers = $$('.search-trigger-btn');

    searchTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        $('#drawerBackdrop')?.classList.add('active');
        searchModal?.classList.add('active');
        searchInput?.focus();
        document.body.style.overflow = 'hidden';
      });
    });

    // Keyboard shortcut '/' or 'Ctrl+K'
    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' && document.activeElement.tagName !== 'INPUT') || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        $('#drawerBackdrop')?.classList.add('active');
        searchModal?.classList.add('active');
        searchInput?.focus();
        document.body.style.overflow = 'hidden';
      }
      if (e.key === 'Escape') {
        closeAllDrawers();
      }
    });

    searchInput?.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!searchResults) return;

      if (!query) {
        searchResults.innerHTML = `
          <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.85rem;">
            Type a skin concern, ingredient (e.g. "Vitamin C", "24K Gold"), or product name...
          </div>
        `;
        return;
      }

      const matches = PRODUCTS_DATA.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.activeIngredients.some(ing => ing.toLowerCase().includes(query)) ||
        p.suitableFor.some(s => s.toLowerCase().includes(query))
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `
          <div style="text-align: center; padding: 24px; color: var(--text-muted);">
            No luxury rituals match "${query}". Try "Serum", "Gold", or "Cream".
          </div>
        `;
        return;
      }

      searchResults.innerHTML = matches.map(p => `
        <div class="cart-item-row" style="cursor: pointer;" onclick="window.magicGlow.openProductModal('${p.id}')">
          <img src="${p.image}" alt="${p.name}" class="cart-item-img" onerror="this.src=getFallbackProductSVG('${p.category}', '${p.name}')">
          <div class="cart-item-details">
            <span style="font-size: 0.68rem; color: var(--gold-highlight); text-transform: uppercase;">${p.category}</span>
            <h4 class="cart-item-name">${p.name}</h4>
            <div class="cart-item-price">₹${p.price.toLocaleString('en-IN')}</div>
          </div>
          <button class="btn btn-gold btn-sm" onclick="event.stopPropagation(); window.magicGlow.addToCart('${p.id}');" style="padding: 6px 14px; font-size: 0.72rem; align-self: center;">
            Add
          </button>
        </div>
      `).join('');
    });
  }

  // --------------------------------------------------------------------------
  // 12. CHECKOUT MODAL & ORDER CELEBRATION
  // --------------------------------------------------------------------------
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast('Your cart is empty! Add products to proceed.', 'fa-bag-shopping');
      return;
    }

    const modal = $('#checkoutModal');
    if (!modal) return;

    // Compute checkout totals
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = state.appliedCoupon ? Math.round(subtotal * state.discountRate) : 0;
    const finalTotal = subtotal - discount;

    $('#checkoutSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    $('#checkoutDiscount').textContent = discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '₹0';
    $('#checkoutFinalTotal').textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

    $('#drawerBackdrop')?.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function initCheckout() {
    const checkoutForm = $('#checkoutForm');
    const proceedCheckoutBtn = $('#proceedToCheckoutBtn');

    proceedCheckoutBtn?.addEventListener('click', () => {
      closeAllDrawers();
      openCheckoutModal();
    });

    checkoutForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = $('#placeOrderBtn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Confirming Royal Order...`;
      }

      setTimeout(() => {
        const orderId = 'MG-' + Math.floor(100000 + Math.random() * 900000);
        
        // Show celebration
        const content = $('#checkoutContent');
        if (content) {
          content.innerHTML = `
            <div style="text-align: center; padding: 40px 10px;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--gold-gradient); color: #000; font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; box-shadow: var(--gold-glow-md);">
                <i class="fa-solid fa-check"></i>
              </div>
              <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--gold-shimmer); margin-bottom: 12px;">Your Royal Order Is Confirmed</h2>
              <p style="color: var(--text-ivory); margin-bottom: 8px;">Order Reference: <strong style="color: var(--gold-highlight);">${orderId}</strong></p>
              <p style="color: var(--text-muted); font-size: 0.88rem; max-width: 440px; margin: 0 auto 28px auto; line-height: 1.6;">
                Thank you for choosing Magic Glow. Our master alchemists are hand-packaging your 24K rituals with gold ribbon and velvet seal. We will dispatch via Express Air.
              </p>
              <button class="btn btn-gold" onclick="window.magicGlow.resetAfterOrder()">
                Continue Shopping
              </button>
            </div>
          `;
        }

        // Clear cart
        state.cart = [];
        saveState();
        updateCartUI();
        showToast('Order Placed Successfully! ✦ Awaken Your Glow', 'fa-crown');
      }, 1500);
    });
  }

  function resetAfterOrder() {
    closeAllDrawers();
    window.location.reload();
  }

  // --------------------------------------------------------------------------
  // 13. PROMO CODE ENGINE
  // --------------------------------------------------------------------------
  function initPromoCode() {
    const promoInput = $('#promoCodeInput');
    const promoBtn = $('#applyPromoBtn');

    promoBtn?.addEventListener('click', () => {
      const code = promoInput?.value.trim().toUpperCase();
      if (!code) return;

      if (code === 'GLOW10' || code === 'WELCOME10') {
        state.appliedCoupon = code;
        saveState();
        updateCartUI();
        showToast(`Promo "${code}" applied: 10% Gold Club discount unlocked!`, 'fa-tag');
        if (promoInput) promoInput.value = '';
      } else {
        showToast('Invalid luxury coupon code. Try "GLOW10".', 'fa-circle-xmark');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 14. NEWSLETTER / GLOW CLUB
  // --------------------------------------------------------------------------
  function initNewsletter() {
    const form = $('#newsletterForm');
    const input = $('#newsletterEmail');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input?.value.trim();
      if (!email) return;

      showToast(`Welcome to the Glow Club! Use code GLOW10 for 10% off.`, 'fa-sparkles');
      form.innerHTML = `
        <div style="padding: 16px; border-radius: 12px; background: rgba(212, 175, 55, 0.12); border: 1px solid var(--gold-highlight); color: var(--gold-shimmer); font-size: 0.95rem;">
          <i class="fa-solid fa-crown" style="color: #FFD700; margin-right: 8px;"></i>
          <strong>Welcome to the Glow Club!</strong> Your exclusive 10% privilege code is: <span style="font-family: monospace; background: #000; padding: 4px 10px; border-radius: 4px; border: 1px solid var(--gold-primary); color: #FFE27A; letter-spacing: 0.1em; margin-left: 6px;">GLOW10</span>
        </div>
      `;
    });
  }

  // --------------------------------------------------------------------------
  // 15. WHATSAPP CONCIERGE
  // --------------------------------------------------------------------------
  function initWhatsApp() {
    const btn = $('#whatsappConciergeBtn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent("Hello Magic Glow! I'd love a personalized skincare recommendation for my skin.");
      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    });
  }

  // --------------------------------------------------------------------------
  // GLOBAL EXPORTS & INITIALIZATION
  // --------------------------------------------------------------------------
  window.magicGlow = {
    addToCart,
    removeFromCart,
    updateCartQty,
    openCartDrawer,
    openWishlistDrawer,
    toggleWishlist,
    moveWishlistToCart,
    removeFromWishlist,
    openProductModal,
    openCheckoutModal,
    resetAfterOrder,
    closeAllDrawers,
    showToast
  };

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeader();
    initCustomCursor();
    renderCategories();
    renderProducts();
    initProductFilters();
    initRoutineEngine();
    initComparisonSlider();
    initSearch();
    initCheckout();
    initPromoCode();
    initNewsletter();
    initWhatsApp();
    updateCartUI();
    updateWishlistUI();

    // Drawer backdrop close
    $('#drawerBackdrop')?.addEventListener('click', closeAllDrawers);
    $$('.drawer-close-btn').forEach(btn => btn.addEventListener('click', closeAllDrawers));

    // Header Cart & Wishlist icon buttons
    $('#headerCartBtn')?.addEventListener('click', openCartDrawer);
    $('#headerWishlistBtn')?.addEventListener('click', openWishlistDrawer);
    $('#mobileBottomCartBtn')?.addEventListener('click', openCartDrawer);
    $('#mobileBottomWishlistBtn')?.addEventListener('click', openWishlistDrawer);
    $('#mobileBottomRoutineBtn')?.addEventListener('click', () => {
      $('#routineSection')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize Canvas particle system if canvas is present
    if (window.initGoldParticles && $('#goldParticleCanvas')) {
      window.initGoldParticles('goldParticleCanvas');
    }
  });

})();
