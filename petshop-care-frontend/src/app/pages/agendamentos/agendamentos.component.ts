import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { PetService } from '../../core/services/pet.service';
import { ServicoService } from '../../core/services/servico.service';
import { AuthService } from '../../core/services/auth.service';
import { Agendamento, Pet, Servico } from '../../core/models/models';
import { AgendamentoFormDialogComponent } from './agendamento-form-dialog.component';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule, MatSnackBarModule, MatTooltipModule
  ],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {
  displayedColumns = ['data', 'pet', 'servico', 'status', 'preco', 'acoes'];
  dataSource = new MatTableDataSource<Agendamento>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public auth: AuthService,
    private agendamentoService: AgendamentoService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const obs = this.auth.isAtendente()
      ? this.agendamentoService.listarTodos()
      : this.agendamentoService.listarMeus();

    obs.subscribe(ag => {
      this.dataSource.data = ag;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirFormulario(): void {
    const ref = this.dialog.open(AgendamentoFormDialogComponent, { width: '550px' });
    ref.afterClosed().subscribe(result => { if (result) this.carregar(); });
  }

  registrarChegada(ag: Agendamento): void {
    this.agendamentoService.registrarChegada(ag.id!).subscribe({
      next: () => { this.snack.open('Chegada registrada!', 'OK', { duration: 2000 }); this.carregar(); },
      error: () => this.snack.open('Erro ao registrar chegada', 'OK', { duration: 3000 })
    });
  }

  iniciar(ag: Agendamento): void {
    this.agendamentoService.iniciar(ag.id!).subscribe({
      next: () => { this.snack.open('Atendimento iniciado!', 'OK', { duration: 2000 }); this.carregar(); },
      error: () => this.snack.open('Erro', 'OK', { duration: 3000 })
    });
  }

  concluir(ag: Agendamento): void {
    this.agendamentoService.concluir(ag.id!).subscribe({
      next: () => { this.snack.open('Atendimento concluído!', 'OK', { duration: 2000 }); this.carregar(); },
      error: () => this.snack.open('Erro', 'OK', { duration: 3000 })
    });
  }

  cancelar(ag: Agendamento): void {
    const motivo = prompt('Motivo do cancelamento:');
    if (motivo === null) return;
    this.agendamentoService.cancelar(ag.id!, motivo).subscribe({
      next: () => { this.snack.open('Agendamento cancelado', 'OK', { duration: 2000 }); this.carregar(); },
      error: () => this.snack.open('Erro ao cancelar', 'OK', { duration: 3000 })
    });
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      AGENDADO: 'agendado', AGUARDANDO: 'aguardando',
      EM_ATENDIMENTO: 'em-atendimento', CONCLUIDO: 'concluido',
      CANCELADO_CLIENTE: 'cancelado', CANCELADO_PETSHOP: 'cancelado'
    };
    return map[status] || '';
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      AGENDADO: 'Agendado', AGUARDANDO: 'Aguardando',
      EM_ATENDIMENTO: 'Em Atendimento', CONCLUIDO: 'Concluído',
      CANCELADO_CLIENTE: 'Cancelado', CANCELADO_PETSHOP: 'Cancelado'
    };
    return map[status] || status;
  }
}
