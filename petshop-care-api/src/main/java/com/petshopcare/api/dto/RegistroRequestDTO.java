package com.petshopcare.api.dto;

import com.petshopcare.api.model.enums.PerfilUsuario;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistroRequestDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String senha;

    @NotBlank(message = "CPF é obrigatório")
    @Size(min = 11, max = 11, message = "CPF deve ter 11 dígitos")
    private String cpf;

    private String telefone;

    @NotNull(message = "Perfil é obrigatório")
    private PerfilUsuario perfil;
}
