import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Agendamento, AgendamentoRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private url = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) {}

  criar(data: AgendamentoRequest): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.url, data);
  }

  listarMeus(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.url}/meus`);
  }

  listarTodos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.url);
  }

  listarPorData(data: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.url}/data/${data}`);
  }

  registrarChegada(id: number): Observable<Agendamento> {
    return this.http.patch<Agendamento>(`${this.url}/${id}/chegada`, {});
  }

  iniciar(id: number): Observable<Agendamento> {
    return this.http.patch<Agendamento>(`${this.url}/${id}/iniciar`, {});
  }

  concluir(id: number): Observable<Agendamento> {
    return this.http.patch<Agendamento>(`${this.url}/${id}/concluir`, {});
  }

  cancelar(id: number, motivo: string): Observable<Agendamento> {
    return this.http.patch<Agendamento>(`${this.url}/${id}/cancelar`, { motivo });
  }
}
