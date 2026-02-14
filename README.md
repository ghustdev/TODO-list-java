# TODO List Java

Projeto de gerenciamento de tarefas via linha de comando (CLI), desenvolvido em Java puro com persistencia em arquivo CSV, utilizando a arquitetura MVC (Model-View-Controller) simplificada com uma camada extra de repository. O objetivo e oferecer um fluxo simples para cadastrar, listar, editar e remover tarefas.

### Breve explicação sobre MVC e as camada do projeto
#### Model (O Dado)
É a classe Tarefa. Ela não tem lógica de salvamento ou menus. Sua única função é definir o que é uma tarefa (ID, Nome, Status, etc.).

#### View / CLI (A Interface)
É a classe TaskManager (Main) e as CLIs. Ela cuida exclusivamente da interação com o usuário.

Responsabilidade: Mostrar o menu, ler o que o usuário digita (Scanner) e exibir os resultados na tela (System.out.println).

Regra: Ela não sabe que existe um arquivo CSV; ela apenas pede coisas para o Service.

#### Controller/Service (A Lógica de Negócio)
É o "cérebro" da aplicação (TaskService).

Responsabilidade: Aqui é onde as decisões são tomadas. Por exemplo: "Qual será o próximo ID?" e funções intermediárias para maior controle entre CLI e a persistência.

Ponto Chave: Se você precisasse de uma regra que diz que "não pode ter duas tarefas com o mesmo nome", essa regra ficaria aqui.

#### repository (A Persistência)
É a camada que lida com o mundo externo (TaskRepository).

Responsabilidade: Ler e escrever no arquivo tasks.csv (escolhi CSV, pois a implementação é nativa do Java puro).

Isolamento: Se no futuro você quiser mudar de CSV para um Banco de Dados SQL ou para um arquivo JSON, você só mexe aqui. O restante do sistema nem perceberia a mudança.

## Funcionalidades
- Cadastro de tarefas com nome, descricao, data final, prioridade, categoria e status.
- Listagem de tarefas armazenadas.
- Editção de tarefas (ainda não implementado)
- Filtragem de trarefas (ainda não implementado)
- Exclusao de tarefas por ID.
- Persistencia local em `tasks.csv`.

## Estrutura do projeto
- `src/main/TaskManager.java`: ponto de entrada da aplicacao (Main).
- `src/view/Interface.java`: interface CLI e fluxo de menus.
- `src/services/TaskService.java`: regras de negocio.
- `src/repository/TaskRepository.java`: leitura e escrita em arquivo.
- `src/model/Task.java` e `src/model/TaskStatus.java`: modelo de dados.

## Requisitos
- Java 8+ (recomendado 11+).

## Como executar
1) Abra o projeto na sua IDE (ex.: IntelliJ).
2) Execute a classe `main.TaskManager`.

Observacao: as opcoes de editar, quantidade por status e filtro por data ainda nao estao implementadas no codigo.

## Uso basico
Ao iniciar, o menu principal permite:
- Adicionar tarefa.
- Listar tarefas.
- Deletar tarefa (por ID).

## Persistencia
As tarefas sao salvas em `tasks.csv`, no formato:
```
id;nome;descricao;data_final;prioridade;categoria;status
```

## Adicionar no futuro
- Implementar edicao de tarefas.
- Implementar filtro por data e quantidade por status.
Validacoes adicionais e mensagens mais detalhadas (está bem simples ainda).

## Licenca
Este projeto esta sob a licenca de `Gustavo Cardoso` e `Acelera ZG`.
