-- ============================================================================
-- City Pop Discography & Community Vault — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

create extension if not exists pgcrypto;   -- enables gen_random_uuid()

-- ----------------------------------------------------------------------------
-- 1. ALBUMS
-- ----------------------------------------------------------------------------
create table if not exists public.albums (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  title_jp       text,
  artist         text not null,
  artist_jp      text,
  year           int,
  genre          text[] not null default '{}',
  cover_url      text,
  rating         numeric(3,2) default 0 check (rating between 0 and 5),
  synopsis       text,
  funkiness      int check (funkiness between 0 and 100),
  sunset_energy  int check (sunset_energy between 0 and 100),
  night_drive    int check (night_drive between 0 and 100),
  spotify_url    text,
  created_at     timestamptz not null default now()
);

comment on table public.albums is 'Core discography catalog of City Pop albums.';

-- ----------------------------------------------------------------------------
-- 2. TRACKS
-- ----------------------------------------------------------------------------
create table if not exists public.tracks (
  id                 uuid primary key default gen_random_uuid(),
  album_id           uuid not null references public.albums(id) on delete cascade,
  track_number       int not null,
  title              text not null,
  duration           text,               -- stored as "mm:ss" for simple display
  is_highlight       boolean not null default false,
  preview_url        text,               -- self-hosted / licensed 30s clip (see README)
  spotify_track_id   text,               -- powers the official Spotify embed fallback
  created_at         timestamptz not null default now(),
  unique (album_id, track_number)
);

create index if not exists tracks_album_id_idx on public.tracks(album_id);

-- ----------------------------------------------------------------------------
-- 3. RECOMMENDATIONS (community submissions)
-- ----------------------------------------------------------------------------
create table if not exists public.recommendations (
  id           uuid primary key default gen_random_uuid(),
  album_title  text not null,
  artist       text not null,
  user_name    text not null default 'Anonymous',
  note         text,
  vibe         text,               -- e.g. "Sunset Drive", "Rainy Tokyo Night"
  rating       numeric(3,2) check (rating between 0 and 5),
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY — public read + public insert (matches the brief)
-- ----------------------------------------------------------------------------
-- Note: this makes all three tables writable by anyone holding the public
-- anon key (i.e. anyone visiting the site). That's fine for `recommendations`,
-- a community guestbook. For `albums`/`tracks` it means any visitor could add
-- or spam rows too — acceptable for a hobby/demo project, but if this ever
-- goes further, swap the albums/tracks INSERT policies below for
-- `with check (auth.role() = 'authenticated')` or an admin-only rule.

alter table public.albums          enable row level security;
alter table public.tracks          enable row level security;
alter table public.recommendations enable row level security;

create policy "Albums are publicly readable"
  on public.albums for select
  using (true);

create policy "Anyone can insert albums"
  on public.albums for insert
  with check (true);

create policy "Tracks are publicly readable"
  on public.tracks for select
  using (true);

create policy "Anyone can insert tracks"
  on public.tracks for insert
  with check (true);

create policy "Recommendations are publicly readable"
  on public.recommendations for select
  using (true);

create policy "Anyone can insert recommendations"
  on public.recommendations for insert
  with check (true);

-- ----------------------------------------------------------------------------
-- REALTIME — publish tables so the client can subscribe to live changes
-- ----------------------------------------------------------------------------
alter publication supabase_realtime add table public.albums;
alter publication supabase_realtime add table public.tracks;
alter publication supabase_realtime add table public.recommendations;

-- ============================================================================
-- SAMPLE DATA — 7 verified classic City Pop albums
-- preview_url / spotify_track_id are left NULL — see README "Audio sources"
-- for why (Spotify's Web API preview_url was deprecated Nov 2024) and how
-- to fill these in legitimately.
-- ============================================================================

-- 1. Mariya Takeuchi — Variety (1984)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('Variety', 'ヴァラエティ', 'Mariya Takeuchi', '竹内 まりや', 1984,
     array['City Pop','AOR','Boogie'], null, 4.9,
     'Produced by Tatsuro Yamashita, this glossy 1984 record pairs boogie-funk grooves with breezy AOR balladry. Home to the genre-defining "Plastic Love."',
     88, 65, 55, 'https://open.spotify.com/album/6ztqp2W1kFhw4vgKM0Oihx')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'Plastic Love', '4:55', true from a
union all select id, 2, 'Sweetest Music', '4:15', false from a
union all select id, 3, 'Song for U.S.A.', '4:31', false from a;

-- 2. Tatsuro Yamashita — Ride on Time (1980)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('Ride on Time', 'ライド・オン・タイム', 'Tatsuro Yamashita', '山下 達郎', 1980,
     array['City Pop','Funk','Disco','Soul'], null, 4.8,
     'Yamashita''s fifth studio album, driven by the Maxell-commercial hit title track and a sharp, funk-forward studio band.',
     90, 55, 70, 'https://open.spotify.com/artist/2iojnvSXbLKLA4XoSjMPQO')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'Ride on Time', '4:25', true from a
union all select id, 2, 'The Door into Summer', '4:41', false from a
union all select id, 3, 'My Sugar Babe', '4:11', false from a;

-- 3. Tatsuro Yamashita — For You (1982)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('For You', 'フォー・ユー', 'Tatsuro Yamashita', '山下 達郎', 1982,
     array['City Pop','AOR','Funk'], null, 4.9,
     'Yamashita''s Oricon #1 follow-up to Ride on Time — polished, summery, and packed with future standards like "Sparkle."',
     80, 85, 45, 'https://open.spotify.com/artist/2iojnvSXbLKLA4XoSjMPQO')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'Sparkle', '4:16', true from a
union all select id, 2, 'Music Book', '5:10', false from a
union all select id, 3, 'Loveland, Island', '4:30', false from a;

-- 4. Anri — Timely!! (1983, produced by Toshiki Kadomatsu)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('Timely!!', 'タイムリー', 'Anri', '杏里', 1983,
     array['City Pop','Funk','Boogie'], null, 4.7,
     'Anri''s first Oricon #1 album, arranged and produced top-to-bottom by Toshiki Kadomatsu. Contains the "Cat''s Eye" re-recording.',
     82, 60, 50, 'https://open.spotify.com/artist/1nna2wJgUpQ4l0oDPfhrIA')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'Cat''s Eye (New Take)', '3:09', true from a
union all select id, 2, 'Windy Summer', '4:06', false from a
union all select id, 3, 'Stay By Me', '3:37', true from a;

-- 5. Miki Matsubara — Pocket Park (1980)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('Pocket Park', 'ポケットパーク', 'Miki Matsubara', '松原 みき', 1980,
     array['City Pop','Disco','AOR'], null, 4.8,
     'Matsubara''s debut album, recorded at 19, anchored by "Mayonaka no Door / Stay with Me" — a 1979 single that found a whole new global audience in 2020.',
     70, 50, 75, 'https://open.spotify.com/album/1VS8e1raK66dzG2RijR3Ee')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'Mayonaka no Door / Stay With Me', '5:13', true from a
union all select id, 2, 'It''s So Creamy', '3:38', false from a
union all select id, 3, 'Cryin''', '3:58', false from a;

-- 6. Toshiki Kadomatsu — Sea Breeze (1981)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('Sea Breeze', 'シー・ブリーズ', 'Toshiki Kadomatsu', '角松 敏生', 1981,
     array['City Pop','Funk','Soul'], null, 4.6,
     'Kadomatsu''s debut, cut while he was still a university student — a late-night-beach record built for driving with the windows down.',
     85, 75, 65, 'https://open.spotify.com/artist/1H9waHKgIuUL0Ya1vLcgJ4')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'Dancing Shower', '4:41', false from a
union all select id, 2, 'Elena', '5:21', false from a
union all select id, 3, 'Yokohama Twilight Time', '5:14', true from a;

-- 7. Haruomi Hosono, Shigeru Suzuki & Tatsuro Yamashita — Pacific (1978)
with a as (
  insert into public.albums
    (title, title_jp, artist, artist_jp, year, genre, cover_url, rating, synopsis, funkiness, sunset_energy, night_drive, spotify_url)
  values
    ('Pacific', 'パシフィック', 'Haruomi Hosono, Shigeru Suzuki & Tatsuro Yamashita', null, 1978,
     array['City Pop','Exotica','Jazz Fusion','Instrumental'], null, 4.5,
     'An instrumental three-way collaboration and the first entry in the CBS/Sony Sound Image series — tropical, genre-hopping, and a direct ancestor of the City Pop sound.',
     55, 90, 20, 'https://open.spotify.com/album/6PnbwR4pgQQZDrLUdw6Kc7')
  returning id
)
insert into public.tracks (album_id, track_number, title, duration, is_highlight)
select id, 1, 'The Last Paradise', '4:03', false from a
union all select id, 2, 'Coral Reef', '3:45', false from a
union all select id, 3, 'Cosmic Surfin''', '5:07', true from a;

-- ----------------------------------------------------------------------------
-- Sample recommendation rows (community vault seed data)
-- ----------------------------------------------------------------------------
insert into public.recommendations (album_title, artist, user_name, note, vibe, rating) values
  ('Down Town', 'Sugar Babe', 'yuki_nightdrive', 'The one that started it all for me — 1975 and it still sounds ahead of its time.', 'Rainy Tokyo Night', 4.8),
  ('Bi・Ki・Ni', 'Anri', 'cassette_dreamer', 'Slept on compared to Timely!! but the second side is non-stop.', 'Sunset Drive', 4.3),
  ('Magical', 'Junko Ohashi', 'shibuya_scanner', '"Telephone Number" alone is worth the whole album.', 'Late-Night Cruise', 4.6);
