import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'pets', loadComponent: () => import('./pages/pets/pets.component').then(m => m.PetsComponent) },
      { path: 'servicos', loadComponent: () => import('./pages/servicos/servicos.component').then(m => m.ServicosComponent) },
      { path: 'agendamentos', loadComponent: () => import('./pages/agendamentos/agendamentos.component').then(m => m.AgendamentosComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
