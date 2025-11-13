# 📝 EsToDoList - Sistema Completo de Gerenciamento de Tarefas Acadêmicas

Uma aplicação moderna e elegante de lista de tarefas desenvolvida com **HTML**, **Tailwind CSS** e **JavaScript Vanilla**, oferecendo uma experiência completa de gerenciamento de atividades acadêmicas com múltiplas visualizações e persistência local.

**Link da Aplicação:** [aula-11-ia.vercel.app](https://aula-11-ia.vercel.app)

## 🎯 Sobre o Projeto

O **EsToDoList** é um projeto front-end desenvolvido para prática de desenvolvimento web moderno. A aplicação implementa um sistema completo de **CRUD** (Create, Read, Update, Delete) para gerenciamento de tarefas acadêmicas com interface responsiva e três modos de visualização diferentes.

**Objetivo principal:** Demonstrar habilidades em desenvolvimento front-end com foco em código limpo, usabilidade e experiência do usuário para estudantes e profissionais da educação.

## ✨ Funcionalidades

### 🎨 Interface & Design
- ✅ **Design totalmente responsivo** com Tailwind CSS
- 🌙 **Tema claro/escuro** independente do sistema operacional
- 🎀 **Paleta rosa moderna** com combinação preto/rosa no tema escuro
- ⚡ **Animações suaves** e transições fluidas
- ✨ **Ícones Font Awesome** para melhor experiência visual
- 📱 **Design mobile-first** - Totalmente responsivo

### 📋 Gerenciamento de Tarefas (CRUD Completo)
- ➕ **Adicionar tarefas** com título, descrição, data, hora e prioridade
- ✏️ **Editar tarefas** através de modal intuitivo
- 🗑️ **Excluir tarefas** com confirmação de segurança
- ✅ **Marcar como concluída** em todas as visualizações
- 🔄 **Persistência automática** - Salva automaticamente a cada alteração

### 🎯 Sistema de Prioridades e Categorias
- 🚨 **Prioridades visuais**: Alta (vermelho), Média (amarelo), Baixa (verde)
- 📚 **Sistema de disciplinas**: Categorize tarefas por matéria
- 🏷️ **Gerenciamento de categorias**: Adicione, edite e exclua disciplinas

### 📅 Múltiplas Visualizações
#### 📋 **Visualização em Lista**
- Lista tradicional de tarefas com todos os detalhes
- Filtros por status (Todas, Pendentes, Concluídas)
- Ordenação por data, prioridade ou título

#### 🗓️ **Visualização em Calendário**
- Calendário mensial interativo
- Navegação entre meses e anos
- Visualização de tarefas por dia
- Cores indicativas para status das tarefas
- Modal detalhado de tarefas do dia

#### 📊 **Visualização Kanban**
- Quadro com três colunas: Pendentes, Em Progresso, Concluídas
- **Drag & Drop** entre colunas
- Contadores visuais por status
- Cards coloridos com informações resumidas

### 🔔 Sistema de Lembretes
- ⏰ **Lembretes configuráveis**: 30min, 1h ou 1 dia antes
- 🔔 **Notificações do navegador** (com permissão)
- 📅 **Integração com datas e horários**

### 🔍 Sistema de Busca e Filtros
- 🔎 **Pesquisa em tempo real** no título e descrição
- 📂 **Filtros combináveis** - Pesquisa + filtro por status
- 🔄 **Ordenação múltipla**: Data, prioridade, título (asc/desc)

### 📊 Dashboard e Estatísticas
- 📈 **Métricas em tempo real**: Total, Concluídas, Pendentes
- 🎯 **Contadores por status** em todas as visualizações
- 📱 **Cards informativos** com progresso geral

### ⚙️ Funcionalidades Avançadas
- 🌟 **Selecionar todas** as tarefas de uma vez
- 🧹 **Limpar concluídas** em lote
- 💾 **Exportação de dados** em JSON
- 🏆 **Sistema de conquistas** (Pioneiro, Produtivo)
- 🎨 **Tema personalizável** com persistência

## 🛠️ Tecnologias Utilizadas

### Frontend Principal
- **HTML5** - Estrutura semântica e acessível
- **Tailwind CSS v4** (via CDN) - Estilização e utilitários
- **JavaScript ES6+** - Lógica da aplicação
- **CSS3** - Gradients, transitions e custom properties

### Armazenamento & Persistência
- **Web Storage API** - `localStorage` para dados persistentes
- **JSON** - Serialização dos dados das tarefas

### Dependências Externas (via CDN)
- **Font Awesome 6.4.0** - Conjunto de ícones
- **Tailwind CSS Browser** - Framework CSS utility-first

### APIs do Navegador
- **DOM API** - Manipulação dinâmica de elementos
- **Web Notifications API** - Sistema de lembretes
- **Drag & Drop API** - Funcionalidade Kanban
- **Window Object** - Alert, confirm para interações
- **Event Listeners** - Gestão de eventos do usuário

## 🚀 Como Executar

### Método Simples (Recomendado)
1. **Baixe os arquivos** do projeto:
   - `index.html`
   - `script.js`

2. **Abra o arquivo** `index.html` diretamente no seu navegador

### Pré-requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Conexão com internet (para carregar CDNs)
- Permissão para notificações (opcional, para lembretes)

## 📖 Guia de Uso

### 📝 Adicionando Tarefas
1. Clique no botão **"Nova Tarefa"**
2. Preencha o título (obrigatório) e descrição (opcional)
3. Selecione data e hora de vencimento
4. Escolha a prioridade e disciplina
5. Configure lembretes se necessário
6. Clique em **"Salvar"**

### 🔄 Alternando entre Visualizações
- **Lista**: Visualização tradicional com todos os detalhes
- **Calendário**: Visão mensal com tarefas organizadas por data
- **Quadro (Kanban)**: Organização por status com drag & drop

### 🗓️ Usando o Calendário
- Navegue entre meses usando as setas ou selects
- Clique em um dia para ver todas as tarefas
- Tarefas são coloridas por status (atrasadas, hoje, futuras)
- Clique em uma tarefa no calendário para editá-la

### 📊 Trabalhando com o Kanban
- **Arraste e solte** tarefas entre colunas
- Clique em uma tarefa para alternar seu status
- Use os botões de edição e exclusão em cada card
- Visualize contadores por coluna

### 🏷️ Gerenciando Disciplinas
1. Clique no botão **"Disciplinas"** no cabeçalho
2. Adicione novas disciplinas usando o campo de texto
3. Exclua disciplinas (as tarefas serão movidas para "Geral")
4. Use as disciplinas para organizar tarefas por matéria

## 📁 Estrutura do Projeto

```
EsToDoList/
│
├── index.html          # Estrutura principal da aplicação
├── script.js           # Lógica completa JavaScript (CRUD, Calendário, Kanban)
└── README.md           # Este arquivo de documentação
```

## 🔧 Características Técnicas

### Arquitetura da Aplicação
- **Padrão MVC simplificado** → Separação clara de responsabilidades
- **Estado centralizado** → Array `tarefas` como fonte da verdade
- **Manipulação DOM eficiente** → Atualizações seletivas da interface

### Estrutura de Dados
```javascript
// Modelo de uma tarefa
{
  id: Date.now(),              // Identificador único
  texto: "Descrição",          // Título da tarefa
  descricao: "Detalhes",       // Descrição opcional
  prioridade: "media",         // alta, media, baixa
  categoria: "Matemática",     // Disciplina
  concluida: false,            // Status de conclusão
  emProgresso: false,          // Status para Kanban
  dataCriacao: "2024-01-01",   // Data de criação
  dataVencimento: "2024-01-15",// Data de vencimento
  lembrete: true,              // Lembrete ativo
  tempoLembrete: 30            // Minutos antes
}
```

### Sistema de Visualizações
- **Lista**: Renderização dinâmica baseada em filtros
- **Calendário**: Geração dinâmica de grid mensal
- **Kanban**: Sistema de drag & drop nativo

### Sistema de Persistência
- **localStorage** → Armazenamento no navegador
- **Serialização JSON** → Conversão automática dos dados
- **Carregamento automático** → Dados recuperados ao iniciar

## 🌟 Destaques do Código

### Principais Módulos JavaScript
- `inicializarAplicacao()` → Configuração inicial completa
- `exibirCalendario()` → Renderização do calendário interativo
- `exibirKanban()` → Sistema de quadros com drag & drop
- `filtrarTarefas()` → Sistema de busca e ordenação
- `salvarDados()` → Persistência automática

### Funcionalidades Avançadas Implementadas
- **Calendário dinâmico** com navegação completa
- **Sistema Kanban** com drag & drop nativo
- **Modais interativos** para diferentes contextos
- **Sistema de notificações** baseado em tempo
- **Responsividade completa** em todos os componentes

### Tratamento de Erros
- Validação de formulários
- Confirmações para ações destrutivas
- Fallback para estado vazio em todas as visualizações
- Verificação de permissões de notificação

## 🔄 Fluxo de Dados

1. **Entrada** → Modal de tarefa ou ações do usuário
2. **Validação** → Verificação de dados obrigatórios
3. **Processamento** → Atualização do estado central
4. **Persistência** → localStorage com serialização JSON
5. **Renderização** → Atualização da visualização ativa
6. **Feedback** → Atualização de dashboard e contadores

## 🎨 Sistema de Design

- **Design System** → Cores consistentes (rosa/vermelho)
- **Dark Mode** → Tema escuro independente do sistema
- **Typography** → Hierarquia visual clara
- **Componentes Reutilizáveis** → Modais, cards, botões
- **Feedback Visual** → Estados hover, focus em todos os elementos
- **Animações CSS** → Transições suaves em todos os elementos interativos

## 📈 Próximas Melhorias Potenciais

- [ ] Importação de dados
- [ ] Sincronização com nuvem
- [ ] Modo de estudo com Pomodoro
- [ ] Relatórios e estatísticas avançadas
- [ ] Lembretes recorrentes
- [ ] Colaboração entre usuários

---


