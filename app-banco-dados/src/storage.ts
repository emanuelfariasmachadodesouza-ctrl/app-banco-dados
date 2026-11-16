export type Registro = {
  id: string;
  nome: string;
  email: string;
};

const KEY = 'registros-demo';

const iniciais: Registro[] = [
  { id: '1', nome: 'Ana Souza', email: 'ana@exemplo.com' },
  { id: '2', nome: 'Carlos Lima', email: 'carlos@exemplo.com' }
];

export function ler(): Registro[] {
  try {
    const dados = localStorage.getItem(KEY);
    return dados ? (JSON.parse(dados) as Registro[]) : iniciais;
  } catch {
    return iniciais;
  }
}

export function salvar(registros: Registro[]) {
  try { localStorage.setItem(KEY, JSON.stringify(registros)); } catch {}
}
