import { Component } from '@angular/core';
import { Tarefa } from './models/tarefa';
import { TarefaItem } from './components/tarefa-item/tarefa-item';

@Component({
  selector: 'app-root',
  imports: [TarefaItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = 'Minhas tarefas';

  tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Estudar Angular',
      descricao: 'Aprender os fundamentos do Front-End',
      concluida: false
    },
    {
      id: 2,
      titulo: 'Integrar com a API',
      descricao: 'Conectar Angular ao ASP.NET Core',
      concluida: false
    },
    {
      id: 3,
      titulo: 'Finalizar interface',
      descricao: 'Construir a interface do Órbita de Tarefas',
      concluida: true
    }
  ];
}