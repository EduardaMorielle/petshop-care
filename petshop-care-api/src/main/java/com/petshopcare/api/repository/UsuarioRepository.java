package com.petshopcare.api.repository;

import com.petshopcare.api.model.Usuario;
import com.petshopcare.api.model.enums.PerfilUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
    List<Usuario> findByPerfil(PerfilUsuario perfil);
}
