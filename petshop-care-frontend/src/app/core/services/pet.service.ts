import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pet } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PetService {
  private url = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  listarMeus(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.url}/meus`);
  }

  listarTodos(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url);
  }

  criar(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url, pet);
  }

  atualizar(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.url}/${id}`, pet);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
