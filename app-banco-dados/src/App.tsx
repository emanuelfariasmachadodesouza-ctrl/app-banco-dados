import { FormEvent, useEffect, useState } from 'react';
import { supabase, Registro } from './supabase';

export default function App() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');

  async function carregar() {
    const { data, error } = await supabase
      .from('registros')
      .select('*')
      .order('criado_em', { ascending: false });
    if (error) setErro(error.message);
    else { setErro(''); setRegistros(data as Registro[]); }
  }

  useEffect(() => { carregar(); }, []);

  async function cadastrar(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('registros').insert({ nome, email });
    if (error) return setErro(error.message);
    setNome(''); setEmail('');
    carregar();
  }

  async function editar(r: Registro) {
    const novo = prompt('Novo nome:', r.nome)?.trim();
    if (!novo) return;
    const { error } = await supabase.from('registros').update({ nome: novo }).eq('id', r.id);
    if (error) setErro(error.message); else carregar();
  }

  async function excluir(id: string) {
    const { error } = await supabase.from('registros').delete().eq('id', id);
    if (error) setErro(error.message); else carregar();
  }

  return (
    <main>
      <h1>Aplicação integrada a banco de dados</h1>
      <p className="sub">Demonstração: React + TypeScript + Supabase</p>

      <form onSubmit={cadastrar}>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required maxLength={100} />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" required maxLength={150} />
        <button>Cadastrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul>
        {registros.map(r => (
          <li key={r.id}>
            <div className="info">{r.nome}<small>{r.email}</small></div>
            <button className="sec" onClick={() => editar(r)}>Editar</button>
            <button className="sec" onClick={() => excluir(r.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
