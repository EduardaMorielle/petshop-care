package com.petshopcare.api.dto;

import com.petshopcare.api.model.enums.StatusAgendamento;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class AgendamentoResponseDTO {
    private Long id;
    private LocalDate dataAgendamento;
    private LocalTime horaAgendamento;
    private StatusAgendamento status;
    private Boolean isEncaixe;
    private String observacoes;
    private String motivoCancelamento;
    private LocalDateTime dataCriacao;
    private LocalTime horaChegada;
    private LocalTime horaInicio;
    private LocalTime horaConclusao;
    private Long clienteId;
    private String clienteNome;
    private Long petId;
    private String petNome;
    private Long servicoId;
    private String servicoNome;
    private Double servicoPreco;
    private Long atendenteId;
    private String atendenteNome;
}
