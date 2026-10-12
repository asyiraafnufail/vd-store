-- Create products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  storage text not null,
  condition text not null,
  quality text not null,
  warranty text not null,
  price integer not null,
  price_max integer,
  image text not null,
  badge text,
  wa_link text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create testimonials table
create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  avatar text,
  text text not null,
  rating integer,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.testimonials enable row level security;

-- RLS Policies for products: public read, authenticated write/delete
create policy "Public can view products"
on public.products for select
using (true);

create policy "Authenticated can insert products"
on public.products for insert
with check (auth.role() = 'authenticated');

create policy "Authenticated can update products"
on public.products for update
with check (auth.role() = 'authenticated');

create policy "Authenticated can delete products"
on public.products for delete
using (auth.role() = 'authenticated');

-- RLS Policies for testimonials: public read, authenticated write/delete
create policy "Public can view testimonials"
on public.testimonials for select
using (true);

create policy "Authenticated can insert testimonials"
on public.testimonials for insert
with check (auth.role() = 'authenticated');

create policy "Authenticated can update testimonials"
on public.testimonials for update
with check (auth.role() = 'authenticated');

create policy "Authenticated can delete testimonials"
on public.testimonials for delete
using (auth.role() = 'authenticated');

-- Storage RLS for bucket 'photos'
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict do nothing;

create policy "Public can view photos"
on storage.objects for select
using (bucket_id = 'photos');

create policy "Authenticated can upload photos"
on storage.objects for insert
with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Authenticated can update photos"
on storage.objects for update
with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Authenticated can delete photos"
on storage.objects for delete
using (bucket_id = 'photos' and auth.role() = 'authenticated');
