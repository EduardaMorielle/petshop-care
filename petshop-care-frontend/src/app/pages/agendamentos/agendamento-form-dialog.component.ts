import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { PetService } from '../../core/services/pet.service';
import { ServicoService } from '../../core/services/servico.service';
import { Pet, Servico } from '../../core/models/models';

@Component({
  selector: 'app-agendamento-form-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>Novo Agendamento</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form-grid">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Pet</mat-label>
          <mat-select formControlName="petId">
            @for (pet of pets; track pet.id) {
              <mat-option [value]="pet.id">{{ pet.nome }} ({{ pet.especie }})</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Serviço</mat-label>
          <mat-select formControlName="servicoId">
            @for (s of servicos; track s.id) {
              <mat-option [value]="s.id">{{ s.nome }} — {{ s.preco | currency:'BRL' }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Data</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="dataAgendamento" />
          <mat-datepicker-toggle matSuffix [for]="picker" />
          <mat-datepicker #picker />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Horário (HH:mm)</mat-label>
          <input matInput formControlName="horaAgendamento" placeholder="08:00" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Observações</mat-label>
          <textarea matInput formControlName="observacoes" rows="2"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="form.invalid">
        Agendar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`.full-width { width: 100%; } .form-grid { display: flex; flex-direction: column; gap: 4px; min-width: 450px; }`]
})
export class AgendamentoFormDialogComponent implements OnInit {
  form!: FormGroup;
  pets: Pet[] = [];
  servicos: Servico[] = [];
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private petService: PetService,
    private servicoService: ServicoService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<AgendamentoFormDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      petId: [null, Validators.required],
      servicoId: [null, Validators.required],
      dataAgendamento: [null, Validators.required],
      horaAgendamento: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]],
      observacoes: ['']
    });

    this.petService.listarMeus().subscribe(p => this.pets = p);
    this.servicoService.listarAtivos().subscribe(s => this.servicos = s);
  }

  salvar(): void {
    if (this.form.invalid) return;
    const val = this.form.value;
    const data = val.dataAgendamento instanceof Date
      ? val.dataAgendamento.toISOString().split('T')[0]
      : val.dataAgendamento;

    this.agendamentoService.criar({ ...val, dataAgendamento: data }).subscribe({
      next: () => {
        this.snack.open('Agendamento criado!', 'OK', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err) => this.snack.open(err.error?.erro || 'Erro ao agendar', 'OK', { duration: 3000 })
    });
  }
}
