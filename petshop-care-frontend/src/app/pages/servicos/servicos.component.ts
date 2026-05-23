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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServicoService } from '../../core/services/servico.service';
import { AuthService } from '../../core/services/auth.service';
import { Servico } from '../../core/models/models';
import { ServicoFormDialogComponent } from './servico-form-dialog.component';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatDialogModule, MatSnackBarModule, MatChipsModule, MatTooltipModule
  ],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {
  displayedColumns = ['nome', 'descricao', 'duracao', 'preco', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Servico>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public auth: AuthService,
    private servicoService: ServicoService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const obs = this.auth.isAdmin() ? this.servicoService.listarTodos() : this.servicoService.listarAtivos();
    obs.subscribe(servicos => {
      this.dataSource.data = servicos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirFormulario(servico?: Servico): void {
    const ref = this.dialog.open(ServicoFormDialogComponent, {
      width: '500px',
      data: servico || null
    });
    ref.afterClosed().subscribe(result => { if (result) this.carregar(); });
  }

  alterarStatus(servico: Servico): void {
    this.servicoService.alterarStatus(servico.id!, !servico.ativo).subscribe({
      next: () => { this.snack.open('Status atualizado!', 'OK', { duration: 2000 }); this.carregar(); },
      error: () => this.snack.open('Erro ao atualizar status', 'OK', { duration: 3000 })
    });
  }

  deletar(servico: Servico): void {
    if (!confirm(`Remover serviço "${servico.nome}"?`)) return;
    this.servicoService.deletar(servico.id!).subscribe({
      next: () => { this.snack.open('Serviço removido!', 'OK', { duration: 2000 }); this.carregar(); },
      error: () => this.snack.open('Erro ao remover', 'OK', { duration: 3000 })
    });
  }
}
