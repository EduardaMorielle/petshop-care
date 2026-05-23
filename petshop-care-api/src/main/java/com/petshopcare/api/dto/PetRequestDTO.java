package com.petshopcare.api.dto;

import com.petshopcare.api.model.enums.EspeciePet;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PetRequestDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotNull(message = "Espécie é obrigatória")
    private EspeciePet especie;

    private String raca;
    private Integer idade;
    private String observacoes;
}
