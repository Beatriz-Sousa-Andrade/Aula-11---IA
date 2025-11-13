// =============================================================
//  EsToDoList - Sistema Completo de Gerenciamento de Tarefas Acadêmicas
//  Versão 3.0 - Calendário Interativo e Kanban
// =============================================================

// -------------------------------
// 1. Seleção de Elementos
// -------------------------------
const taskModal = document.getElementById('taskModal');
const categoriesModal = document.getElementById('categoriesModal');
const dayTasksModal = document.getElementById('dayTasksModal');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDueDate = document.getElementById('taskDueDate');
const taskDueTime = document.getElementById('taskDueTime');
const taskCategory = document.getElementById('taskCategory');
const taskReminder = document.getElementById('taskReminder');
const reminderOptions = document.getElementById('reminderOptions');
const reminderTime = document.getElementById('reminderTime');
const saveTask = document.getElementById('saveTask');
const cancelTask = document.getElementById('cancelTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const viewCategories = document.getElementById('viewCategories');
const addCategory = document.getElementById('addCategory');
const newCategoryName = document.getElementById('newCategoryName');
const closeCategories = document.getElementById('closeCategories');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const selectAll = document.getElementById('selectAll');
const exportData = document.getElementById('exportData');
const emptyState = document.getElementById('emptyState');
const tabButtons = document.querySelectorAll('.tab-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const priorityButtons = document.querySelectorAll('.priority-btn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Elementos do Dashboard
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

// Views
const listView = document.getElementById('listView');
const calendarView = document.getElementById('calendarView');
const kanbanView = document.getElementById('kanbanView');

// Elementos do Calendário
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const prevYear = document.getElementById('prevYear');
const nextYear = document.getElementById('nextYear');
const goToToday = document.getElementById('goToToday');
const calendarDays = document.getElementById('calendarDays');

// Elementos do Modal de Tarefas do Dia
const dayModalTitle = document.getElementById('dayModalTitle');
const dayTasksList = document.getElementById('dayTasksList');
const closeDayModal = document.getElementById('closeDayModal');

// -------------------------------
// 2. Estado da Aplicação
// -------------------------------
let tarefas = [];
let categorias = ['Geral', 'Matemática', 'Português', 'História', 'Ciências'];
let filtroAtual = 'all';
let visualizacaoAtual = 'list';
let tarefaEditando = null;
let prioridadeSelecionada = 'media';

// Estado do Calendário
let dataCalendarioAtual = new Date();
const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// -------------------------------
// 3. Inicialização
// -------------------------------
function inicializarAplicacao() {
    carregarDadosSalvos();
    carregarTemaSalvo();
    configurarEventListeners();
    atualizarInterface();
    configurarDataMinima();
    atualizarBotoesPrioridade();
    configurarDragAndDrop();
    inicializarCalendario();
    
    // Solicitar permissão para notificações
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function configurarDataMinima() {
    const hoje = new Date().toISOString().split('T')[0];
    taskDueDate.min = hoje;
}

function configurarEventListeners() {
    // Modal de Tarefas
    addTaskBtn.addEventListener('click', () => abrirModalTarefa());
    saveTask.addEventListener('click', salvarTarefa);
    cancelTask.addEventListener('click', fecharModalTarefa);
    
    // Modal de Categorias
    viewCategories.addEventListener('click', abrirModalCategorias);
    addCategory.addEventListener('click', adicionarCategoria);
    closeCategories.addEventListener('click', fecharModalCategorias);
    
    // Modal de Tarefas do Dia
    closeDayModal.addEventListener('click', fecharModalDia);
    
    // Filtros e Ordenação
    searchInput.addEventListener('input', filtrarTarefas);
    sortSelect.addEventListener('change', filtrarTarefas);
    
    tabButtons.forEach(botao => {
        botao.addEventListener('click', (e) => alternarFiltro(e));
    });
    
    viewButtons.forEach(botao => {
        botao.addEventListener('click', (e) => alternarVisualizacao(e));
    });
    
    priorityButtons.forEach(botao => {
        botao.addEventListener('click', (e) => selecionarPrioridade(e));
    });
    
    // Ações em Lote
    clearCompleted.addEventListener('click', limparConcluidas);
    selectAll.addEventListener('click', selecionarTodas);
    exportData.addEventListener('click', exportarDados);
    
    // Tema
    themeToggle.addEventListener('click', alternarTema);
    
    // Lembrete
    taskReminder.addEventListener('change', toggleLembrete);
    
    // Contadores de caracteres
    taskTitle.addEventListener('input', atualizarContadorCaracteres);
    taskDescription.addEventListener('input', atualizarContadorCaracteres);
    
    // Calendário
    monthSelect.addEventListener('change', () => navegarCalendario('select'));
    yearSelect.addEventListener('change', () => navegarCalendario('select'));
    prevMonth.addEventListener('click', () => navegarCalendario('prevMonth'));
    nextMonth.addEventListener('click', () => navegarCalendario('nextMonth'));
    prevYear.addEventListener('click', () => navegarCalendario('prevYear'));
    nextYear.addEventListener('click', () => navegarCalendario('nextYear'));
    goToToday.addEventListener('click', () => navegarCalendario('today'));
    
    // Fechar modais ao clicar fora
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) fecharModalTarefa();
    });
    
    categoriesModal.addEventListener('click', (e) => {
        if (e.target === categoriesModal) fecharModalCategorias();
    });
    
    dayTasksModal.addEventListener('click', (e) => {
        if (e.target === dayTasksModal) fecharModalDia();
    });
}

// =============================================================
//  FUNÇÕES DO CALENDÁRIO INTERATIVO
// =============================================================

function inicializarCalendario() {
    preencherSelectsCalendario();
    exibirCalendario();
}

function preencherSelectsCalendario() {
    // Preencher meses
    monthSelect.innerHTML = '';
    meses.forEach((mes, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = mes;
        monthSelect.appendChild(option);
    });
    
    // Preencher anos (de 2020 a 2030)
    yearSelect.innerHTML = '';
    const anoAtual = new Date().getFullYear();
    for (let ano = 2020; ano <= 2030; ano++) {
        const option = document.createElement('option');
        option.value = ano;
        option.textContent = ano;
        yearSelect.appendChild(option);
    }
    
    // Selecionar mês e ano atual
    monthSelect.value = dataCalendarioAtual.getMonth();
    yearSelect.value = dataCalendarioAtual.getFullYear();
}

function exibirCalendario() {
    if (visualizacaoAtual !== 'calendar') return;
    
    // Atualizar selects
    monthSelect.value = dataCalendarioAtual.getMonth();
    yearSelect.value = dataCalendarioAtual.getFullYear();
    
    // Limpar calendário
    calendarDays.innerHTML = '';
    
    // Primeiro dia do mês
    const primeiroDia = new Date(dataCalendarioAtual.getFullYear(), dataCalendarioAtual.getMonth(), 1);
    // Último dia do mês
    const ultimoDia = new Date(dataCalendarioAtual.getFullYear(), dataCalendarioAtual.getMonth() + 1, 0);
    // Dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
    const diaInicio = primeiroDia.getDay();
    
    // Adicionar dias vazios no início
    for (let i = 0; i < diaInicio; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'h-32 bg-gray-50 dark:bg-gray-800 rounded-lg';
        calendarDays.appendChild(emptyDay);
    }
    
    // Adicionar dias do mês
    const hoje = new Date();
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const dayElement = document.createElement('div');
        
        const dataDia = new Date(dataCalendarioAtual.getFullYear(), dataCalendarioAtual.getMonth(), dia);
        const tarefasDoDia = obterTarefasPorData(dataDia);
        const isToday = dataDia.toDateString() === hoje.toDateString();
        const isWeekend = dataDia.getDay() === 0 || dataDia.getDay() === 6;
        
        dayElement.className = `h-32 border rounded-lg p-2 overflow-y-auto transition-all duration-300 cursor-pointer ${
            isToday 
                ? 'bg-pink-100 border-pink-300 dark:bg-pink-900/30 dark:border-pink-700 ring-2 ring-pink-500' 
                : isWeekend
                ? 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600'
        } hover:shadow-md hover:border-pink-300 dark:hover:border-pink-600`;
        
        dayElement.innerHTML = `
            <div class="flex justify-between items-start mb-1">
                <span class="text-sm font-medium ${
                    isToday 
                        ? 'text-pink-700 dark:text-pink-300' 
                        : 'text-gray-700 dark:text-gray-300'
                }">${dia}</span>
                ${tarefasDoDia.length > 0 ? `
                    <span class="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        ${tarefasDoDia.length}
                    </span>
                ` : ''}
            </div>
            <div class="space-y-1 max-h-20 overflow-y-auto">
                ${tarefasDoDia.slice(0, 3).map(tarefa => `
                    <div class="text-xs p-1 rounded cursor-pointer ${getTaskCalendarClass(tarefa)}" 
                         onclick="event.stopPropagation(); abrirModalTarefa(${JSON.stringify(tarefa).replace(/"/g, '&quot;')})">
                        <div class="flex items-center gap-1">
                            <div class="w-1 h-1 rounded-full ${getPriorityDotClass(tarefa.prioridade)}"></div>
                            <span class="truncate flex-1">${tarefa.texto}</span>
                        </div>
                        ${tarefa.dataVencimento ? `
                            <div class="text-xs opacity-75 mt-1">
                                <i class="fas fa-clock mr-1"></i>
                                ${new Date(tarefa.dataVencimento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
                ${tarefasDoDia.length > 3 ? `
                    <div class="text-xs text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 rounded p-1">
                        +${tarefasDoDia.length - 3} mais
                    </div>
                ` : ''}
            </div>
        `;
        
        // Adicionar evento de clique para ver todas as tarefas do dia
        dayElement.addEventListener('click', () => {
            abrirModalTarefasDia(dataDia, tarefasDoDia);
        });
        
        calendarDays.appendChild(dayElement);
    }
    
    verificarEstadoVazio();
}

function obterTarefasPorData(data) {
    return tarefas.filter(tarefa => {
        if (!tarefa.dataVencimento) return false;
        
        const dataTarefa = new Date(tarefa.dataVencimento);
        return dataTarefa.getDate() === data.getDate() &&
               dataTarefa.getMonth() === data.getMonth() &&
               dataTarefa.getFullYear() === data.getFullYear();
    });
}

function getTaskCalendarClass(tarefa) {
    if (tarefa.concluida) {
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    } else {
        const hoje = new Date();
        const dataTarefa = new Date(tarefa.dataVencimento);
        
        if (dataTarefa < hoje) {
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        } else if (dataTarefa.toDateString() === hoje.toDateString()) {
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
        } else {
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        }
    }
}

function getPriorityDotClass(prioridade) {
    return {
        'alta': 'bg-red-500',
        'media': 'bg-yellow-500',
        'baixa': 'bg-green-500'
    }[prioridade] || 'bg-gray-500';
}

function navegarCalendario(acao) {
    switch(acao) {
        case 'prevMonth':
            dataCalendarioAtual.setMonth(dataCalendarioAtual.getMonth() - 1);
            break;
        case 'nextMonth':
            dataCalendarioAtual.setMonth(dataCalendarioAtual.getMonth() + 1);
            break;
        case 'prevYear':
            dataCalendarioAtual.setFullYear(dataCalendarioAtual.getFullYear() - 1);
            break;
        case 'nextYear':
            dataCalendarioAtual.setFullYear(dataCalendarioAtual.getFullYear() + 1);
            break;
        case 'select':
            dataCalendarioAtual = new Date(
                parseInt(yearSelect.value),
                parseInt(monthSelect.value),
                1
            );
            break;
        case 'today':
            dataCalendarioAtual = new Date();
            break;
    }
    exibirCalendario();
}

function abrirModalTarefasDia(data, tarefasDoDia) {
    const dataFormatada = data.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    dayModalTitle.textContent = `Tarefas para ${dataFormatada}`;
    dayTasksList.innerHTML = '';
    
    if (tarefasDoDia.length === 0) {
        dayTasksList.innerHTML = `
            <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                <i class="fas fa-clipboard-list text-4xl mb-3"></i>
                <p>Nenhuma tarefa para este dia</p>
            </div>
        `;
    } else {
        tarefasDoDia.forEach(tarefa => {
            const taskElement = document.createElement('div');
            taskElement.className = `p-3 rounded-lg border transition-all duration-300 ${
                tarefa.concluida 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-white border-pink-200 dark:bg-gray-700 dark:border-pink-800'
            }`;
            
            taskElement.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full ${getPriorityDotClass(tarefa.prioridade)}"></div>
                        <span class="font-medium ${tarefa.concluida ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}">
                            ${tarefa.texto}
                        </span>
                    </div>
                    <div class="flex gap-1">
                        <button class="p-1 text-pink-600 hover:text-pink-800 edit-task" title="Editar">
                            <i class="fas fa-edit text-xs"></i>
                        </button>
                        <button class="p-1 text-red-500 hover:text-red-700 delete-task" title="Excluir">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>
                ${tarefa.descricao ? `
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${tarefa.descricao}</p>
                ` : ''}
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>${tarefa.categoria}</span>
                    <span>
                        <i class="fas fa-clock mr-1"></i>
                        ${new Date(tarefa.dataVencimento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            `;
            
            // Event listeners
            taskElement.querySelector('.edit-task').addEventListener('click', () => {
                fecharModalDia();
                abrirModalTarefa(tarefa);
            });
            
            taskElement.querySelector('.delete-task').addEventListener('click', () => {
                if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                    excluirTarefa(tarefa.id);
                    fecharModalDia();
                }
            });
            
            // Clique na tarefa para marcar como concluída
            taskElement.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    alternarConclusao(tarefa.id);
                    fecharModalDia();
                }
            });
            
            dayTasksList.appendChild(taskElement);
        });
    }
    
    dayTasksModal.classList.remove('hidden');
}

function fecharModalDia() {
    dayTasksModal.classList.add('hidden');
}

// =============================================================
//  FUNÇÕES KANBAN
// =============================================================

function exibirKanban() {
    if (visualizacaoAtual !== 'kanban') return;
    
    const pendingContainer = document.getElementById('pendingTasks');
    const progressContainer = document.getElementById('progressTasks');
    const completedContainer = document.getElementById('completedKanbanTasks');
    
    if (!pendingContainer || !progressContainer || !completedContainer) return;
    
    // Limpar containers
    pendingContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    completedContainer.innerHTML = '';
    
    let pendingCount = 0;
    let progressCount = 0;
    let completedCount = 0;
    
    // Filtrar tarefas conforme o filtro atual
    let tarefasFiltradas = [...tarefas];
    const termoBusca = searchInput.value.toLowerCase();
    
    if (filtroAtual === 'active') {
        tarefasFiltradas = tarefasFiltradas.filter(t => !t.concluida);
    } else if (filtroAtual === 'completed') {
        tarefasFiltradas = tarefasFiltradas.filter(t => t.concluida);
    }
    
    if (termoBusca) {
        tarefasFiltradas = tarefasFiltradas.filter(t => 
            t.texto.toLowerCase().includes(termoBusca) || 
            (t.descricao && t.descricao.toLowerCase().includes(termoBusca))
        );
    }
    
    tarefasFiltradas.forEach(tarefa => {
        const card = criarCardKanban(tarefa);
        
        // Determinar a coluna baseada no status da tarefa
        if (tarefa.concluida) {
            completedContainer.appendChild(card);
            completedCount++;
        } else if (tarefa.emProgresso) {
            progressContainer.appendChild(card);
            progressCount++;
        } else {
            pendingContainer.appendChild(card);
            pendingCount++;
        }
    });
    
    // Atualizar contadores
    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('progressCount').textContent = progressCount;
    document.getElementById('completedCount').textContent = completedCount;
    
    verificarEstadoVazio();
}

function criarCardKanban(tarefa) {
    const card = document.createElement('div');
    card.className = `kanban-card p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
        tarefa.concluida 
        ? 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700' 
        : tarefa.emProgresso
        ? 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700'
        : 'bg-white border-orange-300 dark:bg-gray-700 dark:border-orange-700'
    }`;
    
    card.draggable = true;
    card.dataset.taskId = tarefa.id;
    
    // Indicador de prioridade
    const prioridadeCor = {
        'alta': 'bg-red-500',
        'media': 'bg-yellow-500',
        'baixa': 'bg-green-500'
    }[tarefa.prioridade] || 'bg-gray-500';
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2 flex-1">
                <div class="w-2 h-2 rounded-full ${prioridadeCor} flex-shrink-0 mt-1"></div>
                <span class="text-sm font-medium text-gray-800 dark:text-white break-words">${tarefa.texto}</span>
            </div>
        </div>
        
        ${tarefa.descricao ? `
            <div class="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                ${tarefa.descricao}
            </div>
        ` : ''}
        
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
                ${tarefa.dataVencimento ? `
                    <span class="flex items-center gap-1">
                        <i class="fas fa-calendar"></i>
                        ${formatarData(new Date(tarefa.dataVencimento))}
                    </span>
                ` : ''}
                
                ${tarefa.categoria && tarefa.categoria !== 'geral' ? `
                    <span class="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 px-2 py-1 rounded-full">
                        ${tarefa.categoria}
                    </span>
                ` : ''}
            </div>
            
            <div class="flex gap-1">
                <button class="p-1 text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 edit-task" title="Editar">
                    <i class="fas fa-edit text-xs"></i>
                </button>
                <button class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 delete-task" title="Excluir">
                    <i class="fas fa-trash text-xs"></i>
                </button>
            </div>
        </div>
    `;
    
    // Event listeners
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            alternarStatusKanban(tarefa.id);
        }
    });
    
    card.querySelector('.edit-task').addEventListener('click', (e) => {
        e.stopPropagation();
        abrirModalTarefa(tarefa);
    });
    
    card.querySelector('.delete-task').addEventListener('click', (e) => {
        e.stopPropagation();
        excluirTarefa(tarefa.id);
    });
    
    // Drag and drop
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', tarefa.id);
        card.classList.add('opacity-50');
    });
    
    card.addEventListener('dragend', () => {
        card.classList.remove('opacity-50');
    });
    
    return card;
}

function alternarStatusKanban(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        if (!tarefa.concluida && !tarefa.emProgresso) {
            // Mover para "Em Progresso"
            tarefa.emProgresso = true;
        } else if (tarefa.emProgresso) {
            // Mover para "Concluída"
            tarefa.emProgresso = false;
            tarefa.concluida = true;
        } else {
            // Voltar para "Pendente"
            tarefa.concluida = false;
            tarefa.emProgresso = false;
        }
        
        salvarDados();
        exibirKanban();
        verificarConquistas();
    }
}

function configurarDragAndDrop() {
    const columns = document.querySelectorAll('.kanban-column');
    
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            column.classList.add('bg-gray-100', 'dark:bg-gray-700');
        });
        
        column.addEventListener('dragleave', () => {
            column.classList.remove('bg-gray-100', 'dark:bg-gray-700');
        });
        
        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('bg-gray-100', 'dark:bg-gray-700');
            
            const taskId = parseInt(e.dataTransfer.getData('text/plain'));
            const tarefa = tarefas.find(t => t.id === taskId);
            
            if (tarefa) {
                const columnId = column.id;
                
                if (columnId === 'pendingTasks') {
                    tarefa.concluida = false;
                    tarefa.emProgresso = false;
                } else if (columnId === 'progressTasks') {
                    tarefa.concluida = false;
                    tarefa.emProgresso = true;
                } else if (columnId === 'completedKanbanTasks') {
                    tarefa.concluida = true;
                    tarefa.emProgresso = false;
                }
                
                salvarDados();
                exibirKanban();
                verificarConquistas();
            }
        });
    });
}

// =============================================================
//  FUNÇÕES EXISTENTES (mantidas do código anterior)
// =============================================================

function alternarVisualizacao(e) {
    const botao = e.currentTarget;
    
    viewButtons.forEach(b => {
        b.classList.remove('view-active', 'bg-white', 'shadow-sm', 'text-pink-600', 'dark:bg-gray-700', 'dark:text-pink-300');
        b.classList.add('text-gray-600', 'dark:text-pink-200/70');
    });
    
    botao.classList.add('view-active', 'bg-white', 'shadow-sm', 'text-pink-600', 'dark:bg-gray-700', 'dark:text-pink-300');
    botao.classList.remove('text-gray-600', 'dark:text-pink-200/70');
    
    visualizacaoAtual = botao.dataset.view;
    
    // Mostrar apenas a visualização atual
    listView.classList.toggle('hidden', visualizacaoAtual !== 'list');
    calendarView.classList.toggle('hidden', visualizacaoAtual !== 'calendar');
    kanbanView.classList.toggle('hidden', visualizacaoAtual !== 'kanban');
    
    if (visualizacaoAtual === 'list') {
        filtrarTarefas();
    } else if (visualizacaoAtual === 'calendar') {
        exibirCalendario();
    } else if (visualizacaoAtual === 'kanban') {
        exibirKanban();
    }
}

// ... (mantenha todas as outras funções existentes como:
// abrirModalTarefa, fecharModalTarefa, preencherFormularioTarefa, 
// limparFormularioTarefa, selecionarPrioridade, atualizarBotoesPrioridade,
// toggleLembrete, atualizarContadorCaracteres, salvarTarefa,
// abrirModalCategorias, fecharModalCategorias, atualizarListaCategorias,
// adicionarCategoria, excluirCategoria, atualizarSelectCategorias,
// filtrarTarefas, alternarFiltro, exibirTarefas, alternarConclusao,
// excluirTarefa, agendarLembrete, verificarConquistas, mostrarConquista,
// atualizarDashboard, exportarDados, alternarTema, carregarTemaSalvo,
// carregarDadosSalvos, salvarDados, atualizarInterface, 
// verificarEstadoVazio, limparConcluidas, selecionarTodas,
// formatarData, formatarDataHora)

// =============================================================
//  FUNÇÕES RESTANTES (copie exatamente como estão no seu código original)
// =============================================================

// ... Cole aqui todas as funções que não foram modificadas acima
// desde a função abrirModalTarefa até o final do arquivo

// -------------------------------
// 4. Gerenciamento de Tarefas (RF01-RF04)
// -------------------------------
function abrirModalTarefa(tarefa = null) {
    tarefaEditando = tarefa;
    const modalTitle = document.getElementById('modalTitle');
    
    if (tarefa) {
        modalTitle.textContent = 'Editar Tarefa';
        preencherFormularioTarefa(tarefa);
    } else {
        modalTitle.textContent = 'Nova Tarefa';
        limparFormularioTarefa();
    }
    
    taskModal.classList.remove('hidden');
}

function fecharModalTarefa() {
    taskModal.classList.add('hidden');
    tarefaEditando = null;
    limparFormularioTarefa();
}

function preencherFormularioTarefa(tarefa) {
    taskTitle.value = tarefa.texto || '';
    taskDescription.value = tarefa.descricao || '';
    
    if (tarefa.dataVencimento) {
        const data = new Date(tarefa.dataVencimento);
        taskDueDate.value = data.toISOString().split('T')[0];
        taskDueTime.value = data.toTimeString().slice(0, 5);
    } else {
        taskDueDate.value = '';
        taskDueTime.value = '';
    }
    
    taskCategory.value = tarefa.categoria || 'geral';
    prioridadeSelecionada = tarefa.prioridade || 'media';
    atualizarBotoesPrioridade();
    
    if (tarefa.lembrete) {
        taskReminder.checked = true;
        reminderOptions.classList.remove('hidden');
        reminderTime.value = tarefa.tempoLembrete || '30';
    } else {
        taskReminder.checked = false;
        reminderOptions.classList.add('hidden');
    }
    
    atualizarContadorCaracteres();
}

function limparFormularioTarefa() {
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskDueTime.value = '';
    taskCategory.value = 'geral';
    prioridadeSelecionada = 'media';
    taskReminder.checked = false;
    reminderOptions.classList.add('hidden');
    atualizarBotoesPrioridade();
    atualizarContadorCaracteres();
}

function selecionarPrioridade(e) {
    const botao = e.currentTarget;
    prioridadeSelecionada = botao.dataset.priority;
    atualizarBotoesPrioridade();
}

function atualizarBotoesPrioridade() {
    priorityButtons.forEach(botao => {
        // Remover todas as classes de seleção
        botao.classList.remove(
            'bg-white', 'dark:bg-gray-700', 'shadow-sm',
            'bg-green-50', 'dark:bg-green-900/20',
            'bg-yellow-50', 'dark:bg-yellow-900/20', 
            'bg-red-50', 'dark:bg-red-900/20'
        );
        
        // Adicionar classes baseadas na prioridade selecionada
        if (botao.dataset.priority === prioridadeSelecionada) {
            botao.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm');
        } else {
            // Manter a cor de fundo padrão baseada na prioridade
            switch(botao.dataset.priority) {
                case 'baixa':
                    botao.classList.add('bg-green-50', 'dark:bg-green-900/20');
                    break;
                case 'media':
                    botao.classList.add('bg-yellow-50', 'dark:bg-yellow-900/20');
                    break;
                case 'alta':
                    botao.classList.add('bg-red-50', 'dark:bg-red-900/20');
                    break;
            }
        }
    });
}

function toggleLembrete() {
    if (taskReminder.checked) {
        reminderOptions.classList.remove('hidden');
    } else {
        reminderOptions.classList.add('hidden');
    }
}

function atualizarContadorCaracteres() {
    const titleCount = document.getElementById('titleCount');
    const descCount = document.getElementById('descCount');
    
    if (titleCount) titleCount.textContent = taskTitle.value.length;
    if (descCount) descCount.textContent = taskDescription.value.length;
}

function salvarTarefa() {
    const texto = taskTitle.value.trim();
    
    if (!texto) {
        alert('O título da tarefa é obrigatório!');
        return;
    }
    
    // Construir objeto tarefa
    const tarefa = {
        id: tarefaEditando ? tarefaEditando.id : Date.now(),
        texto: texto,
        descricao: taskDescription.value.trim(),
        prioridade: prioridadeSelecionada,
        categoria: taskCategory.value,
        concluida: tarefaEditando ? tarefaEditando.concluida : false,
        dataCriacao: tarefaEditando ? tarefaEditando.dataCriacao : new Date().toISOString(),
        lembrete: taskReminder.checked,
        tempoLembrete: taskReminder.checked ? parseInt(reminderTime.value) : null
    };
    
    // Data de vencimento
    if (taskDueDate.value) {
        let dataVencimento = new Date(taskDueDate.value);
        if (taskDueTime.value) {
            const [hora, minuto] = taskDueTime.value.split(':');
            dataVencimento.setHours(parseInt(hora), parseInt(minuto));
        }
        tarefa.dataVencimento = dataVencimento.toISOString();
    } else {
        tarefa.dataVencimento = null;
    }
    
    if (tarefaEditando) {
        // Atualizar tarefa existente
        const index = tarefas.findIndex(t => t.id === tarefaEditando.id);
        if (index !== -1) {
            tarefas[index] = tarefa;
        }
    } else {
        // Nova tarefa
        tarefas.push(tarefa);
    }
    
    salvarDados();
    fecharModalTarefa();
    filtrarTarefas();
    
    // Agendar lembrete se necessário
    if (tarefa.lembrete && tarefa.dataVencimento) {
        agendarLembrete(tarefa);
    }
}

// -------------------------------
// 5. Gerenciamento de Categorias (RF14)
// -------------------------------
function abrirModalCategorias() {
    atualizarListaCategorias();
    categoriesModal.classList.remove('hidden');
}

function fecharModalCategorias() {
    categoriesModal.classList.add('hidden');
    newCategoryName.value = '';
}

function atualizarListaCategorias() {
    const container = categoriesModal.querySelector('.space-y-3');
    if (!container) return;
    
    container.innerHTML = '';
    
    categorias.forEach((categoria, index) => {
        if (categoria === 'Geral') return; // Não permitir excluir a categoria geral
        
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg';
        div.innerHTML = `
            <span class="text-gray-700 dark:text-gray-300">${categoria}</span>
            <button class="text-red-500 hover:text-red-700 delete-category" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
    });
    
    // Adicionar event listeners para botões de excluir
    document.querySelectorAll('.delete-category').forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            excluirCategoria(index);
        });
    });
}

function adicionarCategoria() {
    const nome = newCategoryName.value.trim();
    
    if (!nome) {
        alert('Digite um nome para a disciplina!');
        return;
    }
    
    if (categorias.includes(nome)) {
        alert('Esta disciplina já existe!');
        return;
    }
    
    categorias.push(nome);
    salvarDados();
    atualizarSelectCategorias();
    atualizarListaCategorias();
    newCategoryName.value = '';
}

function excluirCategoria(index) {
    const categoria = categorias[index];
    const confirmar = confirm(`Tem certeza que deseja excluir a disciplina "${categoria}"? As tarefas serão movidas para "Geral".`);
    
    if (confirmar) {
        // Mover tarefas para Geral
        tarefas.forEach(tarefa => {
            if (tarefa.categoria === categoria) {
                tarefa.categoria = 'geral';
            }
        });
        
        categorias.splice(index, 1);
        salvarDados();
        atualizarSelectCategorias();
        atualizarListaCategorias();
        filtrarTarefas();
    }
}

function atualizarSelectCategorias() {
    if (!taskCategory) return;
    
    taskCategory.innerHTML = '';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.toLowerCase();
        option.textContent = categoria;
        taskCategory.appendChild(option);
    });
}

// -------------------------------
// 6. Filtros, Busca e Ordenação (RF07-RF09)
// -------------------------------
function filtrarTarefas() {
    let tarefasFiltradas = [...tarefas];
    const termoBusca = searchInput.value.toLowerCase();
    const [campoOrdenacao, direcao] = sortSelect.value.split('-');
    
    // Aplicar filtro de status
    if (filtroAtual === 'active') {
        tarefasFiltradas = tarefasFiltradas.filter(t => !t.concluida);
    } else if (filtroAtual === 'completed') {
        tarefasFiltradas = tarefasFiltradas.filter(t => t.concluida);
    }
    
    // Aplicar busca
    if (termoBusca) {
        tarefasFiltradas = tarefasFiltradas.filter(t => 
            t.texto.toLowerCase().includes(termoBusca) || 
            (t.descricao && t.descricao.toLowerCase().includes(termoBusca))
        );
    }
    
    // Aplicar ordenação
    tarefasFiltradas.sort((a, b) => {
        let valorA, valorB;
        
        switch (campoOrdenacao) {
            case 'dueDate':
                valorA = a.dataVencimento ? new Date(a.dataVencimento) : new Date('9999-12-31');
                valorB = b.dataVencimento ? new Date(b.dataVencimento) : new Date('9999-12-31');
                break;
            case 'priority':
                const prioridades = { alta: 3, media: 2, baixa: 1 };
                valorA = prioridades[a.prioridade] || 0;
                valorB = prioridades[b.prioridade] || 0;
                break;
            case 'title':
                valorA = a.texto.toLowerCase();
                valorB = b.texto.toLowerCase();
                break;
            default:
                return 0;
        }
        
        if (direcao === 'desc') {
            [valorA, valorB] = [valorB, valorA];
        }
        
        if (valorA < valorB) return -1;
        if (valorA > valorB) return 1;
        return 0;
    });
    
    exibirTarefas(tarefasFiltradas);
}

function alternarFiltro(e) {
    const botao = e.currentTarget;
    
    tabButtons.forEach(b => {
        b.classList.remove('tab-active', 'bg-white', 'shadow-sm', 'text-pink-600', 'dark:bg-gray-700', 'dark:text-pink-300');
        b.classList.add('text-gray-600', 'dark:text-pink-200/70');
    });
    
    botao.classList.add('tab-active', 'bg-white', 'shadow-sm', 'text-pink-600', 'dark:bg-gray-700', 'dark:text-pink-300');
    botao.classList.remove('text-gray-600', 'dark:text-pink-200/70');
    
    filtroAtual = botao.dataset.filter;
    filtrarTarefas();
}

// -------------------------------
// 7. Exibição de Tarefas (RF03, RF06)
// -------------------------------
function exibirTarefas(tarefasParaExibir) {
    if (visualizacaoAtual !== 'list') return;
    
    taskList.innerHTML = '';
    
    tarefasParaExibir.forEach(tarefa => {
        const item = document.createElement('li');
        item.className = `flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
            tarefa.concluida 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
            : 'bg-white border-pink-200 dark:bg-gray-800 dark:border-pink-800'
        }`;
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.className = 'h-5 w-5 rounded border-pink-300 text-pink-500 focus:ring-pink-400 dark:border-pink-700 dark:bg-gray-700 dark:text-pink-500 cursor-pointer';
        checkbox.addEventListener('change', () => alternarConclusao(tarefa.id));
        
        // Conteúdo da tarefa
        const conteudo = document.createElement('div');
        conteudo.className = 'flex-grow';
        
        // Cabeçalho com título e prioridade
        const cabecalho = document.createElement('div');
        cabecalho.className = 'flex items-center gap-2 mb-1';
        
        // Indicador de prioridade
        const prioridade = document.createElement('div');
        prioridade.className = `w-2 h-2 rounded-full ${
            tarefa.prioridade === 'alta' ? 'bg-red-500' :
            tarefa.prioridade === 'media' ? 'bg-yellow-500' : 'bg-green-500'
        }`;
        
        const titulo = document.createElement('span');
        titulo.textContent = tarefa.texto;
        titulo.className = `flex-grow cursor-pointer transition-all duration-300 ${
            tarefa.concluida 
            ? 'line-through text-gray-500 dark:text-pink-300/60' 
            : 'text-gray-800 dark:text-pink-100 font-medium'
        }`;
        titulo.addEventListener('click', () => alternarConclusao(tarefa.id));
        
        cabecalho.appendChild(prioridade);
        cabecalho.appendChild(titulo);
        
        // Detalhes (descrição, data, categoria)
        const detalhes = document.createElement('div');
        detalhes.className = 'text-sm text-gray-600 dark:text-gray-400 space-y-1';
        
        if (tarefa.descricao) {
            const desc = document.createElement('div');
            desc.textContent = tarefa.descricao;
            detalhes.appendChild(desc);
        }
        
        const meta = document.createElement('div');
        meta.className = 'flex items-center gap-3 text-xs';
        
        if (tarefa.dataVencimento) {
            const data = new Date(tarefa.dataVencimento);
            const agora = new Date();
            const diffTempo = data - agora;
            const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
            
            const dataElem = document.createElement('span');
            dataElem.className = `flex items-center gap-1 ${
                !tarefa.concluida && diffDias < 0 ? 'text-red-500 font-medium' : ''
            }`;
            dataElem.innerHTML = `<i class="fas fa-calendar"></i> ${formatarData(data)}`;
            meta.appendChild(dataElem);
        }
        
        if (tarefa.categoria && tarefa.categoria !== 'geral') {
            const catElem = document.createElement('span');
            catElem.className = 'flex items-center gap-1';
            catElem.innerHTML = `<i class="fas fa-book"></i> ${tarefa.categoria}`;
            meta.appendChild(catElem);
        }
        
        detalhes.appendChild(meta);
        
        // Botões de ação
        const botoes = document.createElement('div');
        botoes.className = 'flex gap-2';
        
        const botaoEditar = document.createElement('button');
        botaoEditar.innerHTML = '<i class="fas fa-edit"></i>';
        botaoEditar.className = 'p-2 text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-300';
        botaoEditar.addEventListener('click', () => abrirModalTarefa(tarefa));
        
        const botaoExcluir = document.createElement('button');
        botaoExcluir.innerHTML = '<i class="fas fa-trash"></i>';
        botaoExcluir.className = 'p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300';
        botaoExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
        
        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoExcluir);
        
        // Montar estrutura
        conteudo.appendChild(cabecalho);
        conteudo.appendChild(detalhes);
        
        item.appendChild(checkbox);
        item.appendChild(conteudo);
        item.appendChild(botoes);
        
        taskList.appendChild(item);
    });
    
    verificarEstadoVazio();
    atualizarDashboard();
}

function alternarConclusao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarDados();
        filtrarTarefas();
        verificarConquistas();
    }
}

function excluirTarefa(id) {
    const confirmar = confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmar) {
        tarefas = tarefas.filter(t => t.id !== id);
        salvarDados();
        filtrarTarefas();
    }
}

// -------------------------------
// 8. Sistema de Lembretes (RF05)
// -------------------------------
function agendarLembrete(tarefa) {
    if (!tarefa.dataVencimento || !tarefa.lembrete) return;
    
    const dataVencimento = new Date(tarefa.dataVencimento);
    const tempoLembrete = tarefa.tempoLembrete * 60 * 1000; // Converter para milissegundos
    const dataLembrete = new Date(dataVencimento.getTime() - tempoLembrete);
    
    const agora = new Date();
    const diffTempo = dataLembrete - agora;
    
    if (diffTempo > 0) {
        setTimeout(() => {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('EsToDoList - Lembrete', {
                    body: `Tarefa: ${tarefa.texto}\nVencimento: ${formatarDataHora(tarefa.dataVencimento)}`,
                    icon: '/icon.png'
                });
            }
        }, diffTempo);
    }
}

// -------------------------------
// 9. Sistema de Conquistas (RF10)
// -------------------------------
function verificarConquistas() {
    const conquistas = JSON.parse(localStorage.getItem('conquistas') || '{}');
    const totalConcluidas = tarefas.filter(t => t.concluida).length;
    
    // Conquista: Pioneiro
    if (totalConcluidas >= 1 && !conquistas.pioneiro) {
        conquistas.pioneiro = true;
        mostrarConquista('Pioneiro', 'Concluiu a primeira tarefa! 🎉');
    }
    
    // Conquista: Produtivo
    if (totalConcluidas >= 10 && !conquistas.produtivo) {
        conquistas.produtivo = true;
        mostrarConquista('Produtivo', 'Concluiu 10 tarefas! ⚡');
    }
    
    localStorage.setItem('conquistas', JSON.stringify(conquistas));
}

function mostrarConquista(titulo, descricao) {
    // Implementação simples de conquista - pode ser melhorada com UI
    console.log(`Conquista desbloqueada: ${titulo} - ${descricao}`);
}

// -------------------------------
// 10. Dashboard e Estatísticas (RF11-RF12)
// -------------------------------
function atualizarDashboard() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    
    totalTasks.textContent = total;
    completedTasks.textContent = concluidas;
    pendingTasks.textContent = pendentes;
    taskCount.textContent = total;
}

// -------------------------------
// 11. Exportação de Dados (RF17)
// -------------------------------
function exportarDados() {
    const dados = {
        tarefas: tarefas,
        categorias: categorias,
        exportadoEm: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estodolist-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// -------------------------------
// 12. Tema (RF13)
// -------------------------------
function alternarTema() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        themeIcon.classList.remove('fa-sun', 'text-pink-400');
        themeIcon.classList.add('fa-moon', 'text-gray-700');
        localStorage.setItem('tema-preferido', 'claro');
    } else {
        html.classList.add('dark');
        themeIcon.classList.remove('fa-moon', 'text-gray-700');
        themeIcon.classList.add('fa-sun', 'text-pink-400');
        localStorage.setItem('tema-preferido', 'escuro');
    }
}

function carregarTemaSalvo() {
    const temaPreferido = localStorage.getItem('tema-preferido');
    const html = document.documentElement;
    
    if (temaPreferido === 'escuro') {
        html.classList.add('dark');
        themeIcon.classList.remove('fa-moon', 'text-gray-700');
        themeIcon.classList.add('fa-sun', 'text-pink-400');
    } else {
        html.classList.remove('dark');
        themeIcon.classList.remove('fa-sun', 'text-pink-400');
        themeIcon.classList.add('fa-moon', 'text-gray-700');
        
        if (!temaPreferido) {
            localStorage.setItem('tema-preferido', 'claro');
        }
    }
}

// -------------------------------
// 13. Persistência de Dados (RF16)
// -------------------------------
function carregarDadosSalvos() {
    // Carregar tarefas
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    
    // Carregar categorias
    const categoriasSalvas = localStorage.getItem('categorias');
    if (categoriasSalvas) {
        categorias = JSON.parse(categoriasSalvas);
    }
    
    atualizarSelectCategorias();
}

function salvarDados() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('categorias', JSON.stringify(categorias));
    atualizarInterface();
}

// -------------------------------
// 14. Funções Auxiliares
// -------------------------------
function atualizarInterface() {
    filtrarTarefas();
    atualizarDashboard();
}

function verificarEstadoVazio() {
    let temTarefas = false;
    
    if (visualizacaoAtual === 'list') {
        temTarefas = taskList.children.length > 0;
    } else if (visualizacaoAtual === 'calendar') {
        const calendarDays = document.getElementById('calendarDays');
        temTarefas = calendarDays ? calendarDays.children.length > 0 : false;
    } else if (visualizacaoAtual === 'kanban') {
        const pendingCount = parseInt(document.getElementById('pendingCount')?.textContent || '0');
        const progressCount = parseInt(document.getElementById('progressCount')?.textContent || '0');
        const completedCount = parseInt(document.getElementById('completedCount')?.textContent || '0');
        temTarefas = (pendingCount + progressCount + completedCount) > 0;
    }
    
    const estaPesquisando = searchInput.value.trim() !== '';
    
    if (!temTarefas) {
        emptyState.classList.remove('hidden');
        if (estaPesquisando) {
            emptyState.querySelector('h3').textContent = 'Nenhuma tarefa encontrada';
            emptyState.querySelector('p').textContent = 'Tente alterar os termos da pesquisa';
        } else {
            emptyState.querySelector('h3').textContent = 'Nenhuma tarefa encontrada';
            emptyState.querySelector('p').textContent = 'Adicione uma tarefa para começar';
        }
    } else {
        emptyState.classList.add('hidden');
    }
}

function limparConcluidas() {
    const confirmar = confirm('Tem certeza que deseja excluir todas as tarefas concluídas?');
    if (confirmar) {
        tarefas = tarefas.filter(tarefa => !tarefa.concluida);
        salvarDados();
        filtrarTarefas();
    }
}

function selecionarTodas() {
    const todasConcluidas = tarefas.every(t => t.concluida);
    tarefas.forEach(tarefa => tarefa.concluida = !todasConcluidas);
    salvarDados();
    filtrarTarefas();
}

// Funções auxiliares de formatação
function formatarData(data) {
    return data.toLocaleDateString('pt-BR');
}

function formatarDataHora(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
}

// -------------------------------
// 15. Inicialização
// -------------------------------
document.addEventListener('DOMContentLoaded', inicializarAplicacao);