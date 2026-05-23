package com.petshopcare.api.dto;

import com.petshopcare.api.model.enums.EspeciePet;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PetResponseDTO {
    private Long id;
    private String nome;
    private EspeciePet especie;
    private String raca;
    private Integer idade;
    private String observacoes;
    private LocalDate dataCadastro;
    private Long tutorId;
    private String tutorNome;
}
