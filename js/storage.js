/**
 * EmprendeIgual - Gestor de Almacenamiento Local (localStorage)
 * Maneja la persistencia de productos, perfiles, progresos y reportes.
 */

const STORAGE_KEYS = {
  PRODUCTS: "emprendeigual_products_epera_v3",
  USER_PROFILE: "emprendeigual_user_profile_epera_v3",
  TRAINING_PROGRESS: "emprendeigual_training_progress_epera_v3",
  ACADEMIC_VALIDATIONS: "emprendeigual_validations_epera_v3",
  REPORTS: "emprendeigual_reports_epera_v3",
  INITIALIZED: "emprendeigual_initialized_epera_v3"
};

const StorageService = {
  /**
   * Inicializa el almacenamiento con datos de la Nacionalidad Épera
   */
  init() {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInitialized) {
      this.resetToDefaults();
    }
  },

  /**
   * Restablece todos los datos a la versión inicial de demostración Épera.
   */
  resetToDefaults() {
    const demo = window.INITIAL_DEMO_DATA;
    if (!demo) {
      console.error("INITIAL_DEMO_DATA no está disponible.");
      return;
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(demo.products));
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(demo.defaultUserProfile));
    // Inicializar progreso de capacitación (módulo 1 completado por defecto)
    localStorage.setItem(STORAGE_KEYS.TRAINING_PROGRESS, JSON.stringify(["mod_01"]));
    localStorage.setItem(STORAGE_KEYS.ACADEMIC_VALIDATIONS, JSON.stringify(demo.academicValidations));
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
    console.log("Almacenamiento inicializado con datos de la Nacionalidad Épera.");
  },

  // ---------------- GESTIÓN DE PRODUCTOS ----------------

  getProducts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error al leer productos de localStorage:", e);
      return [];
    }
  },

  getApprovedProducts() {
    return this.getProducts().filter(p => p.status === "aprobado");
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  saveProduct(productData) {
    const products = this.getProducts();
    if (productData.id) {
      // Editar existente
      const index = products.findIndex(p => p.id === productData.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData, updatedAt: new Date().toISOString() };
      } else {
        products.push(productData);
      }
    } else {
      // Crear nuevo
      const newProduct = {
        ...productData,
        id: "prod_epera_" + Date.now(),
        createdAt: new Date().toISOString(),
        status: "pendiente" // Nuevos quedan pendientes de moderación
      };
      products.unshift(newProduct);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return products;
  },

  deleteProduct(productId) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return products;
  },

  updateProductStatus(productId, newStatus) {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
      product.status = newStatus;
      product.moderatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      return true;
    }
    return false;
  },

  // ---------------- GESTIÓN DE PERFIL DE USUARIO ----------------

  getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error al leer perfil:", e);
      return null;
    }
  },

  saveUserProfile(profileData) {
    const current = this.getUserProfile() || {};
    const updated = { ...current, ...profileData, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    return updated;
  },

  // ---------------- GESTIÓN DE CAPACITACIÓN ----------------

  getTrainingProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRAINING_PROGRESS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleTrainingModule(moduleId) {
    let progress = this.getTrainingProgress();
    if (progress.includes(moduleId)) {
      progress = progress.filter(id => id !== moduleId);
    } else {
      progress.push(moduleId);
    }
    localStorage.setItem(STORAGE_KEYS.TRAINING_PROGRESS, JSON.stringify(progress));
    return progress;
  },

  isModuleCompleted(moduleId) {
    const progress = this.getTrainingProgress();
    return progress.includes(moduleId);
  },

  // ---------------- REPORTES Y MODERACIÓN ----------------

  getReports() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addReport(reportData) {
    const reports = this.getReports();
    const newReport = {
      ...reportData,
      id: "rep_" + Date.now(),
      date: new Date().toISOString()
    };
    reports.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    return newReport;
  },

  // ---------------- VALIDACIONES ACADÉMICAS ----------------

  getValidations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACADEMIC_VALIDATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveValidation(valData) {
    const validations = this.getValidations();
    const newEntry = {
      ...valData,
      id: "val_" + Date.now(),
      date: new Date().toISOString().split("T")[0]
    };
    validations.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.ACADEMIC_VALIDATIONS, JSON.stringify(validations));
    return newEntry;
  }
};

window.StorageService = StorageService;
