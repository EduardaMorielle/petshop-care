package com.petshopcare.api.service;

import com.petshopcare.api.dto.PetRequestDTO;
import com.petshopcare.api.dto.PetResponseDTO;
import com.petshopcare.api.model.Pet;
import com.petshopcare.api.model.Usuario;
import com.petshopcare.api.repository.PetRepository;
import com.petshopcare.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final UsuarioRepository usuarioRepository;

    public PetResponseDTO criar(PetRequestDTO dto, String emailTutor) {
        Usuario tutor = usuarioRepository.findByEmail(emailTutor)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Pet pet = Pet.builder()
                .nome(dto.getNome())
                .especie(dto.getEspecie())
                .raca(dto.getRaca())
                .idade(dto.getIdade())
                .observacoes(dto.getObservacoes())
                .tutor(tutor)
                .build();

        return toDTO(petRepository.save(pet));
    }

    public List<PetResponseDTO> listarMeus(String emailTutor) {
        Usuario tutor = usuarioRepository.findByEmail(emailTutor)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return petRepository.findByTutorId(tutor.getId()).stream().map(this::toDTO).toList();
    }

    public List<PetResponseDTO> listarTodos() {
        return petRepository.findAll().stream().map(this::toDTO).toList();
    }

    public PetResponseDTO buscarPorId(Long id) {
        return toDTO(petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado")));
    }

    public PetResponseDTO atualizar(Long id, PetRequestDTO dto, String emailTutor) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado"));

        if (!pet.getTutor().getEmail().equals(emailTutor))
            throw new RuntimeException("Sem permissão para editar este pet");

        pet.setNome(dto.getNome());
        pet.setEspecie(dto.getEspecie());
        pet.setRaca(dto.getRaca());
        pet.setIdade(dto.getIdade());
        pet.setObservacoes(dto.getObservacoes());

        return toDTO(petRepository.save(pet));
    }

    public void deletar(Long id, String emailTutor) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado"));

        if (!pet.getTutor().getEmail().equals(emailTutor))
            throw new RuntimeException("Sem permissão para remover este pet");

        petRepository.delete(pet);
    }

    private PetResponseDTO toDTO(Pet pet) {
        PetResponseDTO dto = new PetResponseDTO();
        dto.setId(pet.getId());
        dto.setNome(pet.getNome());
        dto.setEspecie(pet.getEspecie());
        dto.setRaca(pet.getRaca());
        dto.setIdade(pet.getIdade());
        dto.setObservacoes(pet.getObservacoes());
        dto.setDataCadastro(pet.getDataCadastro());
        dto.setTutorId(pet.getTutor().getId());
        dto.setTutorNome(pet.getTutor().getNome());
        return dto;
    }
}
