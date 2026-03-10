const STORAGE_KEY = 'todolist_data'

export const state = {
  tasks: [],
  currentTab: 'today',
  dateFilter: null,
  userName: 'Usuário',
  alertedTasks: new Set()
}

// Load from localStorage
export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const data = JSON.parse(saved)
    state.tasks = data.tasks || []
    state.userName = data.userName || 'Usuário'
  }
}

// Save to localStorage
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    tasks: state.tasks,
    userName: state.userName
  }))
}

export function addTask(task) {
  state.tasks.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...task
  })
  saveState()
}

export function updateTask(id, updates) {
  const index = state.tasks.findIndex(t => t.id === id)
  if (index !== -1) {
    state.tasks[index] = { ...state.tasks[index], ...updates }
    saveState()
  }
}

export function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id)
  saveState()
}

export function getTask(id) {
  return state.tasks.find(t => t.id === id)
}

export function setTab(tab) {
  state.currentTab = tab
}

export function setDateFilter(date) {
  state.dateFilter = date
}

export function clearDateFilter() {
  state.dateFilter = null
}

export function setUserName(name) {
  state.userName = name
  saveState()
}
