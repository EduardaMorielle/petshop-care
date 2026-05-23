package com.petshopcare.api.service;

import com.petshopcare.api.dto.AgendamentoRequestDTO;
import com.petshopcare.api.dto.AgendamentoResponseDTO;
import com.petshopcare.api.model.Agendamento;
import com.petshopcare.api.model.enums.StatusAgendamento;
import com.petshopcare.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PetRepository petRepository;
    private final ServicoRepository servicoRepository;

    @Transactional
    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto, String emailCliente) {
        var cliente = usuarioRepository.findByEmail(emailCliente)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        var pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet não encontrado"));
        var servico = servicoRepository.findById(dto.getServicoId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        if (!pet.getTutor().getId().equals(cliente.getId()))
            throw new RuntimeException("Este pet não pertence ao cliente");

        if (agendamentoRepository.existsByPetIdAndDataAgendamentoAndHoraAgendamento(
                dto.getPetId(), dto.getDataAgendamento(), dto.getHoraAgendamento()))
            throw new RuntimeException("Já existe agendamento para este pet neste horário");

        Agendamento agendamento = Agendamento.builder()
                .dataAgendamento(dto.getDataAgendamento())
                .horaAgendamento(dto.getHoraAgendamento())
                .observacoes(dto.getObservacoes())
                .cliente(cliente)
                .pet(pet)
                .servico(servico)
                .build();

        return toDTO(agendamentoRepository.save(agendamento));
    }

    public List<AgendamentoResponseDTO> listarMeus(String emailCliente) {
        var cliente = usuarioRepository.findByEmail(emailCliente)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return agendamentoRepository.findByClienteId(cliente.getId()).stream().map(this::toDTO).toList();
    }

    public List<AgendamentoResponseDTO> listarPorData(LocalDate data) {
        return agendamentoRepository.findByDataAgendamento(data).stream().map(this::toDTO).toList();
    }

    public List<AgendamentoResponseDTO> listarTodos() {
        return agendamentoRepository.findAll().stream().map(this::toDTO).toList();
    }

    @Transactional
    public AgendamentoResponseDTO registrarChegada(Long id, String emailAtendente) {
        var agendamento = buscarAgendamento(id);
        var atendente = usuarioRepository.findByEmail(emailAtendente)
                .orElseThrow(() -> new RuntimeException("Atendente não encontrado"));

        agendamento.setStatus(StatusAgendamento.AGUARDANDO);
        agendamento.setHoraChegada(LocalTime.now());
        agendamento.setAtendente(atendente);
        return toDTO(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public AgendamentoResponseDTO iniciarAtendimento(Long id) {
        var agendamento = buscarAgendamento(id);
        agendamento.setStatus(StatusAgendamento.EM_ATENDIMENTO);
        agendamento.setHoraInicio(LocalTime.now());
        return toDTO(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public AgendamentoResponseDTO concluirAtendimento(Long id) {
        var agendamento = buscarAgendamento(id);
        agendamento.setStatus(StatusAgendamento.CONCLUIDO);
        agendamento.setHoraConclusao(LocalTime.now());
        return toDTO(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public AgendamentoResponseDTO cancelar(Long id, String motivo, String emailUsuario) {
        var agendamento = buscarAgendamento(id);
        var usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean isCliente = agendamento.getCliente().getEmail().equals(emailUsuario);
        agendamento.setStatus(isCliente ? StatusAgendamento.CANCELADO_CLIENTE : StatusAgendamento.CANCELADO_PETSHOP);
        agendamento.setMotivoCancelamento(motivo);
        return toDTO(agendamentoRepository.save(agendamento));
    }

    private Agendamento buscarAgendamento(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    }

    private AgendamentoResponseDTO toDTO(Agendamento a) {
        AgendamentoResponseDTO dto = new AgendamentoResponseDTO();
        dto.setId(a.getId());
        dto.setDataAgendamento(a.getDataAgendamento());
        dto.setHoraAgendamento(a.getHoraAgendamento());
        dto.setStatus(a.getStatus());
        dto.setIsEncaixe(a.getIsEncaixe());
        dto.setObservacoes(a.getObservacoes());
        dto.setMotivoCancelamento(a.getMotivoCancelamento());
        dto.setDataCriacao(a.getDataCriacao());
        dto.setHoraChegada(a.getHoraChegada());
        dto.setHoraInicio(a.getHoraInicio());
        dto.setHoraConclusao(a.getHoraConclusao());
        dto.setClienteId(a.getCliente().getId());
        dto.setClienteNome(a.getCliente().getNome());
        dto.setPetId(a.getPet().getId());
        dto.setPetNome(a.getPet().getNome());
        dto.setServicoId(a.getServico().getId());
        dto.setServicoNome(a.getServico().getNome());
        dto.setServicoPreco(a.getServico().getPreco());
        if (a.getAtendente() != null) {
            dto.setAtendenteId(a.getAtendente().getId());
            dto.setAtendenteNome(a.getAtendente().getNome());
        }
        return dto;
    }
}
