import { FormEvent, useEffect, useState } from 'react';
import { ler, salvar, Registro } from './storage';

export default function App() {
  const [registros, setRegistros] = useState<Registro[]>(ler);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => { salvar(registros); }, [registros]);

  function cadastrar(e: FormEvent) {
    e.preventDefault();
    setRegistros([{ id: String(Date.now()), nome, email }, ...registros]);
    setNome('');
    setEmail('');
  }

  function editar(r: Registro) {
    const novo = prompt('Novo nome:', r.nome)?.trim();
    if (novo) setRegistros(registros.map(x => (x.id === r.id ? { ...x, nome: novo } : x)));
  }

  function excluir(id: string) {
    setRegistros(registros.filter(x => x.id !== id));
  }

  return (
    <main>
      <h1>Aplicação integrada a banco de dados</h1>
      <p className="sub">Demonstração de CRUD com React + TypeScript (dados salvos no navegador)</p>

      <form onSubmit={cadastrar}>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required maxLength={100} />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" required maxLength={150} />
        <button>Cadastrar</button>
      </form>

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
