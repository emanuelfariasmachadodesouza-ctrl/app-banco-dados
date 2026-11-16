-- Supabase (PostgreSQL). Execute no SQL Editor do projeto.
create table if not exists public.registros (
  id uuid primary key default gen_random_uuid(),
  nome varchar(100) not null,
  email varchar(150) not null,
  criado_em timestamptz not null default now()
);

alter table public.registros enable row level security;

-- Políticas abertas para fins de demonstração (qualquer visitante pode ler/gravar).
-- Em produção, restrinja com autenticação (auth.uid()).
create policy "demo_select" on public.registros for select to anon using (true);
create policy "demo_insert" on public.registros for insert to anon with check (true);
create policy "demo_update" on public.registros for update to anon using (true) with check (true);
create policy "demo_delete" on public.registros for delete to anon using (true);

insert into public.registros (nome, email) values
  ('Ana Souza', 'ana@exemplo.com'),
  ('Carlos Lima', 'carlos@exemplo.com');
