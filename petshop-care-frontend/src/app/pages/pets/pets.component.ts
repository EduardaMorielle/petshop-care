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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PetService } from '../../core/services/pet.service';
import { AuthService } from '../../core/services/auth.service';
import { Pet } from '../../core/models/models';
import { PetFormDialogComponent } from './pet-form-dialog.component';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDialogModule, MatSnackBarModule, MatTooltipModule
  ],
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  displayedColumns = ['nome', 'especie', 'raca', 'idade', 'acoes'];
  dataSource = new MatTableDataSource<Pet>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private petService: PetService,
    public auth: AuthService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const obs = this.auth.isAtendente() ? this.petService.listarTodos() : this.petService.listarMeus();
    obs.subscribe(pets => {
      this.dataSource.data = pets;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirFormulario(pet?: Pet): void {
    const ref = this.dialog.open(PetFormDialogComponent, {
      width: '500px',
      data: pet || null
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.carregar();
    });
  }

  deletar(pet: Pet): void {
    if (!confirm(`Remover ${pet.nome}?`)) return;
    this.petService.deletar(pet.id!).subscribe({
      next: () => {
        this.snack.open('Pet removido!', 'OK', { duration: 2000 });
        this.carregar();
      },
      error: () => this.snack.open('Erro ao remover pet', 'OK', { duration: 3000 })
    });
  }

  especieLabel(especie: string): string {
    const map: Record<string, string> = {
      CAO: '🐶 Cão', GATO: '🐱 Gato', AVE: '🐦 Ave',
      ROEDOR: '🐹 Roedor', OUTROS: '🐾 Outros'
    };
    return map[especie] || especie;
  }
}
