export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  perfil: string;
}

export interface RegistroRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
  perfil: string;
}

export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca?: string;
  idade?: number;
  observacoes?: string;
  dataCadastro?: string;
  tutorId?: number;
  tutorNome?: string;
}

export interface Servico {
  id?: number;
  nome: string;
  descricao?: string;
  duracaoMinutos: number;
  preco: number;
  ativo?: boolean;
}

export interface Agendamento {
  id?: number;
  dataAgendamento: string;
  horaAgendamento: string;
  status?: string;
  isEncaixe?: boolean;
  observacoes?: string;
  motivoCancelamento?: string;
  dataCriacao?: string;
  horaChegada?: string;
  horaInicio?: string;
  horaConclusao?: string;
  clienteId?: number;
  clienteNome?: string;
  petId: number;
  petNome?: string;
  servicoId: number;
  servicoNome?: string;
  servicoPreco?: number;
  atendenteId?: number;
  atendenteNome?: string;
}

export interface AgendamentoRequest {
  petId: number;
  servicoId: number;
  dataAgendamento: string;
  horaAgendamento: string;
  observacoes?: string;
}
