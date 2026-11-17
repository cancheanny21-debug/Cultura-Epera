/**
 * EmprendeIgual - Módulo de Capacitación Digital
 * 6 Recursos prácticos con modal interactivo, consejos prácticos,
 * contenido educativo y persistencia de avance con barra de progreso.
 */

const CapacitacionModule = {
  activeModuleId: null,

  init() {
    this.render();
    this.updateProgressBar();
  },

  render() {
    const container = document.getElementById("trainingGrid");
    if (!container) return;

    const modules = window.INITIAL_DEMO_DATA.learningModules || [];
    const completedIds = StorageService.getTrainingProgress();

    container.innerHTML = modules.map((mod, index) => {
      const isDone = completedIds.includes(mod.id);

      return `
        <article class="training-card ${isDone ? 'completed' : ''}">
          <div class="training-card-header">
            <span class="training-category">${mod.category}</span>
            <span class="training-duration"><i data-lucide="clock"></i> ${mod.duration}</span>
          </div>

          <div class="training-icon-wrap">
            <i data-lucide="${mod.icon}"></i>
          </div>

          <h3 class="training-title">${index + 1}. ${mod.title}</h3>
          <p class="training-desc">${mod.summary}</p>

          <div class="training-card-footer">
            <button class="btn btn-primary btn-sm" onclick="CapacitacionModule.openModuleModal('${mod.id}')">
              <i data-lucide="book-open"></i> Comenzar
            </button>
            <button class="btn ${isDone ? 'btn-success' : 'btn-outline'} btn-sm" onclick="CapacitacionModule.toggleComplete('${mod.id}')">
              <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}"></i> 
              ${isDone ? 'Completado' : 'Marcar visto'}
            </button>
          </div>
        </article>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
    this.updateProgressBar();
  },

  updateProgressBar() {
    const modules = window.INITIAL_DEMO_DATA.learningModules || [];
    const completed = StorageService.getTrainingProgress();
    const total = modules.length;
    const count = completed.length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

    const barElem = document.getElementById("trainingProgressBar");
    const textElem = document.getElementById("trainingProgressText");
    const countElem = document.getElementById("trainingProgressCount");

    if (barElem) barElem.style.width = `${percentage}%`;
    if (textElem) textElem.textContent = `${percentage}% completado`;
    if (countElem) countElem.textContent = `${count} de ${total} módulos`;
  },

  toggleComplete(moduleId) {
    StorageService.toggleTrainingModule(moduleId);
    this.render();
    const isDone = StorageService.isModuleCompleted(moduleId);
    App.showToast(isDone ? "¡Módulo marcado como completado!" : "Módulo desmarcado.", isDone ? "success" : "info");
  },

  openModuleModal(moduleId) {
    const modules = window.INITIAL_DEMO_DATA.learningModules || [];
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;

    this.activeModuleId = moduleId;
    const isDone = StorageService.isModuleCompleted(moduleId);

    const modalBody = document.getElementById("trainingModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="learning-modal-content">
        <div class="learning-header-meta">
          <span class="badge-category-pill">${mod.category}</span>
          <span class="badge-time"><i data-lucide="clock"></i> Tiempo estimado: ${mod.duration}</span>
        </div>

        <h2 class="learning-title">${mod.title}</h2>
        <p class="learning-lead">${mod.summary}</p>

        <div class="learning-body-text">
          ${mod.fullContent}
        </div>

        <div class="learning-tips-box">
          <h4><i data-lucide="lightbulb"></i> Consejos prácticos para aplicar hoy:</h4>
          <ul>
            ${mod.tips.map(tip => `<li>${tip}</li>`).join("")}
          </ul>
        </div>

        <div class="learning-actions-bar">
          <button class="btn ${isDone ? 'btn-success' : 'btn-primary'}" onclick="CapacitacionModule.toggleFromModal('${mod.id}')">
            <i data-lucide="${isDone ? 'check-circle' : 'check'}"></i> 
            ${isDone ? 'Módulo Completado (Clic para desmarcar)' : 'Marcar como Completado'}
          </button>
          <button class="btn btn-secondary" onclick="App.closeModal('trainingModal')">
            Cerrar lección
          </button>
        </div>
      </div>
    `;

    App.openModal("trainingModal");
    if (window.lucide) window.lucide.createIcons();
  },

  toggleFromModal(moduleId) {
    this.toggleComplete(moduleId);
    this.openModuleModal(moduleId); // Actualiza el botón del modal
  }
};

window.CapacitacionModule = CapacitacionModule;

