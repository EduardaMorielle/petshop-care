package com.petshopcare.api.controller;

import com.petshopcare.api.dto.PetRequestDTO;
import com.petshopcare.api.dto.PetResponseDTO;
import com.petshopcare.api.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping
    public ResponseEntity<PetResponseDTO> criar(@Valid @RequestBody PetRequestDTO dto, Authentication auth) {
        return ResponseEntity.ok(petService.criar(dto, auth.getName()));
    }

    @GetMapping("/meus")
    public ResponseEntity<List<PetResponseDTO>> listarMeus(Authentication auth) {
        return ResponseEntity.ok(petService.listarMeus(auth.getName()));
    }

    @GetMapping
    public ResponseEntity<List<PetResponseDTO>> listarTodos() {
        return ResponseEntity.ok(petService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(petService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetResponseDTO> atualizar(@PathVariable Long id,
                                                     @Valid @RequestBody PetRequestDTO dto,
                                                     Authentication auth) {
        return ResponseEntity.ok(petService.atualizar(id, dto, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, Authentication auth) {
        petService.deletar(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
