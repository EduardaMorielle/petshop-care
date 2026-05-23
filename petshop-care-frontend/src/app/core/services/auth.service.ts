import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, RegistroRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('email', res.email);
        localStorage.setItem('perfil', res.perfil);
      })
    );
  }

  registrar(data: RegistroRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/registrar`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('email', res.email);
        localStorage.setItem('perfil', res.perfil);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNome(): string {
    return localStorage.getItem('nome') || '';
  }

  getPerfil(): string {
    return localStorage.getItem('perfil') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getPerfil() === 'ADMINISTRADOR';
  }

  isAtendente(): boolean {
    return this.getPerfil() === 'ATENDENTE' || this.isAdmin();
  }
}
