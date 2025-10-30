// =============================================================
//  EsToDoList - CRUD básico de tarefas
//  Adaptado para o novo design com Tailwind CSS
// =============================================================

// -------------------------------
// 1. Selecionar os elementos da página
// -------------------------------
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const selectAll = document.getElementById('selectAll');
const emptyState = document.getElementById('emptyState');
const tabButtons = document.querySelectorAll('.tab-btn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Array principal que armazenará todas as tarefas
let tarefas = [];

// Filtro atual (todas, pendentes, concluídas)
let filtroAtual = 'all';

// -------------------------------
// 2. Carregar tarefas salvas no navegador (localStorage)
// -------------------------------
function carregarTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas); // converte o texto salvo em array
        exibirTarefas(tarefas);
    }
    atualizarContador();
    verificarEstadoVazio();
}

// -------------------------------
// 3. Salvar as tarefas no navegador
// -------------------------------
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    atualizarContador();
    verificarEstadoVazio();
}

// -------------------------------
// 4. Função para adicionar uma nova tarefa
// -------------------------------
function adicionarTarefa() {
    const texto = taskInput.value.trim(); // remove espaços extras

    if (texto === '') {
        alert('Digite uma tarefa antes de adicionar!');
        return;
    }

    // Criamos um objeto representando a tarefa
    const novaTarefa = {
        id: Date.now(), // cria um número único com base no tempo atual
        texto: texto,
        concluida: false
    };

    // Adicionamos ao array e salvamos
    tarefas.push(novaTarefa);
    salvarTarefas();

    // Atualizamos a lista exibida
    exibirTarefas(filtrarTarefasPorFiltro());

    // Limpamos o campo de texto
    taskInput.value = '';
    taskInput.focus();
}

// -------------------------------
// 5. Função para exibir as tarefas na tela
// -------------------------------
function exibirTarefas(listaParaMostrar) {
    // Limpamos a lista antes de mostrar novamente
    taskList.innerHTML = '';

    // Percorremos todas as tarefas do array
    for (let tarefa of listaParaMostrar) {
        // Criar um elemento <li> para cada tarefa
        const item = document.createElement('li');
        item.className = `flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
            tarefa.concluida 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
            : 'bg-white border-pink-200 dark:bg-gray-800 dark:border-pink-800'
        }`;

        // Checkbox para marcar como concluída
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.className = 'h-5 w-5 rounded border-pink-300 text-pink-500 focus:ring-pink-400 dark:border-pink-700 dark:bg-gray-700 dark:text-pink-500';
        checkbox.onchange = function() {
            alternarConclusao(tarefa.id);
        };

        // Texto da tarefa
        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefa.texto;
        textoTarefa.className = `flex-grow cursor-pointer transition-all duration-300 ${
            tarefa.concluida 
            ? 'line-through text-gray-500 dark:text-pink-300/60' 
            : 'text-gray-800 dark:text-pink-100'
        }`;
        textoTarefa.onclick = function() {
            alternarConclusao(tarefa.id);
        };

        // Container para os botões
        const botoes = document.createElement('div');
        botoes.className = 'flex gap-2';

        // Botão editar
        const botaoEditar = document.createElement('button');
        botaoEditar.innerHTML = '<i class="fas fa-edit"></i>';
        botaoEditar.className = 'p-2 text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-300';
        botaoEditar.onclick = function() {
            editarTarefa(tarefa.id);
        };

        // Botão excluir
        const botaoExcluir = document.createElement('button');
        botaoExcluir.innerHTML = '<i class="fas fa-trash"></i>';
        botaoExcluir.className = 'p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300';
        botaoExcluir.onclick = function() {
            excluirTarefa(tarefa.id);
        };

        // Montar a estrutura
        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoExcluir);
        
        item.appendChild(checkbox);
        item.appendChild(textoTarefa);
        item.appendChild(botoes);
        
        taskList.appendChild(item);
    }
}

// -------------------------------
// 6. Função para alternar entre concluída e ativa
// -------------------------------
function alternarConclusao(id) {
    for (let tarefa of tarefas) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }
    }
    salvarTarefas();
    exibirTarefas(filtrarTarefasPorFiltro());
}

// -------------------------------
// 7. Função para editar o texto de uma tarefa
// -------------------------------
function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    const novaDescricao = prompt('Edite a tarefa:', tarefa.texto);

    if (novaDescricao === null || novaDescricao.trim() === '') {
        return; // se cancelar ou deixar em branco, não faz nada
    }

    tarefa.texto = novaDescricao.trim();
    salvarTarefas();
    exibirTarefas(filtrarTarefasPorFiltro());
}

// -------------------------------
// 8. Função para excluir uma tarefa
// -------------------------------
function excluirTarefa(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');

    if (confirmar) {
        tarefas = tarefas.filter(function(tarefa) {
            return tarefa.id !== id;
        });
        salvarTarefas();
        exibirTarefas(filtrarTarefasPorFiltro());
    }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
    const termo = searchInput.value.toLowerCase();
    const tarefasFiltradas = filtrarTarefasPorFiltro().filter(function(tarefa) {
        return tarefa.texto.toLowerCase().includes(termo);
    });
    exibirTarefas(tarefasFiltradas);
    verificarEstadoVazio();
}

// -------------------------------
// 10. Filtro: todas / ativas / concluídas
// -------------------------------
function filtrarTarefasPorFiltro() {
    if (filtroAtual === 'all') {
        return tarefas;
    } else if (filtroAtual === 'active') {
        return tarefas.filter(tarefa => !tarefa.concluida);
    } else if (filtroAtual === 'completed') {
        return tarefas.filter(tarefa => tarefa.concluida);
    }
    return tarefas;
}

// -------------------------------
// 11. Atualizar contador de tarefas
// -------------------------------
function atualizarContador() {
    const totalTarefas = tarefas.length;
    const tarefasPendentes = tarefas.filter(t => !t.concluida).length;
    
    taskCount.textContent = totalTarefas;
    
    // Atualizar tooltip com informações detalhadas
    taskCount.title = `${tarefasPendentes} pendentes, ${totalTarefas - tarefasPendentes} concluídas`;
}

// -------------------------------
// 12. Verificar e mostrar/ocultar estado vazio
// -------------------------------
function verificarEstadoVazio() {
    const tarefasVisiveis = taskList.children.length;
    const estaPesquisando = searchInput.value.trim() !== '';
    
    if (tarefasVisiveis === 0) {
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

// -------------------------------
// 13. Limpar tarefas concluídas
// -------------------------------
function limparConcluidas() {
    const confirmar = window.confirm('Tem certeza que deseja excluir todas as tarefas concluídas?');
    
    if (confirmar) {
        tarefas = tarefas.filter(tarefa => !tarefa.concluida);
        salvarTarefas();
        exibirTarefas(filtrarTarefasPorFiltro());
    }
}

// -------------------------------
// 14. Selecionar todas as tarefas
// -------------------------------
function selecionarTodas() {
    const todasConcluidas = tarefas.every(t => t.concluida);
    
    for (let tarefa of tarefas) {
        tarefa.concluida = !todasConcluidas;
    }
    
    salvarTarefas();
    exibirTarefas(filtrarTarefasPorFiltro());
}

// -------------------------------
// 15. Alternar tema claro/escuro (INDEPENDENTE do tema do sistema)
// -------------------------------
function alternarTema() {
    const html = document.documentElement;
    
    // Verificar se atualmente está no tema escuro
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        // Mudar para tema claro
        html.classList.remove('dark');
        themeIcon.classList.remove('fa-sun', 'text-pink-400');
        themeIcon.classList.add('fa-moon', 'text-gray-700');
        localStorage.setItem('tema-preferido', 'claro');
    } else {
        // Mudar para tema escuro
        html.classList.add('dark');
        themeIcon.classList.remove('fa-moon', 'text-gray-700');
        themeIcon.classList.add('fa-sun', 'text-pink-400');
        localStorage.setItem('tema-preferido', 'escuro');
    }
}

// -------------------------------
// 16. Carregar tema salvo (IGNORA o tema do sistema)
// -------------------------------
function carregarTemaSalvo() {
    const temaPreferido = localStorage.getItem('tema-preferido');
    const html = document.documentElement;
    
    // Remover qualquer classe dark inicial (garantir que comece limpo)
    html.classList.remove('dark');
    
    if (temaPreferido === 'escuro') {
        // Aplicar tema escuro se foi a preferência do usuário
        html.classList.add('dark');
        themeIcon.classList.remove('fa-moon', 'text-gray-700');
        themeIcon.classList.add('fa-sun', 'text-pink-400');
    } else {
        // Tema claro é o padrão (não faz nada além de garantir que está claro)
        themeIcon.classList.remove('fa-sun', 'text-pink-400');
        themeIcon.classList.add('fa-moon', 'text-gray-700');
        
        // Se não houver preferência salva, salvar tema claro como padrão
        if (!temaPreferido) {
            localStorage.setItem('tema-preferido', 'claro');
        }
    }
}

// -------------------------------
// 17. Eventos (interações do usuário)
// -------------------------------
addTaskBtn.addEventListener('click', adicionarTarefa);
searchInput.addEventListener('input', pesquisarTarefas);
clearCompleted.addEventListener('click', limparConcluidas);
selectAll.addEventListener('click', selecionarTodas);
themeToggle.addEventListener('click', alternarTema);

// Permitir adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// Eventos para os botões de filtro (tabs)
tabButtons.forEach(botao => {
    botao.addEventListener('click', function() {
        // Remover classe ativa de todos os botões
        tabButtons.forEach(b => b.classList.remove('tab-active', 'bg-white', 'shadow-sm', 'text-pink-600', 'dark:bg-gray-700', 'dark:text-pink-300'));
        
        // Adicionar classe ativa ao botão clicado
        this.classList.add('tab-active', 'bg-white', 'shadow-sm', 'text-pink-600', 'dark:bg-gray-700', 'dark:text-pink-300');
        
        // Atualizar filtro atual
        filtroAtual = this.getAttribute('data-filter');
        
        // Aplicar filtro
        exibirTarefas(filtrarTarefasPorFiltro());
        verificarEstadoVazio();
    });
});

// -------------------------------
// 18. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = function() {
    carregarTarefasSalvas();
    carregarTemaSalvo();
};