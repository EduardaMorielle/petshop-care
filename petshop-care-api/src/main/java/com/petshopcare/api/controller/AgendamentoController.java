package com.petshopcare.api.controller;

import com.petshopcare.api.dto.AgendamentoRequestDTO;
import com.petshopcare.api.dto.AgendamentoResponseDTO;
import com.petshopcare.api.service.AgendamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> criar(@Valid @RequestBody AgendamentoRequestDTO dto,
                                                         Authentication auth) {
        return ResponseEntity.ok(agendamentoService.criar(dto, auth.getName()));
    }

    @GetMapping("/meus")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarMeus(Authentication auth) {
        return ResponseEntity.ok(agendamentoService.listarMeus(auth.getName()));
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(agendamentoService.listarTodos());
    }

    @GetMapping("/data/{data}")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarPorData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(agendamentoService.listarPorData(data));
    }

    @PatchMapping("/{id}/chegada")
    public ResponseEntity<AgendamentoResponseDTO> registrarChegada(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(agendamentoService.registrarChegada(id, auth.getName()));
    }

    @PatchMapping("/{id}/iniciar")
    public ResponseEntity<AgendamentoResponseDTO> iniciar(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.iniciarAtendimento(id));
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<AgendamentoResponseDTO> concluir(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.concluirAtendimento(id));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<AgendamentoResponseDTO> cancelar(@PathVariable Long id,
                                                            @RequestBody Map<String, String> body,
                                                            Authentication auth) {
        return ResponseEntity.ok(agendamentoService.cancelar(id, body.get("motivo"), auth.getName()));
    }
}
