package com.petshopcare.api.repository;

import com.petshopcare.api.model.Agendamento;
import com.petshopcare.api.model.enums.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByClienteId(Long clienteId);
    List<Agendamento> findByDataAgendamento(LocalDate data);
    List<Agendamento> findByDataAgendamentoAndStatus(LocalDate data, StatusAgendamento status);
    boolean existsByPetIdAndDataAgendamentoAndHoraAgendamento(Long petId, LocalDate data, java.time.LocalTime hora);
}
