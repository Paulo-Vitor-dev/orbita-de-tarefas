import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa, TarefaInput } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css'
})
export class TarefaForm implements OnChanges {
  @Input() inicial: Tarefa | null = null;
  @Input() enviando = false;
  @Input() erroExterno = '';

  @Output() salvar = new EventEmitter<TarefaInput>();
  @Output() cancelar = new EventEmitter<void>();

  titulo = '';
  descricao = '';
  concluida = false;
  erro = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inicial']) {
      this.titulo = this.inicial?.titulo ?? '';
      this.descricao = this.inicial?.descricao ?? '';
      this.concluida = this.inicial?.concluida ?? false;
      this.erro = '';
    }
  }

  enviar(): void {
    const titulo = this.titulo.trim();
    if (!titulo) {
      this.erro = 'O título da tarefa é obrigatório.';
      return;
    }

    this.erro = '';
    this.salvar.emit({
      titulo,
      descricao: this.descricao.trim(),
      concluida: this.concluida
    });
  }
}
