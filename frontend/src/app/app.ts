import { Component, inject, OnInit } from '@angular/core';
import { Dialog } from './components/dialog/dialog';
import { TarefaForm } from './components/tarefa-form/tarefa-form';
import { TarefaItem } from './components/tarefa-item/tarefa-item';
import { Tarefa, TarefaInput } from './models/tarefa';
import { TarefaService } from './services/tarefa.service';

type Status = 'loading' | 'ok' | 'erro';
type Filtro = 'todas' | 'pendentes' | 'concluidas';
type ToastTipo = 'ok' | 'erro';
interface Toast { id: number; tipo: ToastTipo; msg: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarefaItem, TarefaForm, Dialog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly tarefaService = inject(TarefaService);

  tarefas: Tarefa[] = [];
  status: Status = 'loading';
  erroMsg = '';
  filtro: Filtro = 'todas';
  formAberto = false;
  tarefaEdicao: Tarefa | null = null;
  confirmar: Tarefa | null = null;
  removendo: number | null = null;
  toasts: Toast[] = [];
  salvando = false;
  erroForm = '';

  ngOnInit(): void {
    this.carregar();
  }

  get total(): number { return this.tarefas.length; }
  get concluidas(): number { return this.tarefas.filter((t) => t.concluida).length; }
  get pendentes(): number { return this.total - this.concluidas; }
  get progresso(): number { return this.total ? this.concluidas / this.total : 0; }
  get progressoPercentual(): number { return this.progresso * 100; }
  get circunferenciaProgresso(): number { return 2 * Math.PI * 140 * this.progresso; }

  get tarefasVisiveis(): Tarefa[] {
    if (this.filtro === 'concluidas') return this.tarefas.filter((t) => t.concluida);
    if (this.filtro === 'pendentes') return this.tarefas.filter((t) => !t.concluida);
    return this.tarefas;
  }

  carregar(): void {
    this.status = 'loading';
    this.erroMsg = '';
    this.tarefaService.getTarefas().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
        this.status = 'ok';
      },
      error: (error: Error) => {
        this.erroMsg = error.message;
        this.status = 'erro';
      }
    });
  }

  abrirNova(): void {
    this.erroForm = '';
    this.tarefaEdicao = null;
    this.formAberto = true;
  }

  abrirEdicao(tarefa: Tarefa): void {
    this.erroForm = '';
    this.tarefaEdicao = tarefa;
    this.formAberto = true;
  }

  fecharForm(): void {
    this.formAberto = false;
    this.tarefaEdicao = null;
    this.erroForm = '';
  }

  salvar(dados: TarefaInput): void {
    this.salvando = true;
    this.erroForm = '';

    const requisicao = this.tarefaEdicao
      ? this.tarefaService.atualizarTarefa(this.tarefaEdicao.id, dados)
      : this.tarefaService.criarTarefa(dados);

    requisicao.subscribe({
      next: (tarefa) => {
        if (this.tarefaEdicao) {
          this.tarefas = this.tarefas.map((item) => item.id === tarefa.id ? tarefa : item);
          this.toast('ok', 'Tarefa atualizada.');
        } else {
          this.tarefas = [tarefa, ...this.tarefas];
          this.toast('ok', 'Tarefa criada.');
        }
        this.salvando = false;
        this.fecharForm();
      },
      error: (error: Error) => {
        this.salvando = false;
        this.erroForm = error.message;
      }
    });
  }

  alternar(tarefa: Tarefa): void {
    const anterior = tarefa;
    const atualizada: Tarefa = { ...tarefa, concluida: !tarefa.concluida };
    this.tarefas = this.tarefas.map((item) => item.id === tarefa.id ? atualizada : item);

    const { id, ...dados } = atualizada;
    this.tarefaService.atualizarTarefa(id, dados).subscribe({
      next: () => this.toast('ok', atualizada.concluida ? 'Tarefa concluída.' : 'Tarefa reaberta.'),
      error: (error: Error) => {
        this.tarefas = this.tarefas.map((item) => item.id === anterior.id ? anterior : item);
        this.toast('erro', `Erro ao atualizar: ${error.message}`);
      }
    });
  }

  pedirExclusao(tarefa: Tarefa): void {
    this.confirmar = tarefa;
  }

  excluir(): void {
    if (!this.confirmar) return;
    const tarefa = this.confirmar;
    this.confirmar = null;

    this.tarefaService.excluirTarefa(tarefa.id).subscribe({
      next: () => {
        this.removendo = tarefa.id;
        setTimeout(() => {
          this.tarefas = this.tarefas.filter((item) => item.id !== tarefa.id);
          this.removendo = null;
        }, 280);
        this.toast('ok', 'Tarefa excluída.');
      },
      error: (error: Error) => this.toast('erro', `Erro ao excluir: ${error.message}`)
    });
  }

  definirFiltro(filtro: Filtro): void {
    this.filtro = filtro;
  }

  private toast(tipo: ToastTipo, msg: string): void {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    this.toasts = [...this.toasts, { id, tipo, msg }];
    setTimeout(() => {
      this.toasts = this.toasts.filter((item) => item.id !== id);
    }, 3800);
  }
}
