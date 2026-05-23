package com.petshopcare.api.model;

import com.petshopcare.api.model.enums.StatusAgendamento;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataAgendamento;

    @Column(nullable = false)
    private LocalTime horaAgendamento;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StatusAgendamento status = StatusAgendamento.AGENDADO;

    @Builder.Default
    private Boolean isEncaixe = false;

    private String justificativaEncaixe;
    private String motivoCancelamento;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Builder.Default
    private LocalDateTime dataCriacao = LocalDateTime.now();

    private LocalTime horaChegada;
    private LocalTime horaInicio;
    private LocalTime horaConclusao;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "atendente_id")
    private Usuario atendente;
}
