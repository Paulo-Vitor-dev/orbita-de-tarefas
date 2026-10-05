import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-item',
  standalone: true,
  templateUrl: './tarefa-item.html',
  styleUrl: './tarefa-item.css'
})
export class TarefaItem {
  @Input({ required: true }) tarefa!: Tarefa;
  @Input() index = 0;
  @Input() removendo = false;

  @Output() alternar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
  @Output() excluir = new EventEmitter<void>();
}
