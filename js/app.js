/**
 * EmprendeIgual - Controlador Principal de la Aplicación
 * Maneja la navegación entre las 4 secciones principales (Inicio, Explorar, Capacitación, Mi Perfil),
 * vistas modales (Detalles, Contacto, Admin Demo, Validación Académica, Acerca de),
 * notificaciones Toast y accesibilidad.
 */

const App = {
  activeSection: "inicio",
  confirmCallback: null,

  init() {
    console.log("Iniciando EmprendeIgual...");
    StorageService.init();

    this.bindNavigation();
    this.bindModalEvents();
    this.bindValidationForm();
    this.bindReportForm();

    // Inicializar submódulos
    CatalogoModule.init();
    PerfilModule.init();
    CapacitacionModule.init();
    AdminModule.init();
    this.renderFeaturedHome();
    this.renderValidationList();

    // Inicializar iconos de Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Comprobar parámetro hash de URL (#explorar, #capacitacion, #perfil)
    this.handleUrlHash();
  },

  handleUrlHash() {
    const hash = window.location.hash.replace("#", "");
    if (["inicio", "explorar", "capacitacion", "perfil"].includes(hash)) {
      this.navigateTo(hash);
    }
  },

  bindNavigation() {
    // Enlaces de navegación principal (exactamente 4 opciones)
    const navLinks = document.querySelectorAll(".nav-link[data-section]");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.currentTarget.getAttribute("data-section");
        this.navigateTo(target);

        // Cerrar menú móvil si está abierto
        const mobileMenu = document.getElementById("mobileNavMenu");
        if (mobileMenu && mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
        }
      });
    });

    // Botón hamburguesa móvil
    const menuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileNavMenu");
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
      });
    }

    // Botones de acción rápida en la página de inicio
    const heroExploreBtn = document.getElementById("heroExploreBtn");
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener("click", () => {
        this.navigateTo("explorar");
      });
    }

    const heroRegisterBtn = document.getElementById("heroRegisterBtn");
    if (heroRegisterBtn) {
      heroRegisterBtn.addEventListener("click", () => {
        this.navigateTo("perfil");
        // Cambiar a subpestaña de crear publicación
        const newTab = document.querySelector('[data-target="subviewNewProduct"]');
        if (newTab) newTab.click();
      });
    }
  },

  navigateTo(sectionId) {
    this.activeSection = sectionId;
    window.location.hash = sectionId;

    // Actualizar enlaces de navegación activos
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });

    // Mostrar sección correspondiente y ocultar el resto
    document.querySelectorAll(".main-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
      targetSection.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Actualizaciones específicas según la vista
    if (sectionId === "explorar") {
      CatalogoModule.render();
    } else if (sectionId === "capacitacion") {
      CapacitacionModule.render();
    } else if (sectionId === "perfil") {
      PerfilModule.renderUserProducts();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  /**
   * Renderiza las 4 a 6 tarjetas destacadas en la página de inicio
   */
  renderFeaturedHome() {
    const container = document.getElementById("featuredProductsGrid");
    if (!container) return;

    const approved = StorageService.getApprovedProducts();
    // Tomamos hasta 6 productos (priorizando los marcados como featured)
    const featured = approved.slice(0, 6);

    container.innerHTML = featured.map(p => `
      <article class="product-card">
        <div class="product-card-badge-demo">Demostración</div>
        <div class="product-card-image-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='assets/images/epera-cesteria-collage.jpg'">
          <span class="product-card-category">${p.category}</span>
        </div>
        <div class="product-card-content">
          <div class="product-card-venture">
            <i data-lucide="store"></i>
            <span>${p.ventureName}</span>
          </div>
          <h3 class="product-card-title">${p.name}</h3>
          <p class="product-card-desc">${p.description}</p>
          <div class="product-card-footer">
            <div class="product-card-price">
              <span class="price-label">Ref.</span>
              <span class="price-value">$${parseFloat(p.price).toFixed(2)} USD</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="CatalogoModule.openProductDetails('${p.id}')">
              <i data-lucide="eye"></i> Ver producto
            </button>
          </div>
        </div>
      </article>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  },

  // ---------------- GESTIÓN DE MODALES ----------------

  bindModalEvents() {
    // Cerrar al hacer clic en botones con data-close-modal
    document.querySelectorAll("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modal = e.currentTarget.closest(".modal-backdrop");
        if (modal) modal.classList.remove("active");
      });
    });

    // Cerrar al presionar la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.active").forEach(m => {
          m.classList.remove("active");
        });
      }
    });

    // Modal de confirmación genérico
    const confirmOkBtn = document.getElementById("confirmModalOkBtn");
    if (confirmOkBtn) {
      confirmOkBtn.addEventListener("click", () => {
        if (typeof this.confirmCallback === "function") {
          this.confirmCallback();
        }
        this.closeModal("confirmModal");
      });
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      // Prevenir scroll de fondo
      document.body.style.overflow = "hidden";
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      // Restaurar scroll si no hay otros modales abiertos
      const anyActive = document.querySelector(".modal-backdrop.active");
      if (!anyActive) {
        document.body.style.overflow = "";
      }
    }
  },

  showConfirmModal(title, message, onConfirm) {
    const titleEl = document.getElementById("confirmModalTitle");
    const msgEl = document.getElementById("confirmModalMessage");
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    this.confirmCallback = onConfirm;
    this.openModal("confirmModal");
  },

  // ---------------- MODAL DE REPORTE DE CONTENIDO ----------------

  openReportModal(productId, productName) {
    document.getElementById("reportProductId").value = productId;
    document.getElementById("reportProductName").value = productName;
    document.getElementById("reportProductLabel").textContent = `Reportando: "${productName}"`;
    this.openModal("reportModal");
  },

  bindReportForm() {
    const form = document.getElementById("contentReportForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const report = {
          productId: document.getElementById("reportProductId").value,
          productName: document.getElementById("reportProductName").value,
          reason: document.getElementById("reportReason").value,
          comments: document.getElementById("reportComments").value.trim(),
          reporterEmail: document.getElementById("reportEmail").value.trim()
        };

        StorageService.addReport(report);
        AdminModule.updateStats();
        this.closeModal("reportModal");
        form.reset();
        this.showToast("Reporte recibido. El panel administrativo revisará la publicación.", "info");
      });
    }
  },

  // ---------------- VALIDACIÓN ACADÉMICA (SECCIÓN 9) ----------------

  bindValidationForm() {
    const form = document.getElementById("academicValidationForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const valData = {
          participantId: document.getElementById("valParticipantId").value.trim() || `Participante_${Date.now().toString().slice(-4)}`,
          userProfile: document.getElementById("valUserProfile").value,
          q1_purpose: document.getElementById("valQ1").value.trim(),
          q2_registration: document.getElementById("valQ2").value.trim(),
          q3_catalog: document.getElementById("valQ3").value.trim(),
          q4_usability: document.getElementById("valQ4").value.trim(),
          q5_equality: document.getElementById("valQ5").value.trim(),
          q6_improvements: document.getElementById("valQ6").value.trim()
        };

        StorageService.saveValidation(valData);
        form.reset();
        this.renderValidationList();
        this.showToast("¡Evaluación académica registrada con éxito en el sistema local!", "success");
      });
    }
  },

  renderValidationList() {
    const container = document.getElementById("validationResultsList");
    if (!container) return;

    const list = StorageService.getValidations();
    const countEl = document.getElementById("validationCountBadge");
    if (countEl) countEl.textContent = `${list.length} respuesta(s)`;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p class="text-muted">No se han registrado evaluaciones todavía. Puedes completar el formulario superior para probar.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(v => `
      <div class="validation-entry-card">
        <div class="val-entry-header">
          <div class="val-entry-user">
            <i data-lucide="user-check"></i>
            <strong>${v.participantId}</strong>
            <span class="badge-role-sm">${v.userProfile}</span>
          </div>
          <span class="text-muted text-sm">${v.date}</span>
        </div>
        <div class="val-answers-grid">
          <div class="val-item"><strong>1. ¿Comprendió el propósito?:</strong> <span>${v.q1_purpose}</span></div>
          <div class="val-item"><strong>2. ¿Identificó el registro?:</strong> <span>${v.q2_registration}</span></div>
          <div class="val-item"><strong>3. ¿Facilidad de búsqueda?:</strong> <span>${v.q3_catalog}</span></div>
          <div class="val-item"><strong>4. ¿Facilidad de formularios?:</strong> <span>${v.q4_usability}</span></div>
          <div class="val-item"><strong>5. ¿Igualdad de oportunidades?:</strong> <span>${v.q5_equality}</span></div>
          <div class="val-item highlight"><strong>6. Propuestas de mejora:</strong> <span>${v.q6_improvements}</span></div>
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  },

  // ---------------- NOTIFICACIONES TOAST ----------------

  showToast(message, type = "info") {
    const toast = document.getElementById("appToast");
    const toastMsg = document.getElementById("appToastMessage");
    const toastIcon = document.getElementById("appToastIcon");
    if (!toast || !toastMsg) return;

    toast.className = `toast toast-${type} active`;
    toastMsg.textContent = message;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    else if (type === "warning") iconName = "alert-triangle";
    else if (type === "error") iconName = "x-circle";

    if (toastIcon) {
      toastIcon.setAttribute("data-lucide", iconName);
      if (window.lucide) window.lucide.createIcons();
    }

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("active");
    }, 4000);
  }
};

// Iniciar aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

window.App = App;

