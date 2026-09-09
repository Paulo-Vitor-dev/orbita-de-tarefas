import { Component, input } from '@angular/core';
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-item',
  imports: [],
  templateUrl: './tarefa-item.html',
  styleUrl: './tarefa-item.css',
})
export class TarefaItem {
  tarefa = input.required<Tarefa>();
}