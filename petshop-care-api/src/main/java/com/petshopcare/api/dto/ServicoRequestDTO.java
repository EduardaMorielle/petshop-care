package com.petshopcare.api.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ServicoRequestDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String descricao;

    @NotNull(message = "Duração é obrigatória")
    @Min(value = 1, message = "Duração deve ser maior que zero")
    private Integer duracaoMinutos;

    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    private Double preco;
}
