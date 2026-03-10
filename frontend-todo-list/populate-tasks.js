// Script para popular localStorage com 30 tarefas de exemplo
const today = new Date().toISOString().split('T')[0]

const sampleTasks = [
  { title: 'Reunião com equipe', description: 'Discutir progresso do projeto', status: 'TODO', time: '09:00', category: 'Trabalho', priority: 5, alert: true },
  { title: 'Revisar código do PR #123', description: 'Verificar implementação de autenticação', status: 'DOING', time: '10:00', category: 'Trabalho', priority: 4, alert: false },
  { title: 'Almoço com cliente', description: 'Restaurante italiano', status: 'TODO', time: '12:30', category: 'Trabalho', priority: 3, alert: true },
  { title: 'Academia', description: 'Treino de pernas', status: 'TODO', time: '18:00', category: 'Saúde', priority: 4, alert: true },
  { title: 'Estudar JavaScript', description: 'Capítulo sobre Promises', status: 'DOING', time: '20:00', category: 'Estudos', priority: 5, alert: false },
  { title: 'Ligar para mãe', description: 'Conversar sobre fim de semana', status: 'TODO', time: '19:00', category: 'Pessoal', priority: 3, alert: true },
  { title: 'Comprar mantimentos', description: 'Lista: leite, pão, frutas', status: 'TODO', time: '17:00', category: 'Pessoal', priority: 2, alert: false },
  { title: 'Preparar apresentação', description: 'Slides para reunião de sexta', status: 'TODO', time: '14:00', category: 'Trabalho', priority: 5, alert: false },
  { title: 'Meditar 15 minutos', description: 'Aplicativo Calm', status: 'DONE', time: '07:00', category: 'Saúde', priority: 3, alert: false },
  { title: 'Responder emails', description: 'Caixa de entrada com 23 emails', status: 'DOING', time: '08:30', category: 'Trabalho', priority: 4, alert: false },
  { title: 'Ler 30 páginas do livro', description: 'Atomic Habits', status: 'TODO', time: '21:00', category: 'Estudos', priority: 2, alert: false },
  { title: 'Pagar conta de luz', description: 'Vencimento hoje', status: 'TODO', time: '11:00', category: 'Pessoal', priority: 5, alert: true },
  { title: 'Fazer backup do projeto', description: 'Subir para GitHub', status: 'TODO', time: '16:00', category: 'Trabalho', priority: 3, alert: false },
  { title: 'Beber 2L de água', description: 'Manter hidratação', status: 'DOING', time: '13:00', category: 'Saúde', priority: 3, alert: false },
  { title: 'Organizar mesa de trabalho', description: 'Limpar e organizar cabos', status: 'DONE', time: '07:30', category: 'Pessoal', priority: 1, alert: false },
  { title: 'Revisar documentação da API', description: 'Atualizar endpoints', status: 'TODO', time: '15:00', category: 'Trabalho', priority: 4, alert: false },
  { title: 'Assistir aula online', description: 'Curso de TypeScript - Módulo 3', status: 'TODO', time: '20:30', category: 'Estudos', priority: 4, alert: true },
  { title: 'Alongamento', description: '10 minutos de stretching', status: 'TODO', time: '18:30', category: 'Saúde', priority: 2, alert: false },
  { title: 'Planejar sprint', description: 'Definir tarefas da próxima semana', status: 'TODO', time: '16:30', category: 'Trabalho', priority: 5, alert: false },
  { title: 'Jantar saudável', description: 'Preparar salada e frango', status: 'TODO', time: '19:30', category: 'Saúde', priority: 3, alert: false },
  { title: 'Atualizar portfólio', description: 'Adicionar projeto Todo List', status: 'TODO', time: '21:30', category: 'Trabalho', priority: 2, alert: false },
  { title: 'Café da manhã', description: 'Ovos e frutas', status: 'DONE', time: '07:15', category: 'Saúde', priority: 2, alert: false },
  { title: 'Daily standup', description: 'Reunião diária com time', status: 'DONE', time: '09:30', category: 'Trabalho', priority: 4, alert: false },
  { title: 'Revisar pull requests', description: '3 PRs pendentes de review', status: 'TODO', time: '11:30', category: 'Trabalho', priority: 4, alert: false },
  { title: 'Fazer lista de compras', description: 'Planejar compras da semana', status: 'DONE', time: '08:00', category: 'Pessoal', priority: 1, alert: false },
  { title: 'Testar nova feature', description: 'Sistema de notificações', status: 'TODO', time: '13:30', category: 'Trabalho', priority: 5, alert: false },
  { title: 'Caminhada 30min', description: 'Parque próximo de casa', status: 'TODO', time: '17:30', category: 'Saúde', priority: 3, alert: true },
  { title: 'Assistir tutorial', description: 'Vídeo sobre Clean Code', status: 'TODO', time: '22:00', category: 'Estudos', priority: 2, alert: false },
  { title: 'Limpar inbox', description: 'Arquivar emails antigos', status: 'TODO', time: '14:30', category: 'Trabalho', priority: 2, alert: false },
  { title: 'Jogar videogame', description: 'Relaxar 1 hora', status: 'TODO', time: '22:30', category: 'Pessoal', priority: 1, alert: false }
]

const tasks = sampleTasks.map((task, index) => ({
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  date: today,
  ...task
}))

const data = {
  tasks: tasks,
  userName: 'Usuário'
}

localStorage.setItem('todolist_data', JSON.stringify(data))
console.log('✅ 30 tarefas criadas para hoje!')
console.log('🔄 Recarregue a página para ver as tarefas')
