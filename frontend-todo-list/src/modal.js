import { state, addTask, updateTask, deleteTask, getTask } from './state.js'
import { render } from './render.js'

let currentEditId = null

export function openTaskModal(taskId = null) {
  currentEditId = taskId
  const task = taskId ? getTask(taskId) : null
  
  const modalHTML = `
    <div class="modal-overlay active" id="taskModal">
      <div class="modal">
        <div class="modal-header">
          <h2>${task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button class="close-btn" id="closeModal">×</button>
        </div>
        <div class="modal-body">
          <form id="taskForm">
            <div class="form-group">
              <label>Título *</label>
              <input type="text" id="title" required value="${task?.title || ''}" />
            </div>
            
            <div class="form-group">
              <label>Descrição</label>
              <textarea id="description">${task?.description || ''}</textarea>
            </div>
            
            <div class="form-group">
              <label>Status</label>
              <div class="status-toggle">
                <button type="button" class="status-btn ${!task || task.status === 'TODO' ? 'active' : ''}" data-status="TODO">TODO</button>
                <button type="button" class="status-btn ${task?.status === 'DOING' ? 'active' : ''}" data-status="DOING">DOING</button>
                <button type="button" class="status-btn ${task?.status === 'DONE' ? 'active' : ''}" data-status="DONE">DONE</button>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Data *</label>
                <input type="date" id="date" required value="${task?.date || ''}" />
              </div>
              <div class="form-group">
                <label>Hora *</label>
                <input type="time" id="time" required value="${task?.time || ''}" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Categoria</label>
              <select id="category">
                <option value="Trabalho" ${task?.category === 'Trabalho' ? 'selected' : ''}>Trabalho</option>
                <option value="Pessoal" ${task?.category === 'Pessoal' ? 'selected' : ''}>Pessoal</option>
                <option value="Saúde" ${task?.category === 'Saúde' ? 'selected' : ''}>Saúde</option>
                <option value="Estudos" ${task?.category === 'Estudos' ? 'selected' : ''}>Estudos</option>
                <option value="Outros" ${task?.category === 'Outros' ? 'selected' : ''}>Outros</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Prioridade</label>
              <div class="priority-buttons">
                ${[1, 2, 3, 4, 5].map(p => `
                  <button type="button" class="priority-btn ${task?.priority === p || (!task && p === 3) ? 'active' : ''}" data-priority="${p}">${p}</button>
                `).join('')}
              </div>
            </div>
            
            <div class="form-group">
              <label>Notificar no horário</label>
              <div class="toggle-switch">
                <div class="switch ${task?.alert ? 'active' : ''}" id="alertSwitch"></div>
                <span>Ativar alerta</span>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary">
              ${task ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
  
  document.body.insertAdjacentHTML('beforeend', modalHTML)
  attachModalListeners()
}

export function openDetailModal(taskId) {
  const task = getTask(taskId)
  if (!task) return
  
  const modalHTML = `
    <div class="modal-overlay active" id="detailModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Detalhes da Tarefa</h2>
          <button class="close-btn" id="closeDetailModal">×</button>
        </div>
        <div class="detail-content">
          <div class="detail-field">
            <div class="detail-label">Título</div>
            <div class="detail-value"><strong>${task.title}</strong></div>
          </div>
          
          <div class="detail-field">
            <div class="detail-label">Descrição</div>
            <div class="detail-value">${task.description || 'Sem descrição'}</div>
          </div>
          
          <div class="detail-field">
            <div class="detail-label">Status</div>
            <div class="detail-value">
              <span class="status-badge ${task.status.toLowerCase()}">${task.status}</span>
            </div>
          </div>
          
          <div class="detail-field">
            <div class="detail-label">Data e Hora</div>
            <div class="detail-value">${task.date} às ${task.time}</div>
          </div>
          
          <div class="detail-field">
            <div class="detail-label">Categoria</div>
            <div class="detail-value">${task.category}</div>
          </div>
          
          <div class="detail-field">
            <div class="detail-label">Prioridade</div>
            <div class="detail-value">${task.priority}/5</div>
          </div>
          
          <div class="detail-field">
            <div class="detail-label">Alerta</div>
            <div class="detail-value">${task.alert ? 'Ativado' : 'Desativado'}</div>
          </div>
          
          <div class="modal-actions">
            <button class="btn btn-secondary" id="editTask">✏️ Editar</button>
            <button class="btn btn-danger" id="deleteTask">🗑️ Excluir</button>
          </div>
        </div>
      </div>
    </div>
  `
  
  document.body.insertAdjacentHTML('beforeend', modalHTML)
  
  document.getElementById('closeDetailModal').addEventListener('click', closeModal)
  document.getElementById('editTask').addEventListener('click', () => {
    closeModal()
    openTaskModal(taskId)
  })
  document.getElementById('deleteTask').addEventListener('click', () => {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
      deleteTask(taskId)
      closeModal()
      render()
    }
  })
  
  document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.id === 'detailModal') closeModal()
  })
}

function attachModalListeners() {
  const modal = document.getElementById('taskModal')
  const form = document.getElementById('taskForm')
  
  // Close
  document.getElementById('closeModal').addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if (e.target.id === 'taskModal') closeModal()
  })
  
  // Status toggle
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
    })
  })
  
  // Priority buttons
  document.querySelectorAll('.priority-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
    })
  })
  
  // Alert switch
  document.getElementById('alertSwitch').addEventListener('click', (e) => {
    e.target.classList.toggle('active')
  })
  
  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const taskData = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.querySelector('.status-btn.active').dataset.status,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      category: document.getElementById('category').value,
      priority: parseInt(document.querySelector('.priority-btn.active').dataset.priority),
      alert: document.getElementById('alertSwitch').classList.contains('active')
    }
    
    if (currentEditId) {
      updateTask(currentEditId, taskData)
    } else {
      addTask(taskData)
    }
    
    closeModal()
    render()
  })
}

function closeModal() {
  const modals = document.querySelectorAll('.modal-overlay')
  modals.forEach(modal => modal.remove())
}
