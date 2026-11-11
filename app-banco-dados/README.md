# Aplicação integrada a banco de dados

Exemplo de portfólio: CRUD em React + TypeScript + Supabase (PostgreSQL).

## Banco
1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor.

## Rodar local
```
cp .env.example .env   # preencha URL e anon key
npm install
npm run dev
```

## Deploy na Vercel
1. Suba para o GitHub e importe na Vercel (Vite é detectado automaticamente).
2. Defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em *Environment Variables*.
3. Faça o deploy.

> As políticas RLS do schema são abertas, apenas para demonstração.
