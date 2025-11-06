# 📝 EsToDoList

Uma aplicação moderna e elegante de lista de tarefas desenvolvida com **HTML**, **Tailwind CSS** e **JavaScript Vanilla**, oferecendo uma experiência completa de gerenciamento de atividades com persistência local.

link: aula-11-ia.vercel.app

## 🎯 Sobre o Projeto

O **EsToDoList** é um projeto front-end desenvolvido para prática de desenvolvimento web moderno. A aplicação implementa um sistema completo de **CRUD** (Create, Read, Update, Delete) para gerenciamento de tarefas com interface responsiva e persistência de dados no navegador.

**Objetivo principal:** Demonstrar habilidades em desenvolvimento front-end com foco em código limpo, usabilidade e experiência do usuário.

## ✨ Funcionalidades

### 🎨 Interface & Design

- ✅ **Design totalmente responsivo** com Tailwind CSS
- 🌙 **Tema claro/escuro** independente do sistema operacional
- 🎀 **Paleta rosa moderna** com combinação preto/rosa no tema escuro
- ⚡ **Animações suaves** e transições fluidas
- ✨ **Ícones Font Awesome** para melhor experiência visual

### 📋 Gerenciamento de Tarefas

- ➕ **Adicionar tarefas** via campo de entrada ou tecla Enter
- 🗑️ **Excluir tarefas** com confirmação de segurança
- ✅ **Marcar como concluída** (clique no texto ou checkbox)
- ✏️ **Editar tarefas** através de prompt nativo
- 📊 **Contador de tarefas** em tempo real
- 🔄 **Persistência automática** - Salva automaticamente a cada alteração
- ⌨️ **Atalhos de teclado** - Enter para adicionar tarefas

### 🔍 Filtros & Busca

- 🔎 **Pesquisa em tempo real** nas tarefas
- 📂 **Filtros por status**: Todas, Pendentes, Concluídas
- 🔗 **Filtros combináveis** - Pesquisa + filtro por status funcionam juntos
- 💾 **Persistência automática** com localStorage

### ⚡ Funcionalidades Avançadas

- 🌟 **Selecionar todas** as tarefas de uma vez
- 🧹 **Limpar concluídas** em lote
- 🎯 **Estado vazio dinâmico** com mensagens contextuais
- 🔄 **Atualizações em tempo real** da interface
- 📱 **Design mobile-first** - Totalmente responsivo
- 🔔 **Confirmações de segurança** para ações destrutivas

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
- **Window Object** - Alert, confirm, prompt para interações
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

## 📖 Guia de Uso

### 📝 Adicionando Tarefas

1. Digite a tarefa no campo "Digite uma tarefa aqui:"
2. Pressione `Enter` ou clique no botão `+` (ícone de adição)

### 🎯 Gerenciando Tarefas Individuais

- **Concluir/Reabrir**: Clique no texto da tarefa ou no checkbox
- **Editar**: Clique no ícone ✏️ (lápis) → abre um prompt de edição
- **Excluir**: Clique no ícone 🗑️ (lixeira) → solicita confirmação

### 🔍 Filtrando e Pesquisando

- **Pesquisar**: Use o campo com ícone de lupa 🔎
- **Filtrar por status**:
  - **Todas** → Exibe todas as tarefas
  - **Pendentes** → Apenas tarefas não concluídas  
  - **Concluídas** → Apenas tarefas finalizadas

### ⚙️ Funcionalidades em Lote

- **Selecionar Todas**: Marca/desmarca todas as tarefas
- **Limpar Concluídas**: Remove todas as tarefas finalizadas (com confirmação)

### 🎨 Personalização de Tema

- Clique no botão no **canto superior direito** para alternar entre tema claro e escuro
- Sua preferência é salva automaticamente

## 📁 Estrutura do Projeto

```
EsToDoList/
│
├── index.html          # Estrutura principal da aplicação
├── script.js           # Lógica completa JavaScript
└── README.md           # Este arquivo de documentação
```

### Arquivos Referenciados

- `../static/style.css` → Estilos adicionais (se existir)
- CDNs externas para Tailwind CSS e Font Awesome

## 🔧 Características Técnicas

### Arquitetura da Aplicação

- **Padrão MVC simplificado** → Separação clara de responsabilidades
- **Estado centralizado** → Array `tarefas` como fonte da verdade
- **Manipulação DOM eficiente** → Atualizações seletivas da interface

### Estrutura de Dados

```javascript
// Modelo de uma tarefa
{
  id: Date.now(),        // Identificador único baseado em timestamp
  texto: "Descrição",    // Conteúdo da tarefa
  concluida: false       // Status de conclusão
}
```

### Sistema de Persistência

- **localStorage** → Armazenamento no navegador
- **Serialização JSON** → Conversão automática dos dados
- **Carregamento automático** → Dados recuperados ao iniciar

### Sistema de Tema

- **Independente do SO** → Não segue preferência do sistema
- **Persistente** → Preferência salva no `localStorage`
- **Ícones dinâmicos** → Lua para claro, Sol para escuro

## 🎨 Personalização

### Cores e Tema

O projeto utiliza uma paleta rosa personalizável:

```html
class="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-950"
```

### Modificando Cores

Para alterar a paleta de cores, modifique as classes Tailwind no `index.html`:

```html
class="bg-blue-500" em vez de "bg-pink-500"
class="text-blue-600" em vez de "text-pink-600"
```

### Customização Avançada

- **Layout**: Ajuste classes de espaçamento (`p`, `m`, `gap`)
- **Tamanhos**: Modifique utilitários de tamanho (`text`, `w`, `h`)
- **Animações**: Controle durações (`duration`) e transições

## 🌟 Destaques do Código

### Principais Funções JavaScript

- `carregarTarefasSalvas()` → Recuperação de dados persistentes
- `salvarTarefas()` → Persistência automática no `localStorage`  
- `exibirTarefas()` → Renderização eficiente da interface
- `filtrarTarefasPorFiltro()` → Sistema de filtros combináveis

### Tratamento de Erros

- Validação de entrada vazia
- Confirmações para ações destrutivas
- Fallback para estado vazio

### Performance

- **Atualizações otimizadas** → Re-renderização apenas quando necessário
- **Event listeners eficientes** → Delegation pattern implícito
- **Armazenamento leve** → Dados minimalistas no `localStorage`

## 🔄 Fluxo de Dados

1. **Entrada** → Campo de texto + botão/Enter
2. **Processamento** → Validação → Criação objeto → Array push
3. **Persistência** → JSON.stringify → localStorage
4. **Renderização** → Filtragem → DOM manipulation
5. **Feedback** → Atualização contador → Estado vazio

## 🎪 Sistema de Design

- **Design System** → Cores consistentes (rosa/vermelho)
- **Dark Mode** → Tema escuro independente do sistema
- **Typography** → Hierarquia visual clara
- **Spacing** → Escala consistente de margins e paddings
- **Feedback Visual** → Estados hover, focus e active em todos os elementos
- **Animações CSS** → Transições suaves em todos os elementos interativos
