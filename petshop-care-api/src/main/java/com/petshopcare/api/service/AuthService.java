package com.petshopcare.api.service;

import com.petshopcare.api.dto.*;
import com.petshopcare.api.model.Usuario;
import com.petshopcare.api.repository.UsuarioRepository;
import com.petshopcare.api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponseDTO registrar(RegistroRequestDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email já cadastrado");
        if (usuarioRepository.existsByCpf(dto.getCpf()))
            throw new RuntimeException("CPF já cadastrado");

        Usuario usuario = Usuario.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(passwordEncoder.encode(dto.getSenha()))
                .cpf(dto.getCpf())
                .telefone(dto.getTelefone())
                .perfil(dto.getPerfil())
                .build();

        usuarioRepository.save(usuario);
        String token = jwtService.gerarToken(usuario.getEmail(), usuario.getPerfil().name());
        return new LoginResponseDTO(token, usuario.getNome(), usuario.getEmail(), usuario.getPerfil().name());
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha()))
            throw new RuntimeException("Credenciais inválidas");

        if (!usuario.getAtivo())
            throw new RuntimeException("Conta desativada");

        String token = jwtService.gerarToken(usuario.getEmail(), usuario.getPerfil().name());
        return new LoginResponseDTO(token, usuario.getNome(), usuario.getEmail(), usuario.getPerfil().name());
    }
}
