import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarefa, TarefaInput } from '../models/tarefa';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getTarefas() {
    return this.http.get<Tarefa[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getTarefa(id: number) {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  criarTarefa(tarefa: TarefaInput) {
    return this.http.post<Tarefa>(this.apiUrl, tarefa).pipe(catchError(this.handleError));
  }

  atualizarTarefa(id: number, tarefa: TarefaInput) {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa).pipe(catchError(this.handleError));
  }

  excluirTarefa(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Não foi possível concluir a operação.';

    if (error.status === 0) {
      message = 'API indisponível. Verifique se o backend está rodando em http://localhost:5188.';
    } else if (typeof error.error === 'string' && error.error.trim()) {
      message = error.error;
    } else if (error.status === 404) {
      message = 'Tarefa não encontrada.';
    } else if (error.status === 400) {
      message = 'Dados inválidos.';
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.error?.title) {
      message = error.error.title;
    }

    return throwError(() => new Error(message));
  }
}
