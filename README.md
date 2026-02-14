# TODO List Java

Projeto de gerenciamento de tarefas via linha de comando (CLI), desenvolvido em Java com persistencia em arquivo CSV. O objetivo e oferecer um fluxo simples para cadastrar, listar, editar e remover tarefas.

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
