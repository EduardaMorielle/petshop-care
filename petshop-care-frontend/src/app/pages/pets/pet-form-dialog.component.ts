import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PetService } from '../../core/services/pet.service';
import { Pet } from '../../core/models/models';

@Component({
  selector: 'app-pet-form-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Novo' }} Pet</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form-grid">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="nome" />
          @if (form.get('nome')?.hasError('required')) {
            <mat-error>Nome é obrigatório</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Espécie</mat-label>
          <mat-select formControlName="especie">
            <mat-option value="CAO">🐶 Cão</mat-option>
            <mat-option value="GATO">🐱 Gato</mat-option>
            <mat-option value="AVE">🐦 Ave</mat-option>
            <mat-option value="ROEDOR">🐹 Roedor</mat-option>
            <mat-option value="OUTROS">🐾 Outros</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Raça</mat-label>
          <input matInput formControlName="raca" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Idade (anos)</mat-label>
          <input matInput formControlName="idade" type="number" min="0" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Observações</mat-label>
          <textarea matInput formControlName="observacoes" rows="3"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="form.invalid">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`.full-width { width: 100%; } .form-grid { display: flex; flex-direction: column; gap: 4px; min-width: 400px; }`]
})
export class PetFormDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<PetFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [this.data?.nome || '', Validators.required],
      especie: [this.data?.especie || '', Validators.required],
      raca: [this.data?.raca || ''],
      idade: [this.data?.idade || null],
      observacoes: [this.data?.observacoes || '']
    });
  }

  salvar(): void {
    if (this.form.invalid) return;
    const obs = this.data?.id
      ? this.petService.atualizar(this.data.id, this.form.value)
      : this.petService.criar(this.form.value);

    obs.subscribe({
      next: () => {
        this.snack.open('Pet salvo com sucesso!', 'OK', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err) => this.snack.open(err.error?.erro || 'Erro ao salvar', 'OK', { duration: 3000 })
    });
  }
}
