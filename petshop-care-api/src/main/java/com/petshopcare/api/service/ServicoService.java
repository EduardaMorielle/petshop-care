package com.petshopcare.api.service;

import com.petshopcare.api.dto.ServicoRequestDTO;
import com.petshopcare.api.dto.ServicoResponseDTO;
import com.petshopcare.api.model.Servico;
import com.petshopcare.api.repository.ServicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoService {

    private final ServicoRepository servicoRepository;

    public ServicoResponseDTO criar(ServicoRequestDTO dto) {
        if (servicoRepository.existsByNome(dto.getNome()))
            throw new RuntimeException("Serviço com este nome já existe");

        Servico servico = Servico.builder()
                .nome(dto.getNome())
                .descricao(dto.getDescricao())
                .duracaoMinutos(dto.getDuracaoMinutos())
                .preco(dto.getPreco())
                .build();

        return toDTO(servicoRepository.save(servico));
    }

    public List<ServicoResponseDTO> listarAtivos() {
        return servicoRepository.findByAtivoTrue().stream().map(this::toDTO).toList();
    }

    public List<ServicoResponseDTO> listarTodos() {
        return servicoRepository.findAll().stream().map(this::toDTO).toList();
    }

    public ServicoResponseDTO atualizar(Long id, ServicoRequestDTO dto) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        servico.setNome(dto.getNome());
        servico.setDescricao(dto.getDescricao());
        servico.setDuracaoMinutos(dto.getDuracaoMinutos());
        servico.setPreco(dto.getPreco());

        return toDTO(servicoRepository.save(servico));
    }

    public void alterarStatus(Long id, boolean ativo) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        servico.setAtivo(ativo);
        servicoRepository.save(servico);
    }

    public void deletar(Long id) {
        servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        servicoRepository.deleteById(id);
    }

    private ServicoResponseDTO toDTO(Servico s) {
        ServicoResponseDTO dto = new ServicoResponseDTO();
        dto.setId(s.getId());
        dto.setNome(s.getNome());
        dto.setDescricao(s.getDescricao());
        dto.setDuracaoMinutos(s.getDuracaoMinutos());
        dto.setPreco(s.getPreco());
        dto.setAtivo(s.getAtivo());
        return dto;
    }
}
