/**
 * EmprendeIgual - Módulo de Catálogo y Exploración
 * Lógica de renderizado de tarjetas, filtros, búsqueda, vista de detalles y contacto demo.
 */

const CatalogoModule = {
  activeCategory: "todas",
  searchQuery: "",
  priceFilter: "todos", // 'todos', 'bajo' (0-10), 'medio' (10-25), 'alto' (>25)

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    // Filtros de categoría en sección Explorar
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        filterButtons.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.activeCategory = e.currentTarget.getAttribute("data-category");
        this.render();
      });
    });

    // Barra de búsqueda en tiempo real
    const searchInput = document.getElementById("catalogSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    // Filtro por precio
    const priceSelect = document.getElementById("catalogPriceSelect");
    if (priceSelect) {
      priceSelect.addEventListener("change", (e) => {
        this.priceFilter = e.target.value;
        this.render();
      });
    }

    // Botón de restablecer filtros
    const resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.resetFilters();
      });
    }
  },

  resetFilters() {
    this.activeCategory = "todas";
    this.searchQuery = "";
    this.priceFilter = "todos";

    const searchInput = document.getElementById("catalogSearchInput");
    if (searchInput) searchInput.value = "";

    const priceSelect = document.getElementById("catalogPriceSelect");
    if (priceSelect) priceSelect.value = "todos";

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(b => {
      if (b.getAttribute("data-category") === "todas") {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    this.render();
  },

  getFilteredProducts() {
    // Solo mostramos productos aprobados en el catálogo público
    const approved = StorageService.getApprovedProducts();

    return approved.filter(product => {
      // Filtro de categoría
      const matchesCategory = (this.activeCategory === "todas") || 
        (product.category.toLowerCase().includes(this.activeCategory.toLowerCase()));

      // Filtro de búsqueda textual (nombre, emprendimiento, descripción)
      const matchesQuery = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery) ||
        product.ventureName.toLowerCase().includes(this.searchQuery) ||
        product.description.toLowerCase().includes(this.searchQuery) ||
        product.category.toLowerCase().includes(this.searchQuery);

      // Filtro de precio
      let matchesPrice = true;
      if (this.priceFilter === "bajo") matchesPrice = product.price <= 10;
      else if (this.priceFilter === "medio") matchesPrice = product.price > 10 && product.price <= 25;
      else if (this.priceFilter === "alto") matchesPrice = product.price > 25;

      return matchesCategory && matchesQuery && matchesPrice;
    });
  },

  render() {
    const container = document.getElementById("catalogGrid");
    const countBadge = document.getElementById("catalogCountBadge");
    if (!container) return;

    const filtered = this.getFilteredProducts();

    if (countBadge) {
      countBadge.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <i data-lucide="package-search"></i>
          </div>
          <h3>No se encontraron publicaciones</h3>
          <p>Prueba ajustando los términos de búsqueda o seleccionando otra categoría.</p>
          <button class="btn btn-secondary" onclick="CatalogoModule.resetFilters()">
            <i data-lucide="rotate-ccw"></i> Restablecer filtros
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(item => this.createProductCardHtml(item)).join("");
    if (window.lucide) window.lucide.createIcons();
  },

  createProductCardHtml(item) {
    return `
      <article class="product-card" data-id="${item.id}">
        <div class="product-card-badge-demo">Demostración</div>
        <div class="product-card-image-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='assets/images/epera-cesteria-collage.jpg'">
          <span class="product-card-category">${item.category}</span>
        </div>
        <div class="product-card-content">
          <div class="product-card-venture">
            <i data-lucide="store"></i>
            <span>${item.ventureName}</span>
          </div>
          <h3 class="product-card-title">${item.name}</h3>
          <p class="product-card-desc">${item.description}</p>
          
          <div class="product-card-footer">
            <div class="product-card-price">
              <span class="price-label">Precio ref.</span>
              <span class="price-value">$${parseFloat(item.price).toFixed(2)} USD</span>
            </div>
            <div class="product-card-actions">
              <button class="btn btn-outline btn-sm" onclick="CatalogoModule.openProductDetails('${item.id}')" title="Ver detalles completos">
                <i data-lucide="eye"></i> Detalles
              </button>
              <button class="btn btn-primary btn-sm" onclick="CatalogoModule.openContactModal('${item.id}')" title="Contactar al emprendimiento">
                <i data-lucide="message-square"></i> Contactar
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  },

  /**
   * Abre el modal de detalles extendidos de producto
   */
  openProductDetails(productId) {
    const product = StorageService.getProductById(productId);
    if (!product) return;

    const modalBody = document.getElementById("productDetailsModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="details-grid">
        <div class="details-image-container">
          <div class="demo-tag-floating"><i data-lucide="info"></i> Ficha de Demostración</div>
          <img src="${product.image}" alt="${product.name}" class="details-image" onerror="this.src='assets/images/epera-cesteria-collage.jpg'">
          <div class="details-meta-box">
            <div class="meta-item">
              <i data-lucide="map-pin"></i>
              <span><strong>Ubicación:</strong> ${product.location || "San Lorenzo, Esmeraldas"}</span>
            </div>
            <div class="meta-item">
              <i data-lucide="store"></i>
              <span><strong>Emprendimiento:</strong> ${product.ventureName}</span>
            </div>
            <div class="meta-item">
              <i data-lucide="tag"></i>
              <span><strong>Categoría:</strong> ${product.category}</span>
            </div>
          </div>
        </div>

        <div class="details-info-container">
          <span class="badge-category-pill">${product.category}</span>
          <h2 class="details-title">${product.name}</h2>
          
          <div class="details-price-tag">
            <span class="price-num">$${parseFloat(product.price).toFixed(2)}</span>
            <span class="currency">USD (Precio referencial)</span>
          </div>

          <div class="details-section">
            <h3>Descripción general</h3>
            <p>${product.extendedDescription || product.description}</p>
          </div>

          ${product.materials ? `
          <div class="details-section">
            <h3><i data-lucide="layers"></i> Materiales e insumos</h3>
            <p>${product.materials}</p>
          </div>
          ` : ''}

          ${product.elaborationProcess ? `
          <div class="details-section">
            <h3><i data-lucide="hammer"></i> Proceso de elaboración</h3>
            <p>${product.elaborationProcess}</p>
          </div>
          ` : ''}

          ${product.productUsage ? `
          <div class="details-section">
            <h3><i data-lucide="sparkles"></i> Uso y recomendaciones</h3>
            <p>${product.productUsage}</p>
          </div>
          ` : ''}

          <div class="details-actions">
            <button class="btn btn-primary btn-block" onclick="CatalogoModule.openContactModal('${product.id}')">
              <i data-lucide="message-circle"></i> Contactar con el vendedor
            </button>
            <button class="btn btn-outline btn-block" onclick="App.openReportModal('${product.id}', '${product.name.replace(/'/g, "\\'")}')">
              <i data-lucide="flag"></i> Reportar publicación
            </button>
          </div>
        </div>
      </div>
    `;

    App.openModal("productDetailsModal");
    if (window.lucide) window.lucide.createIcons();
  },

  /**
   * Abre modal interactivo de contacto demostrativo
   */
  openContactModal(productId) {
    const product = StorageService.getProductById(productId);
    if (!product) return;

    const modalBody = document.getElementById("contactModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="contact-demo-wrapper">
        <div class="banner-notice info">
          <i data-lucide="alert-circle"></i>
          <div>
            <strong>Simulación de Contacto Comercial</strong>
            <p>EmprendeIgual no procesa transacciones bancarias directas ni almacena datos telefónicos reales de personas no autorizadas. Así es como un comprador interactúa de manera transparente:</p>
          </div>
        </div>

        <div class="contact-product-summary">
          <img src="${product.image}" alt="${product.name}" class="contact-thumb">
          <div>
            <h4>${product.name}</h4>
            <p class="venture-name"><i data-lucide="store"></i> ${product.ventureName}</p>
            <p class="price-highlight">Referencia: $${parseFloat(product.price).toFixed(2)} USD</p>
          </div>
        </div>

        <div class="contact-channels-box">
          <div class="channel-card">
            <div class="channel-icon"><i data-lucide="message-circle"></i></div>
            <div class="channel-info">
              <h5>Mensajería directa demostrativa</h5>
              <p>Canal verificado asignado: <code>${product.contactChannel || 'contacto-demo@emprendeigual.ec'}</code></p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.showToast('En una versión de producción, abriría el chat seguro con el vendedor.', 'info')">
              Iniciar Chat
            </button>
          </div>

          <div class="channel-card">
            <div class="channel-icon"><i data-lucide="mail"></i></div>
            <div class="channel-info">
              <h5>Envío de consulta formal</h5>
              <p>Formulario directo al buzón del emprendimiento.</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('quickInquiryForm').classList.toggle('hidden')">
              Redactar Mensaje
            </button>
          </div>
        </div>

        <!-- Formulario de consulta rápida demostrativa -->
        <form id="quickInquiryForm" class="quick-inquiry-form hidden" onsubmit="CatalogoModule.sendInquiryDemo(event, '${product.id}')">
          <h5>Enviar mensaje al vendedor:</h5>
          <div class="form-group">
            <label for="inquirySender">Tu nombre:</label>
            <input type="text" id="inquirySender" class="form-control" required placeholder="Ej. Mariana Torres">
          </div>
          <div class="form-group">
            <label for="inquiryMessage">Mensaje o pregunta sobre el producto:</label>
            <textarea id="inquiryMessage" class="form-control" rows="3" required placeholder="Hola, me interesa este producto. ¿Tienen disponible para entrega inmediata en San Lorenzo?"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            <i data-lucide="send"></i> Enviar consulta de prueba
          </button>
        </form>
      </div>
    `;

    App.openModal("contactModal");
    if (window.lucide) window.lucide.createIcons();
  },

  sendInquiryDemo(e, productId) {
    e.preventDefault();
    App.showToast("¡Mensaje de demostración enviado con éxito al emprendimiento!", "success");
    App.closeModal("contactModal");
  }
};

window.CatalogoModule = CatalogoModule;

