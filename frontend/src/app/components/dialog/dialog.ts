import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class Dialog {
  @Input({ required: true }) titulo = '';
  @Output() fechar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.fechar.emit();
  }
}
