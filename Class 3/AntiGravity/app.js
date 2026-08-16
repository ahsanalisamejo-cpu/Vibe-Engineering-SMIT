/**
 * ATELIER SOLE - Physical Store & Footwear Catalog Application Logic
 */

// ==========================================================================
// 1. DATA STORE: FOOTWEAR CATALOG & UPCOMING RELEASES
// ==========================================================================

const SHOES_DATA = [
  {
    id: 'sole-01',
    name: "Nomad Craft Low 'Terracotta'",
    category: 'sneaker',
    availability: 'in-store',
    badge: { text: 'In Store Now', type: 'in-stock' },
    price: 185,
    shelfLocation: 'Rack A-02',
    image: 'assets/images/nomad-classic-sneaker.jpg',
    materials: {
      upper: 'Full-Grain Italian Calfskin & Canvas',
      lining: 'Breathable Organic Cotton & Leather Collar',
      sole: 'Vulcanized Natural Gum Rubber',
      origin: 'Porto, Portugal'
    },
    sizes: [
      { size: 'US 7.5', inStock: true },
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: true },
      { size: 'US 11', inStock: false },
      { size: 'US 12', inStock: true }
    ],
    fitAdvice: 'True to standard sneaker sizing. If between sizes, choose half-size down.',
    description: 'An everyday luxury sneaker constructed from supple full-grain leather with contrasting terracotta suede heel accents and reinforced double-needle stitching for lasting durability.',
    featured: true
  },
  {
    id: 'sole-02',
    name: "Artisan Lug-Sole Chelsea 'Espresso'",
    category: 'boots',
    availability: 'in-store',
    badge: { text: 'Low Stock (3 pairs)', type: 'low-stock' },
    price: 265,
    shelfLocation: 'Display Shelf B-01',
    image: 'assets/images/artisan-chelsea-boot.jpg',
    materials: {
      upper: 'Oiled Pull-Up Waxed Calfskin Leather',
      lining: 'Soft Calf Leather with Cushion Insoles',
      sole: 'Vibram Commando Lugged Sole',
      origin: 'Civitanova Marche, Italy'
    },
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: false },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: false },
      { size: 'US 11', inStock: true },
      { size: 'US 12', inStock: false }
    ],
    fitAdvice: 'Runs half a size generous to accommodate thicker boot socks.',
    description: 'Classic pull-on Chelsea boots built on a rugged Goodyear-welted lugged outsole, offering weather protection and timeless tailored looks for rain and street.',
    featured: true
  },
  {
    id: 'sole-03',
    name: "Heritage 84 Retro Runner 'Sage & Olive'",
    category: 'runner',
    availability: 'in-store',
    badge: { text: 'Staff Favorite', type: 'exclusive' },
    price: 160,
    shelfLocation: 'Rack C-04',
    image: 'assets/images/heritage-runner-sage.jpg',
    materials: {
      upper: 'Suede Overlays & Honeycomb Ballistic Mesh',
      lining: 'Terry Cloth Moisture-Wicking Interior',
      sole: 'Dual-Density EVA Foam with Gum Tread',
      origin: 'Tokyo, Japan'
    },
    sizes: [
      { size: 'US 7', inStock: true },
      { size: 'US 7.5', inStock: true },
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 11', inStock: true }
    ],
    fitAdvice: 'Standard snug athletic fit with supportive heel cup.',
    description: 'A vintage silhouette revisited with muted sage and olive suede, plush EVA cushioning, and herringbone grip designed for effortless all-day city walks.',
    featured: true
  },
  {
    id: 'sole-04',
    name: "Atelier Hand-Burnished Penny Loafer",
    category: 'dress',
    availability: 'in-store',
    badge: { text: 'In Store Now', type: 'in-stock' },
    price: 245,
    shelfLocation: 'Display Shelf A-01',
    image: 'assets/images/cognac-penny-loafer.jpg',
    materials: {
      upper: 'Cognac Hand-Burnished French Veal Leather',
      lining: '100% Vegetable-Tanned Leather',
      sole: 'Stacked Leather Heel with Rubber Injected Tap',
      origin: 'Florence, Italy'
    },
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: true },
      { size: 'US 11', inStock: true }
    ],
    fitAdvice: 'Snug dress fit intended to mold directly to the shape of your foot with break-in.',
    description: 'Sophisticated penny loafer crafted with handcrafted moc-toe stitching and hand-rubbed patina that deepens with age. Ideal for both tailored trousers and raw denim.',
    featured: true
  },
  {
    id: 'sole-05',
    name: "Apex Terramaster All-Terrain Trail Shoe",
    category: 'runner',
    availability: 'in-store',
    badge: { text: 'In Store Now', type: 'in-stock' },
    price: 195,
    shelfLocation: 'Rack C-02',
    image: 'assets/images/apex-allterrain-runner.jpg',
    materials: {
      upper: 'Cordura Ripstop with TPU Protective Cage',
      lining: 'Hydro-Shield Water Resistant Membrane',
      sole: 'Contagrip Deep Lug Mud Shedding Tread',
      origin: 'Annecy, France'
    },
    sizes: [
      { size: 'US 7.5', inStock: true },
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 11', inStock: false },
      { size: 'US 12', inStock: true }
    ],
    fitAdvice: 'True to athletic sizing with roomy protective toe box.',
    description: 'Engineered for rocky trails and rain-soaked city pavements alike, featuring rapid speed-lacing, rock-plate stability, and high-traction chevron outsole.',
    featured: true
  },
  {
    id: 'sole-06',
    name: "Aether Concept Aeroflow Prototype",
    category: 'sneaker',
    availability: 'upcoming',
    badge: { text: 'Drop Radar: Sept 18', type: 'upcoming' },
    price: 280,
    estimatedPrice: '$280 (Est. Retail)',
    shelfLocation: 'Vault Showcase Preview',
    dropDate: 'September 18, 2026',
    dropTimestamp: 1789700000000,
    edition: 'Limited Run • 120 Pairs Only',
    image: 'assets/images/aether-aeroflow-upcoming.jpg',
    materials: {
      upper: 'Biomimetic 3D Lattice Knit & Carbon Foil',
      lining: 'Seamless Adaptive Microfiber Sock',
      sole: 'Sculpted Aeroflow Hollow Core Injected Resin',
      origin: 'Munich, Germany'
    },
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: true },
      { size: 'US 11', inStock: true },
      { size: 'US 12', inStock: true }
    ],
    fitAdvice: 'Adaptive sock-like fit wrapping closely around arch.',
    description: 'An avant-garde exploration in structural kinetic propulsion, featuring an ultra-lightweight hollow-truss midsole and metallic copper structural brackets.',
    featured: true
  },
  {
    id: 'sole-07',
    name: "Vanguard Minimalist Court Oxford",
    category: 'sneaker',
    availability: 'in-store',
    badge: { text: 'In Store Now', type: 'in-stock' },
    price: 175,
    shelfLocation: 'Rack A-05',
    image: 'assets/images/nomad-classic-sneaker.jpg',
    materials: {
      upper: 'Monochrome Nappa Grain Cowhide',
      lining: 'Breathable Calfskin Leather',
      sole: 'Margom Natural Rubber Cupsole',
      origin: 'Civitanova Marche, Italy'
    },
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: true }
    ],
    fitAdvice: 'Italian standard sizing, true to size.',
    description: 'Subtle clean lines, tonal waxed cotton laces, and reinforced heel counter. The quintessential smart-casual everyday sneaker.',
    featured: false
  },
  {
    id: 'sole-08',
    name: "Highland Storm-Welt Field Boot",
    category: 'boots',
    availability: 'in-store',
    badge: { text: 'In Store Now', type: 'in-stock' },
    price: 295,
    shelfLocation: 'Display Shelf B-03',
    image: 'assets/images/artisan-chelsea-boot.jpg',
    materials: {
      upper: 'Full-Grain Weatherproof Horween Chromexcel',
      lining: 'Shearling-Lined Forefoot Inserts',
      sole: 'Dainite Studded Rubber Sole',
      origin: 'Northamptonshire, UK'
    },
    sizes: [
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 11', inStock: true }
    ],
    fitAdvice: 'Generous last width; designed for comfort with heavy wool socks.',
    description: 'Built with 360-degree storm-welt construction and brass speed-hooks for heavy all-weather protection without sacrificing refined silhouette.',
    featured: false
  },
  {
    id: 'sole-09',
    name: "Strata Carbon Race Trainer 'V2'",
    category: 'runner',
    availability: 'upcoming',
    badge: { text: 'Drop Radar: Oct 04', type: 'upcoming' },
    price: 250,
    estimatedPrice: '$250 (Est. Retail)',
    shelfLocation: 'Vault Showcase Preview',
    dropDate: 'October 04, 2026',
    edition: 'First Batch Run • In-Store Fitting Only',
    image: 'assets/images/aether-aeroflow-upcoming.jpg',
    materials: {
      upper: 'Ultralight Translucent Monomesh',
      lining: 'Suede Micro-Heel Pad',
      sole: 'Full-Length Curved Carbon Fiber Plate + PEBA Foam',
      origin: 'Taichung, Taiwan'
    },
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 11', inStock: true }
    ],
    fitAdvice: 'Race-snug fit. Try on in-store for arch support check.',
    description: 'Engineered for high energy return with our custom full-length carbon rocker plate and featherweight PEBA superfoam midsole.',
    featured: false
  },
  {
    id: 'sole-10',
    name: "Tuscan Horsebit Tassel Loafer",
    category: 'dress',
    availability: 'in-store',
    badge: { text: 'Physical Exclusive', type: 'exclusive' },
    price: 255,
    shelfLocation: 'Display Shelf A-03',
    image: 'assets/images/cognac-penny-loafer.jpg',
    materials: {
      upper: 'Antique Hand-Glazed Calfskin Leather',
      lining: 'Ultra-Soft Kipskin Lining',
      sole: 'Hand-Stitched Channel Leather Sole',
      origin: 'Naples, Italy'
    },
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: false },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: true }
    ],
    fitAdvice: 'Traditional Italian fit. Break-in period of 3-4 wears.',
    description: 'An understated dress loafer crowned with antique brass hardware and handcrafted Blake-stitched sole for flexible comfort.',
    featured: false
  }
];

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================

const state = {
  activeCategory: 'all',
  activeAvailability: 'all',
  searchQuery: '',
  sortBy: 'featured',
  selectedShoeId: null,
  selectedSize: null,
  reminders: JSON.parse(localStorage.getItem('atelier_drop_reminders') || '[]'),
  holds: JSON.parse(localStorage.getItem('atelier_instore_holds') || '[]')
};

// ==========================================================================
// 3. DOM ELEMENTS
// ==========================================================================

const DOM = {
  shoesGrid: document.getElementById('shoesGrid'),
  upcomingCardsGrid: document.getElementById('upcomingCardsGrid'),
  noResultsState: document.getElementById('noResultsState'),
  resultsCountText: document.getElementById('resultsCountText'),
  shoeSearchInput: document.getElementById('shoeSearchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  categoryPills: document.getElementById('categoryPills'),
  segmentedButtons: document.querySelectorAll('.segmented-control .seg-btn'),
  sortSelect: document.getElementById('sortSelect'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  fallbackResetBtn: document.getElementById('fallbackResetBtn'),
  inStockCountMetric: document.getElementById('inStockCountMetric'),
  
  // Modal Elements
  shoeModal: document.getElementById('shoeModal'),
  modalContent: document.getElementById('modalContent'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  
  // Announcement & Schedule
  liveStoreStatusText: document.getElementById('liveStoreStatusText'),
  scheduleStatusBadge: document.getElementById('scheduleStatusBadge'),
  liveStatusPillText: document.getElementById('liveStatusPillText'),
  weeklyHoursTable: document.getElementById('weeklyHoursTable'),
  copyAddressBtn: document.getElementById('copyAddressBtn'),
  toastContainer: document.getElementById('toastContainer'),
  headerSearchToggle: document.getElementById('headerSearchToggle')
};

// ==========================================================================
// 4. BUSINESS LOGIC & RENDER FUNCTIONS
// ==========================================================================

/**
 * Filter and sort dataset based on state
 */
function getFilteredShoes() {
  return SHOES_DATA.filter(shoe => {
    // Availability filter
    if (state.activeAvailability === 'in-store' && shoe.availability !== 'in-store') return false;
    if (state.activeAvailability === 'upcoming' && shoe.availability !== 'upcoming') return false;

    // Category filter
    if (state.activeCategory !== 'all' && shoe.category !== state.activeCategory) {
      return false;
    }

    // Search Query (name, materials, origin, shelfLocation, category)
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = shoe.name.toLowerCase().includes(q);
      const matchCategory = shoe.category.toLowerCase().includes(q);
      const matchShelf = shoe.shelfLocation.toLowerCase().includes(q);
      const matchDesc = shoe.description.toLowerCase().includes(q);
      const matchUpper = shoe.materials.upper.toLowerCase().includes(q);
      const matchOrigin = shoe.materials.origin.toLowerCase().includes(q);

      if (!matchName && !matchCategory && !matchShelf && !matchDesc && !matchUpper && !matchOrigin) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (state.sortBy === 'price-asc') return a.price - b.price;
    if (state.sortBy === 'price-desc') return b.price - a.price;
    if (state.sortBy === 'name-asc') return a.name.localeCompare(b.name);
    // Default featured
    return (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0);
  });
}

/**
 * Render shoe catalog cards
 */
function renderCatalog() {
  const filtered = getFilteredShoes();

  if (filtered.length === 0) {
    DOM.shoesGrid.innerHTML = '';
    DOM.shoesGrid.style.display = 'none';
    DOM.noResultsState.style.display = 'block';
    DOM.resultsCountText.textContent = '0 footwear models found';
    return;
  }

  DOM.shoesGrid.style.display = 'grid';
  DOM.noResultsState.style.display = 'none';
  DOM.resultsCountText.textContent = `Showing ${filtered.length} footwear model${filtered.length === 1 ? '' : 's'}`;

  DOM.shoesGrid.innerHTML = filtered.map(shoe => {
    const isUpcoming = shoe.availability === 'upcoming';
    const isReminded = state.reminders.includes(shoe.id);
    const hasActiveHold = state.holds.some(h => h.id === shoe.id);

    // Sizes chips HTML
    const sizesHtml = shoe.sizes.slice(0, 7).map(s => `
      <span class="size-chip ${!s.inStock ? 'out-of-stock' : ''}" title="${s.inStock ? 'Available on shelf' : 'Out of stock on shelf'}">
        ${s.size}
      </span>
    `).join('');

    const extraSizesCount = shoe.sizes.length > 7 ? `+${shoe.sizes.length - 7}` : '';

    return `
      <article class="shoe-card" data-shoe-id="${shoe.id}">
        <div class="shoe-card-media">
          <img src="${shoe.image}" alt="${shoe.name}" class="shoe-card-img" loading="lazy">
          <span class="card-badge ${shoe.badge.type}">${shoe.badge.text}</span>
          <span class="card-shelf-location">📍 ${shoe.shelfLocation}</span>
        </div>

        <div class="shoe-card-body">
          <div class="shoe-card-header">
            <div>
              <span class="shoe-card-category">${shoe.category.toUpperCase()} &bull; ${shoe.materials.origin}</span>
              <h3 class="shoe-card-name">${shoe.name}</h3>
            </div>
            <div class="shoe-card-price ${isUpcoming ? 'estimate' : ''}">
              ${isUpcoming ? shoe.estimatedPrice || `$${shoe.price}` : `$${shoe.price}`}
            </div>
          </div>

          <p class="shoe-card-materials">${shoe.materials.upper} &bull; ${shoe.materials.sole}</p>

          <div class="shoe-card-sizes">
            <div class="sizes-label">
              <span>Shelf Sizing</span>
              <span>${extraSizesCount ? extraSizesCount + ' more' : 'In Boutique'}</span>
            </div>
            <div class="sizes-chips">
              ${sizesHtml}
            </div>
          </div>

          <div class="shoe-card-actions">
            <button class="btn btn-primary btn-sm view-details-btn" data-shoe-id="${shoe.id}">
              ${isUpcoming ? 'Preview Release Specs' : 'View In-Store Details & Fit'}
            </button>
            ${isUpcoming ? `
              <button class="icon-btn reminder-btn ${isReminded ? 'active' : ''}" data-shoe-id="${shoe.id}" title="${isReminded ? 'Reminder set' : 'Notify me on drop date'}">
                ${isReminded ? '🔔' : '🔕'}
              </button>
            ` : `
              <button class="icon-btn hold-quick-btn ${hasActiveHold ? 'active' : ''}" data-shoe-id="${shoe.id}" title="Reserve for 24h try-on">
                ${hasActiveHold ? '✓' : '🏷️'}
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach card action event listeners
  attachCardEvents();
}

/**
 * Render dedicated upcoming releases grid
 */
function renderUpcomingRadar() {
  const upcomingShoes = SHOES_DATA.filter(s => s.availability === 'upcoming');
  if (!DOM.upcomingCardsGrid) return;

  DOM.upcomingCardsGrid.innerHTML = upcomingShoes.map(shoe => {
    const isReminded = state.reminders.includes(shoe.id);
    return `
      <article class="upcoming-shoe-card" data-shoe-id="${shoe.id}">
        <div class="upcoming-media">
          <img src="${shoe.image}" alt="${shoe.name}" class="upcoming-img" loading="lazy">
          <div class="drop-date-pill">
            <span>📅</span>
            <span>Arrives: ${shoe.dropDate}</span>
          </div>
        </div>

        <div class="upcoming-body">
          <div class="upcoming-meta">
            <span class="upcoming-edition">${shoe.edition || 'Limited Batch'}</span>
            <span class="upcoming-price">${shoe.estimatedPrice || `$${shoe.price}`}</span>
          </div>

          <h3 class="upcoming-title">${shoe.name}</h3>
          <p class="upcoming-desc">${shoe.description}</p>

          <div class="upcoming-actions">
            <button class="btn btn-accent btn-sm set-reminder-btn" data-shoe-id="${shoe.id}">
              ${isReminded ? '✓ Drop Alert Active' : '🔔 Remind Me for In-Store Fitting'}
            </button>
            <button class="btn btn-outline btn-sm view-details-btn" data-shoe-id="${shoe.id}">
              View Specs
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach upcoming buttons
  DOM.upcomingCardsGrid.querySelectorAll('.set-reminder-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-shoe-id');
      toggleReminder(id);
    });
  });

  DOM.upcomingCardsGrid.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-shoe-id');
      openShoeModal(id);
    });
  });
}

/**
 * Open and render product details modal
 */
function openShoeModal(shoeId) {
  const shoe = SHOES_DATA.find(s => s.id === shoeId);
  if (!shoe) return;

  state.selectedShoeId = shoeId;
  state.selectedSize = null;

  const isUpcoming = shoe.availability === 'upcoming';
  const hasActiveHold = state.holds.find(h => h.id === shoe.id);

  // Available size buttons
  const sizeButtons = shoe.sizes.map(s => `
    <button class="modal-size-btn ${!s.inStock ? 'disabled' : ''}" data-size="${s.size}" ${!s.inStock ? 'disabled' : ''}>
      ${s.size}
    </button>
  `).join('');

  DOM.modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-gallery-pane">
        <div class="modal-main-image">
          <img src="${shoe.image}" alt="${shoe.name}">
        </div>
      </div>

      <div class="modal-info-pane">
        <div class="modal-kicker-row">
          <span class="card-badge ${shoe.badge.type}">${shoe.badge.text}</span>
          <span class="modal-shelf">Display: ${shoe.shelfLocation}</span>
        </div>

        <h2 class="modal-title">${shoe.name}</h2>

        <div class="modal-price-row">
          <span class="modal-price">${isUpcoming ? shoe.estimatedPrice || `$${shoe.price}` : `$${shoe.price}`}</span>
          <span style="font-size: 0.85rem; color: var(--text-secondary);">&bull; Tax included in-store</span>
        </div>

        <p class="modal-desc">${shoe.description}</p>

        <!-- Specifications Breakdown -->
        <div class="modal-specs-table">
          <div class="spec-item">
            <span class="spec-key">Upper Material</span>
            <span class="spec-val">${shoe.materials.upper}</span>
          </div>
          <div class="spec-item">
            <span class="spec-key">Outsole</span>
            <span class="spec-val">${shoe.materials.sole}</span>
          </div>
          <div class="spec-item">
            <span class="spec-key">Lining</span>
            <span class="spec-val">${shoe.materials.lining}</span>
          </div>
          <div class="spec-item">
            <span class="spec-key">Workshop Origin</span>
            <span class="spec-val">${shoe.materials.origin}</span>
          </div>
        </div>

        <!-- Sizing selection -->
        <div class="modal-size-select-section">
          <div class="modal-size-select-header">
            <span>Select Size to Try On / Hold</span>
            <span style="color: var(--accent-terracotta); font-size: 0.75rem;">${shoe.fitAdvice}</span>
          </div>
          <div class="modal-size-options" id="modalSizeOptions">
            ${sizeButtons}
          </div>
        </div>

        <!-- Action buttons -->
        <div class="modal-cta-block">
          ${isUpcoming ? `
            <button class="btn btn-accent btn-lg" id="modalReminderBtn" data-shoe-id="${shoe.id}">
              🔔 Remind Me for In-Store Drop (${shoe.dropDate})
            </button>
            <p style="font-size: 0.75rem; color: var(--text-secondary); text-align: center;">
              We will alert you 48 hours prior to physical store unboxing.
            </p>
          ` : `
            <button class="btn btn-primary btn-lg" id="modalHoldBtn" data-shoe-id="${shoe.id}">
              ${hasActiveHold ? `✓ Active Hold (Size ${hasActiveHold.size})` : '🏷️ Reserve Sizing for In-Store Fitting (24h Hold)'}
            </button>
            <p style="font-size: 0.75rem; color: var(--text-secondary); text-align: center;">
              No payment needed online. We set aside your selected pair on the try-on rack for 24 hours.
            </p>
          `}
        </div>
      </div>
    </div>
  `;

  // Attach modal size picker listeners
  const sizeBtns = DOM.modalContent.querySelectorAll('.modal-size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.selectedSize = btn.getAttribute('data-size');
    });
  });

  // Attach hold button
  const holdBtn = DOM.modalContent.getElementById('modalHoldBtn');
  if (holdBtn) {
    holdBtn.addEventListener('click', () => {
      if (!state.selectedSize) {
        showToast('Please select a size first', 'Click on one of the available sizes above.', '⚠️');
        return;
      }
      handleInStoreHold(shoe, state.selectedSize);
    });
  }

  // Attach reminder button
  const reminderBtn = DOM.modalContent.getElementById('modalReminderBtn');
  if (reminderBtn) {
    reminderBtn.addEventListener('click', () => {
      toggleReminder(shoe.id);
      closeShoeModal();
    });
  }

  // Display modal
  DOM.shoeModal.classList.add('open');
  DOM.shoeModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeShoeModal() {
  DOM.shoeModal.classList.remove('open');
  DOM.shoeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Handle reserving a shoe for 24h try-on in-store
 */
function handleInStoreHold(shoe, size) {
  const existingIndex = state.holds.findIndex(h => h.id === shoe.id);
  
  if (existingIndex > -1) {
    state.holds[existingIndex].size = size;
  } else {
    state.holds.push({
      id: shoe.id,
      name: shoe.name,
      size: size,
      shelfLocation: shoe.shelfLocation,
      timestamp: Date.now()
    });
  }

  localStorage.setItem('atelier_instore_holds', JSON.stringify(state.holds));
  showToast('In-Store Try-On Reserved!', `${shoe.name} (Size ${size}) is held at ${shoe.shelfLocation} for 24 hours.`, '👟');
  
  closeShoeModal();
  renderCatalog();
}

/**
 * Toggle upcoming drop reminder
 */
function toggleReminder(shoeId) {
  const shoe = SHOES_DATA.find(s => s.id === shoeId);
  if (!shoe) return;

  const index = state.reminders.indexOf(shoeId);
  if (index > -1) {
    state.reminders.splice(index, 1);
    showToast('Drop alert removed', `You won't receive notification for ${shoe.name}.`, '🔕');
  } else {
    state.reminders.push(shoeId);
    showToast('Drop Alert Activated!', `We will notify you when ${shoe.name} arrives in-store on ${shoe.dropDate}.`, '🔔');
  }

  localStorage.setItem('atelier_drop_reminders', JSON.stringify(state.reminders));
  renderCatalog();
  renderUpcomingRadar();
}

/**
 * Show a toast notification
 */
function showToast(title, description, icon = '✦') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <span class="toast-title">${title}</span>
      <span class="toast-desc">${description}</span>
    </div>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-closing');
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

/**
 * Live Store Hours calculation
 */
function updateLiveStoreStatus() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeDec = currentHour + (currentMinute / 60);

  // Schedule Definition:
  // Mon-Thu (1-4): 10:00 - 20:00 (8 PM)
  // Fri-Sat (5-6): 10:00 - 21:00 (9 PM)
  // Sun (0): 11:00 - 18:00 (6 PM)
  let openTime = 10;
  let closeTime = 20;

  if (currentDay === 5 || currentDay === 6) {
    closeTime = 21;
  } else if (currentDay === 0) {
    openTime = 11;
    closeTime = 18;
  }

  const isOpen = currentTimeDec >= openTime && currentTimeDec < closeTime;

  // Update Announcement & Schedule Badges
  if (isOpen) {
    const closeFormatted = closeTime > 12 ? `${closeTime - 12}:00 PM` : `${closeTime}:00 AM`;
    DOM.liveStoreStatusText.textContent = `🟢 Soho Boutique Open Now (Closing at ${closeFormatted})`;
    if (DOM.liveStatusPillText) DOM.liveStatusPillText.textContent = `Open Now &bull; Closes ${closeFormatted}`;
  } else {
    DOM.liveStoreStatusText.textContent = `🔴 Soho Boutique Currently Closed (Opens 10:00 AM)`;
    if (DOM.liveStatusPillText) DOM.liveStatusPillText.textContent = `Closed &bull; Opens 10:00 AM`;
  }

  // Highlight Current Day in Schedule Table
  if (DOM.weeklyHoursTable) {
    const rows = DOM.weeklyHoursTable.querySelectorAll('.hours-row');
    rows.forEach(row => {
      const dayAttr = parseInt(row.getAttribute('data-day'), 10);
      if (dayAttr === currentDay) {
        row.classList.add('is-today');
      } else {
        row.classList.remove('is-today');
      }
    });
  }
}

/**
 * Event Listeners for Shoe Cards
 */
function attachCardEvents() {
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-shoe-id');
      openShoeModal(id);
    });
  });

  document.querySelectorAll('.reminder-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-shoe-id');
      toggleReminder(id);
    });
  });

  document.querySelectorAll('.hold-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-shoe-id');
      openShoeModal(id);
    });
  });

  document.querySelectorAll('.shoe-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-shoe-id');
      openShoeModal(id);
    });
  });
}

// ==========================================================================
// 5. INITIALIZATION & GLOBAL LISTENERS
// ==========================================================================

function init() {
  // Update metric count
  const inStockCount = SHOES_DATA.filter(s => s.availability === 'in-store').length;
  if (DOM.inStockCountMetric) DOM.inStockCountMetric.textContent = `${inStockCount} Models`;

  // Render
  renderCatalog();
  renderUpcomingRadar();
  updateLiveStoreStatus();

  // Search input handler
  DOM.shoeSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
    DOM.resetFiltersBtn.style.display = (state.searchQuery || state.activeCategory !== 'all' || state.activeAvailability !== 'all') ? 'inline-flex' : 'none';
    renderCatalog();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.shoeSearchInput.value = '';
    state.searchQuery = '';
    DOM.clearSearchBtn.style.display = 'none';
    renderCatalog();
  });

  // Segmented control buttons (All / In-Store / Upcoming)
  DOM.segmentedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.segmentedButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeAvailability = btn.getAttribute('data-availability');
      DOM.resetFiltersBtn.style.display = (state.searchQuery || state.activeCategory !== 'all' || state.activeAvailability !== 'all') ? 'inline-flex' : 'none';
      renderCatalog();
    });
  });

  // Category pills
  DOM.categoryPills.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.categoryPills.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.getAttribute('data-category');
      DOM.resetFiltersBtn.style.display = (state.searchQuery || state.activeCategory !== 'all' || state.activeAvailability !== 'all') ? 'inline-flex' : 'none';
      renderCatalog();
    });
  });

  // Sort select
  DOM.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCatalog();
  });

  // Reset Filters
  const resetAllFilters = () => {
    state.activeCategory = 'all';
    state.activeAvailability = 'all';
    state.searchQuery = '';
    state.sortBy = 'featured';
    
    DOM.shoeSearchInput.value = '';
    DOM.clearSearchBtn.style.display = 'none';
    DOM.sortSelect.value = 'featured';
    
    DOM.segmentedButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-availability') === 'all'));
    DOM.categoryPills.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));
    DOM.resetFiltersBtn.style.display = 'none';
    
    renderCatalog();
  };

  DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
  DOM.fallbackResetBtn.addEventListener('click', resetAllFilters);

  // Header Search focus shortcut
  DOM.headerSearchToggle.addEventListener('click', () => {
    DOM.shoeSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => DOM.shoeSearchInput.focus(), 400);
  });

  // Copy address button
  if (DOM.copyAddressBtn) {
    DOM.copyAddressBtn.addEventListener('click', () => {
      const address = "ATELIER SOLE BOUTIQUE, 442 Artisan Way, Soho Fashion Quarter, New York, NY 10013";
      navigator.clipboard.writeText(address).then(() => {
        showToast('Address Copied!', 'Store address copied to your clipboard.', '📍');
      }).catch(() => {
        showToast('Address Copied!', address, '📍');
      });
    });
  }

  // Modal Close
  DOM.closeModalBtn.addEventListener('click', closeShoeModal);
  DOM.shoeModal.addEventListener('click', (e) => {
    if (e.target === DOM.shoeModal) closeShoeModal();
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.shoeModal.classList.contains('open')) {
      closeShoeModal();
    }
  });

  // Footer category quick links
  document.querySelectorAll('.filter-quick-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      if (filter) {
        state.activeCategory = filter;
        DOM.categoryPills.querySelectorAll('.cat-pill').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-category') === filter);
        });
        renderCatalog();
      }
    });
  });
}

// Boot up once DOM is loaded
document.addEventListener('DOMContentLoaded', init);
