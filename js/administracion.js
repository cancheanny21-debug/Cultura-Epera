/**
 * EmprendeIgual - Módulo de Administración de Demostración
 * Vista interna de moderación: Aprobar, rechazar publicaciones, revisar reportes,
 * métricas y restablecer base de datos demostrativa.
 */

const AdminModule = {
  currentTab: "publications",

  init() {
    this.bindEvents();
    this.updateStats();
    this.renderAdminProducts();
  },

  bindEvents() {
    // Sub-pestañas de administración (Publicaciones, Reportes de usuarios, Reset)
    const adminNavBtns = document.querySelectorAll(".admin-nav-btn");
    adminNavBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        adminNavBtns.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.currentTab = e.currentTarget.getAttribute("data-tab");
        this.switchTab();
      });
    });

    // Filtro por estado en la tabla de publicaciones administrativas
    const statusFilter = document.getElementById("adminStatusFilter");
    if (statusFilter) {
      statusFilter.addEventListener("change", () => {
        this.renderAdminProducts();
      });
    }

    // Botón para restablecer datos demo
    const resetDataBtn = document.getElementById("adminResetDataBtn");
    if (resetDataBtn) {
      resetDataBtn.addEventListener("click", () => {
        App.showConfirmModal(
          "Restablecer Datos de Demostración",
          "¿Deseas restaurar todas las publicaciones y perfiles a su estado original de fábrica? Se perderán las modificaciones locales de demostración.",
          () => {
            StorageService.resetToDefaults();
            this.updateStats();
            this.renderAdminProducts();
            CatalogoModule.render();
            PerfilModule.loadProfileData();
            PerfilModule.renderUserProducts();
            CapacitacionModule.render();
            App.showToast("Datos de demostración restablecidos correctamente.", "success");
          }
        );
      });
    }
  },

  switchTab() {
    const tabPubs = document.getElementById("adminTabPubs");
    const tabReports = document.getElementById("adminTabReports");

    if (this.currentTab === "publications") {
      if (tabPubs) tabPubs.classList.remove("hidden");
      if (tabReports) tabReports.classList.add("hidden");
      this.renderAdminProducts();
    } else if (this.currentTab === "reports") {
      if (tabPubs) tabPubs.classList.add("hidden");
      if (tabReports) tabReports.classList.remove("hidden");
      this.renderAdminReports();
    }
  },

  updateStats() {
    const products = StorageService.getProducts();
    const total = products.length;
    const pending = products.filter(p => p.status === "pendiente").length;
    const approved = products.filter(p => p.status === "aprobado").length;
    const rejected = products.filter(p => p.status === "rechazado").length;
    const reports = StorageService.getReports().length;

    const elTotal = document.getElementById("statTotalPubs");
    const elPending = document.getElementById("statPendingPubs");
    const elApproved = document.getElementById("statApprovedPubs");
    const elRejected = document.getElementById("statRejectedPubs");
    const elReports = document.getElementById("statReportsCount");

    if (elTotal) elTotal.textContent = total;
    if (elPending) elPending.textContent = pending;
    if (elApproved) elApproved.textContent = approved;
    if (elRejected) elRejected.textContent = rejected;
    if (elReports) elReports.textContent = reports;

    // Actualizar insignia en botón de acceso del header si hay pendientes
    const badge = document.getElementById("adminPendingBadge");
    if (badge) {
      if (pending > 0) {
        badge.textContent = pending;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  },

  renderAdminProducts() {
    const tableBody = document.getElementById("adminProductsTableBody");
    if (!tableBody) return;

    const filterVal = document.getElementById("adminStatusFilter")?.value || "todos";
    let products = StorageService.getProducts();

    if (filterVal !== "todos") {
      products = products.filter(p => p.status === filterVal);
    }

    if (products.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4">
            <p class="text-muted">No hay publicaciones para mostrar con este criterio.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = products.map(p => {
      let statusHtml = '<span class="status-badge badge-status-approved">Aprobada</span>';
      if (p.status === "pendiente") {
        statusHtml = '<span class="status-badge badge-status-pending">Pendiente</span>';
      } else if (p.status === "rechazado") {
        statusHtml = '<span class="status-badge badge-status-rejected">Rechazada</span>';
      }

      return `
        <tr>
          <td>
            <div class="admin-table-product">
              <img src="${p.image}" alt="" class="table-thumb" onerror="this.src='assets/images/epera-cesteria-collage.jpg'">
              <div>
                <strong>${p.name}</strong>
                <span class="d-block text-muted text-sm">${p.id}</span>
              </div>
            </div>
          </td>
          <td>${p.ventureName}</td>
          <td>${p.category}</td>
          <td>$${parseFloat(p.price).toFixed(2)} USD</td>
          <td>${statusHtml}</td>
          <td>
            <div class="table-actions">
              ${p.status !== "aprobado" ? `
                <button class="btn btn-success btn-xs" onclick="AdminModule.changeStatus('${p.id}', 'aprobado')" title="Aprobar publicación">
                  <i data-lucide="check"></i> Aprobar
                </button>
              ` : ''}
              ${p.status !== "rechazado" ? `
                <button class="btn btn-warning btn-xs" onclick="AdminModule.changeStatus('${p.id}', 'rechazado')" title="Rechazar publicación">
                  <i data-lucide="x"></i> Rechazar
                </button>
              ` : ''}
              <button class="btn btn-outline btn-xs" onclick="CatalogoModule.openProductDetails('${p.id}')" title="Ver ficha completa">
                <i data-lucide="eye"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  },

  changeStatus(productId, newStatus) {
    StorageService.updateProductStatus(productId, newStatus);
    this.updateStats();
    this.renderAdminProducts();
    CatalogoModule.render();
    PerfilModule.renderUserProducts();

    const msg = newStatus === "aprobado" 
      ? "Publicación aprobada. Ya es visible en el catálogo público."
      : "Publicación rechazada y ocultada del catálogo público.";
    App.showToast(msg, newStatus === "aprobado" ? "success" : "info");
  },

  renderAdminReports() {
    const container = document.getElementById("adminReportsContainer");
    if (!container) return;

    const reports = StorageService.getReports();

    if (reports.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i data-lucide="shield-check"></i></div>
          <h4>No hay reportes de contenido activos</h4>
          <p>La comunidad y las publicaciones se encuentran dentro de las normas de convivencia e igualdad.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = reports.map(r => `
      <div class="report-card-item">
        <div class="report-header">
          <span class="report-badge"><i data-lucide="flag"></i> ${r.reason}</span>
          <span class="report-date">${new Date(r.date).toLocaleDateString()}</span>
        </div>
        <h4>Publicación reportada: ${r.productName || r.productId}</h4>
        <p class="report-comment">"${r.comments}"</p>
        <p class="report-reporter text-muted text-sm">Reportado por: ${r.reporterEmail || 'Usuario anónimo'}</p>
        <div class="report-actions">
          <button class="btn btn-danger btn-sm" onclick="AdminModule.changeStatus('${r.productId}', 'rechazado')">
            Pausar / Rechazar publicación
          </button>
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  }
};

window.AdminModule = AdminModule;

