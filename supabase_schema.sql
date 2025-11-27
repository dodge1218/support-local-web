-- Run this in your Supabase SQL Editor to create the table for website requests

create table public.project_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  "businessName" text,
  "businessType" text,
  "currentWebsite" text,
  description text,
  budget text,
  estimated_quote numeric,
  status text default 'new'
);

-- Enable Row Level Security (RLS)
alter table public.project_requests enable row level security;

-- Allow anyone to insert (public form)
create policy "Enable insert for everyone" on public.project_requests
  for insert with check (true);

-- Allow only authenticated users (admins) to view
create policy "Enable read for authenticated users only" on public.project_requests
  for select using (auth.role() = 'authenticated');
