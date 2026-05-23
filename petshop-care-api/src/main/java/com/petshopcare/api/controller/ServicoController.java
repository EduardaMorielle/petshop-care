package com.petshopcare.api.controller;

import com.petshopcare.api.dto.ServicoRequestDTO;
import com.petshopcare.api.dto.ServicoResponseDTO;
import com.petshopcare.api.service.ServicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/servicos")
@RequiredArgsConstructor
public class ServicoController {

    private final ServicoService servicoService;

    @GetMapping
    public ResponseEntity<List<ServicoResponseDTO>> listarAtivos() {
        return ResponseEntity.ok(servicoService.listarAtivos());
    }

    @GetMapping("/todos")
    public ResponseEntity<List<ServicoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(servicoService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<ServicoResponseDTO> criar(@Valid @RequestBody ServicoRequestDTO dto) {
        return ResponseEntity.ok(servicoService.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicoResponseDTO> atualizar(@PathVariable Long id,
                                                         @Valid @RequestBody ServicoRequestDTO dto) {
        return ResponseEntity.ok(servicoService.atualizar(id, dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, @RequestParam boolean ativo) {
        servicoService.alterarStatus(id, ativo);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        servicoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
