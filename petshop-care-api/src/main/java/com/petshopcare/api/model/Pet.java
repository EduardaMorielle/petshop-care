package com.petshopcare.api.model;

import com.petshopcare.api.model.enums.EspeciePet;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "pets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EspeciePet especie;

    private String raca;
    private Integer idade;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Builder.Default
    private LocalDate dataCadastro = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Usuario tutor;
}
