import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ServicoService } from '../../core/services/servico.service';
import { Servico } from '../../core/models/models';

@Component({
  selector: 'app-servico-form-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Novo' }} Serviço</h2>
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
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="descricao" rows="2"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Duração (minutos)</mat-label>
          <input matInput formControlName="duracaoMinutos" type="number" min="1" />
          @if (form.get('duracaoMinutos')?.hasError('min')) {
            <mat-error>Deve ser maior que zero</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Preço (R$)</mat-label>
          <input matInput formControlName="preco" type="number" min="0.01" step="0.01" />
          @if (form.get('preco')?.hasError('min')) {
            <mat-error>Preço deve ser positivo</mat-error>
          }
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
export class ServicoFormDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicoService: ServicoService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<ServicoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Servico | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [this.data?.nome || '', Validators.required],
      descricao: [this.data?.descricao || ''],
      duracaoMinutos: [this.data?.duracaoMinutos || '', [Validators.required, Validators.min(1)]],
      preco: [this.data?.preco || '', [Validators.required, Validators.min(0.01)]]
    });
  }

  salvar(): void {
    if (this.form.invalid) return;
    const obs = this.data?.id
      ? this.servicoService.atualizar(this.data.id, this.form.value)
      : this.servicoService.criar(this.form.value);

    obs.subscribe({
      next: () => {
        this.snack.open('Serviço salvo!', 'OK', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err) => this.snack.open(err.error?.erro || 'Erro ao salvar', 'OK', { duration: 3000 })
    });
  }
}
