/**
 * EmprendeIgual - Módulo de Perfil y Gestión de Publicaciones
 * Permite registrarse (simulación), gestionar perfil comercial,
 * publicar productos, editarlos y eliminarlos con persistencia local.
 */

const PerfilModule = {
  currentEditingProductId: null,

  init() {
    this.bindEvents();
    this.loadProfileData();
    this.renderUserProducts();
  },

  bindEvents() {
    // Formulario de perfil de usuario / emprendimiento
    const profileForm = document.getElementById("userProfileForm");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveProfile();
      });
    }

    // Formulario de publicación / edición de producto
    const productForm = document.getElementById("productForm");
    if (productForm) {
      productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveProduct();
      });
    }

    // Botón para resetear formulario de producto
    const cancelEditBtn = document.getElementById("cancelEditProductBtn");
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", () => {
        this.resetProductForm();
      });
    }

    // Sub-pestañas internas dentro de Mi Perfil (Datos de cuenta / Mis Publicaciones / Nueva publicación)
    const profileTabs = document.querySelectorAll(".profile-subtab-btn");
    profileTabs.forEach(btn => {
      btn.addEventListener("click", (e) => {
        profileTabs.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const targetView = e.currentTarget.getAttribute("data-target");
        this.switchSubView(targetView);
      });
    });
  },

  switchSubView(viewId) {
    const views = document.querySelectorAll(".profile-subview");
    views.forEach(v => v.classList.add("hidden"));
    const activeView = document.getElementById(viewId);
    if (activeView) activeView.classList.remove("hidden");
  },

  loadProfileData() {
    const profile = StorageService.getUserProfile();
    if (!profile) return;

    // Campos personales
    const nameInput = document.getElementById("profFullName");
    const emailInput = document.getElementById("profEmail");
    const typeSelect = document.getElementById("profUserType");
    const genderSelect = document.getElementById("profGender");

    if (nameInput) nameInput.value = profile.fullName || "";
    if (emailInput) emailInput.value = profile.email || "";
    if (typeSelect) typeSelect.value = profile.userType || "emprendedor";
    if (genderSelect) genderSelect.value = profile.gender || "prefiero_no_decir";

    // Campos de emprendimiento
    const v = profile.venture || {};
    const ventName = document.getElementById("profVentureName");
    const ventDesc = document.getElementById("profVentureDesc");
    const ventCat = document.getElementById("profVentureCategory");
    const ventLoc = document.getElementById("profVentureLocation");
    const ventContact = document.getElementById("profVentureContact");
    const ventResp = document.getElementById("profVentureResponsible");

    if (ventName) ventName.value = v.name || "";
    if (ventDesc) ventDesc.value = v.description || "";
    if (ventCat) ventCat.value = v.category || "Artesanías";
    if (ventLoc) ventLoc.value = v.location || "San Lorenzo, Esmeraldas";
    if (ventContact) ventContact.value = v.contactChannel || "";
    if (ventResp) ventResp.value = v.responsibleName || "";

    // Actualizar encabezado del perfil
    this.updateProfileHeader(profile);
  },

  updateProfileHeader(profile) {
    const headerName = document.getElementById("profileDisplayName");
    const headerVenture = document.getElementById("profileDisplayVenture");
    const headerBadge = document.getElementById("profileDisplayRole");

    if (headerName) headerName.textContent = profile.fullName || "Usuario Emprendedor";
    if (headerVenture) headerVenture.textContent = profile.venture?.name || "Sin emprendimiento registrado";
    if (headerBadge) {
      const typeLabels = {
        emprendedor: "Persona Emprendedora",
        cliente: "Comprador / Aliado",
        capacitador: "Capacitador / Mentor"
      };
      headerBadge.textContent = typeLabels[profile.userType] || "Emprendedor/a";
    }
  },

  saveProfile() {
    const profile = {
      fullName: document.getElementById("profFullName").value.trim(),
      email: document.getElementById("profEmail").value.trim(),
      userType: document.getElementById("profUserType").value,
      gender: document.getElementById("profGender").value,
      venture: {
        name: document.getElementById("profVentureName").value.trim(),
        description: document.getElementById("profVentureDesc").value.trim(),
        category: document.getElementById("profVentureCategory").value,
        location: document.getElementById("profVentureLocation").value.trim(),
        contactChannel: document.getElementById("profVentureContact").value.trim(),
        responsibleName: document.getElementById("profVentureResponsible").value.trim()
      }
    };

    StorageService.saveUserProfile(profile);
    this.updateProfileHeader(profile);
    App.showToast("Perfil de demostración actualizado correctamente.", "success");
  },

  renderUserProducts() {
    const listContainer = document.getElementById("userProductsList");
    if (!listContainer) return;

    const profile = StorageService.getUserProfile();
    const allProducts = StorageService.getProducts();
    // Filtramos los que pertenecen al usuario activo (o los que tienen ownerId usr_demo_01)
    const currentOwnerId = profile?.id || "usr_demo_01";
    const myProducts = allProducts.filter(p => p.ownerId === currentOwnerId);

    const countElem = document.getElementById("userProductsCount");
    if (countElem) countElem.textContent = `${myProducts.length} publicación(es)`;

    if (myProducts.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i data-lucide="package-plus"></i></div>
          <h4>Aún no has publicado productos</h4>
          <p>Usa la pestaña "Nueva Publicación" para registrar tu primer producto o servicio.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    listContainer.innerHTML = myProducts.map(p => {
      let statusBadgeClass = "badge-status-approved";
      let statusLabel = "Aprobado (Visible en catálogo)";

      if (p.status === "pendiente") {
        statusBadgeClass = "badge-status-pending";
        statusLabel = "Pendiente de revisión administrativa";
      } else if (p.status === "rechazado") {
        statusBadgeClass = "badge-status-rejected";
        statusLabel = "Rechazado / Requiere corrección";
      }

      return `
        <div class="user-product-item">
          <img src="${p.image}" alt="${p.name}" class="user-product-thumb" onerror="this.src='assets/images/epera-cesteria-collage.jpg'">
          
          <div class="user-product-main">
            <div class="user-product-title-row">
              <h4>${p.name}</h4>
              <span class="status-badge ${statusBadgeClass}">${statusLabel}</span>
            </div>
            <p class="user-product-details">
              <strong>Precio:</strong> $${parseFloat(p.price).toFixed(2)} USD | 
              <strong>Categoría:</strong> ${p.category} | 
              <strong>Fecha:</strong> ${new Date(p.createdAt).toLocaleDateString()}
            </p>
            <p class="user-product-desc-short">${p.description}</p>
          </div>

          <div class="user-product-actions">
            <button class="btn btn-secondary btn-sm" onclick="PerfilModule.editProduct('${p.id}')" title="Editar publicación">
              <i data-lucide="edit-3"></i> Editar
            </button>
            <button class="btn btn-danger-outline btn-sm" onclick="PerfilModule.confirmDeleteProduct('${p.id}', '${p.name.replace(/'/g, "\\'")}')" title="Eliminar publicación">
              <i data-lucide="trash-2"></i> Eliminar
            </button>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  },

  editProduct(productId) {
    const product = StorageService.getProductById(productId);
    if (!product) return;

    this.currentEditingProductId = productId;

    // Cambiar a la subpestaña del formulario
    const newTabBtn = document.querySelector('[data-target="subviewNewProduct"]');
    if (newTabBtn) newTabBtn.click();

    // Cambiar título del formulario
    const titleElem = document.getElementById("formProductActionTitle");
    if (titleElem) titleElem.textContent = "Editar Publicación Existente";

    const cancelBtn = document.getElementById("cancelEditProductBtn");
    if (cancelBtn) cancelBtn.classList.remove("hidden");

    // Llenar formulario
    document.getElementById("prodFormName").value = product.name || "";
    document.getElementById("prodFormCategory").value = product.category || "Artesanías";
    document.getElementById("prodFormPrice").value = product.price || "";
    document.getElementById("prodFormImage").value = product.image || "";
    document.getElementById("prodFormDesc").value = product.description || "";
    document.getElementById("prodFormExtended").value = product.extendedDescription || "";
    document.getElementById("prodFormMaterials").value = product.materials || "";
    document.getElementById("prodFormProcess").value = product.elaborationProcess || "";
    document.getElementById("prodFormContact").value = product.contactChannel || "";

    // Desplazar a formulario
    document.getElementById("subviewNewProduct").scrollIntoView({ behavior: "smooth" });
  },

  resetProductForm() {
    this.currentEditingProductId = null;
    const form = document.getElementById("productForm");
    if (form) form.reset();

    const titleElem = document.getElementById("formProductActionTitle");
    if (titleElem) titleElem.textContent = "Crear Nueva Publicación";

    const cancelBtn = document.getElementById("cancelEditProductBtn");
    if (cancelBtn) cancelBtn.classList.add("hidden");
  },

  saveProduct() {
    const profile = StorageService.getUserProfile() || {};
    const ventureName = profile.venture?.name || "Emprendimiento de Demostración";
    const location = profile.venture?.location || "San Lorenzo, Esmeraldas";

    // Si no proporciona imagen, asignamos una imagen demostrativa según categoría
    const category = document.getElementById("prodFormCategory").value;
    let fallbackImg = "assets/images/epera-cesteria-collage.jpg";
    if (category.includes("Alimentos")) fallbackImg = "assets/images/epera-ninos-comunidad.jpg";
    else if (category.includes("Accesorios")) fallbackImg = "assets/images/epera-mujer-chaquiras.jpg";
    else if (category.includes("Servicios")) fallbackImg = "assets/images/epera-danza-musica.jpg";
    else if (category.includes("Selva")) fallbackImg = "assets/images/epera-vestimenta-pareja.jpg";

    const customImg = document.getElementById("prodFormImage").value.trim();

    const productData = {
      name: document.getElementById("prodFormName").value.trim(),
      category: category,
      price: parseFloat(document.getElementById("prodFormPrice").value) || 0,
      image: customImg || fallbackImg,
      description: document.getElementById("prodFormDesc").value.trim(),
      extendedDescription: document.getElementById("prodFormExtended").value.trim(),
      materials: document.getElementById("prodFormMaterials").value.trim(),
      elaborationProcess: document.getElementById("prodFormProcess").value.trim(),
      contactChannel: document.getElementById("prodFormContact").value.trim() || profile.email || "contacto-demo@emprendeigual.ec",
      ventureName: ventureName,
      location: location,
      ownerId: profile.id || "usr_demo_01"
    };

    if (this.currentEditingProductId) {
      productData.id = this.currentEditingProductId;
      // Al editar se conserva el estado original o se pasa a pendiente
      const old = StorageService.getProductById(this.currentEditingProductId);
      productData.status = old ? old.status : "pendiente";
      StorageService.saveProduct(productData);
      App.showToast("Publicación actualizada correctamente.", "success");
    } else {
      StorageService.saveProduct(productData);
      App.showToast("Publicación registrada. Quedará pendiente de aprobación por el administrador.", "success");
    }

    this.resetProductForm();
    this.renderUserProducts();
    CatalogoModule.render();
    AdminModule.updateStats();

    // Cambiar a la pestaña de Mis Publicaciones
    const myPubsBtn = document.querySelector('[data-target="subviewMyProducts"]');
    if (myPubsBtn) myPubsBtn.click();
  },

  confirmDeleteProduct(productId, productName) {
    App.showConfirmModal(
      "Confirmar Eliminación",
      `¿Estás seguro de que deseas eliminar permanentemente la publicación "${productName}"? Esta acción no se puede deshacer.`,
      () => {
        StorageService.deleteProduct(productId);
        this.renderUserProducts();
        CatalogoModule.render();
        AdminModule.updateStats();
        App.showToast("Publicación eliminada correctamente.", "info");
      }
    );
  }
};

window.PerfilModule = PerfilModule;

