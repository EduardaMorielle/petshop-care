package com.petshopcare.api.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AgendamentoRequestDTO {
    @NotNull(message = "ID do pet é obrigatório")
    private Long petId;

    @NotNull(message = "ID do serviço é obrigatório")
    private Long servicoId;

    @NotNull(message = "Data é obrigatória")
    @Future(message = "Data deve ser futura")
    private LocalDate dataAgendamento;

    @NotNull(message = "Hora é obrigatória")
    private LocalTime horaAgendamento;

    private String observacoes;
}
