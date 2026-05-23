package com.petshopcare.api.dto;

import lombok.Data;

@Data
public class ServicoResponseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Integer duracaoMinutos;
    private Double preco;
    private Boolean ativo;
}
