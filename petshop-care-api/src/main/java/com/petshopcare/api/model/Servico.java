package com.petshopcare.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "servicos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private Integer duracaoMinutos;

    @Column(nullable = false)
    private Double preco;

    @Builder.Default
    private Boolean ativo = true;
}
