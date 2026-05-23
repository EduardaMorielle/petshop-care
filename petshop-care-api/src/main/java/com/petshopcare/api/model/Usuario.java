package com.petshopcare.api.model;

import com.petshopcare.api.model.enums.PerfilUsuario;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(unique = true, length = 11)
    private String cpf;

    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PerfilUsuario perfil;

    @Builder.Default
    private Boolean ativo = true;

    @Builder.Default
    private LocalDateTime dataCadastro = LocalDateTime.now();

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Pet> pets;
}
