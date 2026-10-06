-- Aplicar no projeto Supabase antes de habilitar P.conf.sincronizacaoAtomica.
-- Não altera o conteúdo do progresso existente. Auth/RLS continuam necessários
-- se a plataforma for usada por mais de uma pessoa.
begin;
alter table public.progresso_usuario
  add column if not exists versao bigint not null default 0;
create unique index if not exists progresso_usuario_id_qa_idx
  on public.progresso_usuario(id);

create or replace function public.salvar_progresso_atomico(
  p_id text, p_dados jsonb, p_versao bigint
) returns table (sucesso boolean, versao bigint, dados jsonb)
language plpgsql security invoker set search_path = public as $$
declare registro public.progresso_usuario%rowtype;
begin
  if p_id is null or p_dados is null or jsonb_typeof(p_dados) <> 'object' or p_versao < 0 then
    raise exception 'Progresso inválido';
  end if;
  insert into public.progresso_usuario(id, dados, atualizado_em, versao)
    values (p_id, '{}'::jsonb, now(), 0) on conflict (id) do nothing;
  update public.progresso_usuario as p
    set dados = p_dados, atualizado_em = now(), versao = p.versao + 1
    where p.id = p_id and p.versao = p_versao returning p.* into registro;
  if found then
    return query select true, registro.versao, registro.dados::jsonb;
  else
    select p.* into registro from public.progresso_usuario as p where p.id = p_id;
    if not found then raise exception 'Sem acesso ao progresso solicitado'; end if;
    return query select false, registro.versao, registro.dados::jsonb;
  end if;
end;
$$;
commit;
