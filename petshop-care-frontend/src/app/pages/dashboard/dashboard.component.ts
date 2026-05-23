import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PetService } from '../../core/services/pet.service';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { ServicoService } from '../../core/services/servico.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalPets = 0;
  totalAgendamentos = 0;
  totalServicos = 0;
  agendamentosHoje = 0;

  constructor(
    public auth: AuthService,
    private petService: PetService,
    private agendamentoService: AgendamentoService,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    const petObs = this.auth.isAtendente() ? this.petService.listarTodos() : this.petService.listarMeus();
    petObs.subscribe(p => this.totalPets = p.length);

    const agObs = this.auth.isAtendente() ? this.agendamentoService.listarTodos() : this.agendamentoService.listarMeus();
    agObs.subscribe(ag => {
      this.totalAgendamentos = ag.length;
      const hoje = new Date().toISOString().split('T')[0];
      this.agendamentosHoje = ag.filter(a => a.dataAgendamento === hoje).length;
    });

    this.servicoService.listarAtivos().subscribe(s => this.totalServicos = s.length);
  }
}
