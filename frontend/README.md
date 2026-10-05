# Órbita de Tarefas — Front-End Angular

Front-End da aplicação **Órbita de Tarefas**, preparado para consumir a API REST em ASP.NET Core.

## Stack

- Angular
- TypeScript
- HTML
- CSS
- Angular HttpClient
- RxJS

A estrutura foi mantida enxuta e sem dependências da plataforma usada para gerar a versão visual de referência.

## Integração com o backend

Durante o desenvolvimento o Angular usa `proxy.conf.json` para encaminhar todas as chamadas iniciadas por `/api` para:

```text
http://localhost:5188
```

O serviço de tarefas usa:

```text
/api/tarefas
```

Com o backend em `http://localhost:5188` e o Angular em `http://localhost:4200`, o proxy evita a necessidade de configurar CORS apenas para o desenvolvimento local via `ng serve`.

Endpoints esperados:

- `GET /api/tarefas`
- `GET /api/tarefas/{id}`
- `POST /api/tarefas`
- `PUT /api/tarefas/{id}`
- `DELETE /api/tarefas/{id}`

Modelo esperado:

```ts
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
}
```

## Como executar

1. Inicie a API ASP.NET Core na porta 5188.
2. Instale as dependências do Front-End:

```bash
npm install
```

3. Inicie o Angular:

```bash
npm start
```

4. Acesse:

```text
http://localhost:4200
```

## Estrutura principal

```text
src/app/
├── components/
│   ├── dialog/
│   ├── tarefa-form/
│   └── tarefa-item/
├── models/
│   └── tarefa.ts
├── services/
│   └── tarefa.service.ts
├── app.config.ts
├── app.css
├── app.html
└── app.ts
```

## Funcionalidades preparadas

- listagem de tarefas via API;
- estados de carregamento, vazio e erro;
- filtros: todas, pendentes e concluídas;
- criação de tarefa;
- edição de tarefa;
- conclusão/reabertura;
- exclusão com confirmação;
- feedback por toast;
- resumo de total, pendentes e concluídas;
- integração local por proxy com o backend .NET.
