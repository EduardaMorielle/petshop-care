import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Servico } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ServicoService {
  private url = `${environment.apiUrl}/servicos`;

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.url);
  }

  listarTodos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.url}/todos`);
  }

  criar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.url, servico);
  }

  atualizar(id: number, servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.url}/${id}`, servico);
  }

  alterarStatus(id: number, ativo: boolean): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}/status?ativo=${ativo}`, {});
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
