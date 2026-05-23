package com.petshopcare.api.repository;

import com.petshopcare.api.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    boolean existsByNome(String nome);
    List<Servico> findByAtivoTrue();
}
