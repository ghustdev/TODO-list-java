import { state } from './state.js'
import { openTaskModal, openDetailModal } from './modal.js'

const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
}

function renderDesktopHeader() {
  return `
    <header class="app-header">
      <div class="app-header-content">
        <div class="app-logo">
          <div class="app-logo-icon">${icons.check}</div>
          <div class="app-logo-text">
            <h1>Todo List</h1>
            <p>Organize suas tarefas</p>
          </div>
        </div>
        <nav class="app-header-nav">
          <button class="header-nav-btn ${state.currentTab === 'home' ? 'active' : ''}" data-tab="home">
            <div class="header-nav-icon">${icons.home}</div>
            <span>Home</span>
          </button>
          <button class="header-nav-btn ${state.currentTab === 'today' ? 'active' : ''}" data-tab="today">
            <div class="header-nav-icon">${icons.today}</div>
            <span>Today</span>
          </button>
          <button class="header-nav-btn ${state.currentTab === 'profile' ? 'active' : ''}" data-tab="profile">
            <div class="header-nav-icon">${icons.profile}</div>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    </header>
  `
}

export function render() {
  const app = document.getElementById('app')
  
  let content = ''
  
  if (state.currentTab === 'home') {
    content = renderHome()
  } else if (state.currentTab === 'today') {
    content = renderToday()
  } else if (state.currentTab === 'profile') {
    content = renderProfile()
  }
  
  app.innerHTML = `
    ${renderDesktopHeader()}
    <div class="content-wrapper">
      ${content}
    </div>
    ${renderBottomNav()}
    ${renderFAB()}
  `
  
  attachEventListeners()
}

function renderHome() {
  let tasks = state.tasks
  
  if (state.dateFilter) {
    tasks = tasks.filter(t => t.date === state.dateFilter)
  }
  
  return `
    <div class="header">
      <h1>Todas as Tarefas</h1>
    </div>
    
    <div class="date-filter">
      <input type="date" id="dateFilterInput" value="${state.dateFilter || ''}" />
      ${state.dateFilter ? '<button class="clear-filter" id="clearFilter">✕</button>' : ''}
    </div>
    
    ${renderTaskList(tasks)}
  `
}

function renderToday() {
  const today = new Date().toISOString().split('T')[0]
  const tasks = state.tasks.filter(t => t.date === today)
  
  const dateStr = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  })
  
  return `
    <div class="header">
      <h1>Hoje</h1>
      <div class="date-subtitle">${dateStr}</div>
    </div>
    
    ${renderTaskList(tasks, true)}
  `
}

function renderProfile() {
  const total = state.tasks.length
  const today = new Date().toISOString().split('T')[0]
  const completedToday = state.tasks.filter(t => t.date === today && t.status === 'DONE').length
  const pending = state.tasks.filter(t => t.status !== 'DONE').length
  
  const categories = {}
  state.tasks.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + 1
  })
  
  return `
    <div class="header">
      <h1>Perfil</h1>
    </div>
    
    <div class="profile-header">
      <div class="avatar">${state.userName.charAt(0).toUpperCase()}</div>
      <input 
        type="text" 
        class="profile-name" 
        id="userName" 
        value="${state.userName}"
      />
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${total}</div>
        <div class="stat-label">Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${completedToday}</div>
        <div class="stat-label">Concluídas Hoje</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${pending}</div>
        <div class="stat-label">Pendentes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Object.keys(categories).length}</div>
        <div class="stat-label">Categorias</div>
      </div>
    </div>
    
    <div class="category-list">
      <div class="section-title">Por Categoria</div>
      ${Object.entries(categories).map(([cat, count]) => `
        <div class="category-item">
          <span>${cat}</span>
          <span>${count}</span>
        </div>
      `).join('')}
    </div>
  `
}

function renderTaskList(tasks, isToday = false) {
  if (tasks.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <p>${isToday ? 'Nenhuma tarefa para hoje' : 'Nenhuma tarefa encontrada'}</p>
      </div>
    `
  }
  
  const pending = tasks.filter(t => t.status !== 'DONE').sort((a, b) => b.priority - a.priority)
  const completed = tasks.filter(t => t.status === 'DONE')
  
  let html = ''
  
  if (pending.length > 0) {
    html += '<div class="tasks-section">'
    html += '<div class="section-title">Pendentes</div>'
    html += pending.map(renderTaskCard).join('')
    html += '</div>'
  }
  
  if (completed.length > 0) {
    html += '<div class="tasks-section">'
    html += '<div class="section-title">Concluídas</div>'
    html += completed.map(renderTaskCard).join('')
    html += '</div>'
  }
  
  return html
}

function renderTaskCard(task) {
  return `
    <div class="task-card ${task.status === 'DONE' ? 'done' : ''}" data-id="${task.id}">
      <div class="task-header">
        <div class="task-title">${task.title}</div>
        <div class="priority-badge ${task.priority >= 4 ? 'high' : ''}">${task.priority}</div>
      </div>
      <div class="task-meta">
        <span class="status-badge ${task.status.toLowerCase()}">${task.status}</span>
        <span class="task-time">📅 ${formatDate(task.date)} ${task.time}</span>
        <span class="task-category">🏷️ ${task.category}</span>
      </div>
    </div>
  `
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

function renderBottomNav() {
  return `
    <nav class="bottom-nav">
      <button class="nav-item ${state.currentTab === 'home' ? 'active' : ''}" data-tab="home">
        <div class="nav-icon">${icons.home}</div>
        <span>Home</span>
      </button>
      <button class="nav-item ${state.currentTab === 'today' ? 'active' : ''}" data-tab="today">
        <div class="nav-icon">${icons.today}</div>
        <span>Today</span>
      </button>
      <button class="nav-item ${state.currentTab === 'profile' ? 'active' : ''}" data-tab="profile">
        <div class="nav-icon">${icons.profile}</div>
        <span>Perfil</span>
      </button>
    </nav>
  `
}

function renderFAB() {
  return '<button class="fab" id="fab">+</button>'
}

function attachEventListeners() {
  // Nav items (both desktop and mobile)
  document.querySelectorAll('.nav-item, .header-nav-btn').forEach(item => {
    item.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab
      state.currentTab = tab
      render()
    })
  })
  
  // FAB
  const fab = document.getElementById('fab')
  if (fab) {
    fab.addEventListener('click', () => openTaskModal())
  }
  
  // Task cards
  document.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id
      openDetailModal(id)
    })
  })
  
  // Date filter
  const dateInput = document.getElementById('dateFilterInput')
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      state.dateFilter = e.target.value
      render()
    })
  }
  
  const clearBtn = document.getElementById('clearFilter')
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.dateFilter = null
      render()
    })
  }
  
  // Profile name
  const userName = document.getElementById('userName')
  if (userName) {
    userName.addEventListener('change', (e) => {
      state.userName = e.target.value
    })
  }
}
