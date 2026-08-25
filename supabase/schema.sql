-- =========================================================
-- CITY POP DISCOGRAPHY & COMMUNITY VAULT
-- Supabase PostgreSQL Schema & Initial Seed Data
-- =========================================================

-- 1. Create ALBUMS Table
CREATE TABLE IF NOT EXISTS public.albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_jp TEXT,
  artist TEXT NOT NULL,
  artist_jp TEXT,
  year INTEGER NOT NULL,
  genre TEXT[] DEFAULT '{}',
  cover_url TEXT NOT NULL,
  rating NUMERIC(3,1) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 100,
  synopsis TEXT,
  funkiness INTEGER DEFAULT 80,
  melancholy INTEGER DEFAULT 30,
  sunset_energy INTEGER DEFAULT 80,
  night_drive INTEGER DEFAULT 80,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create TRACKS Table
CREATE TABLE IF NOT EXISTS public.tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id TEXT REFERENCES public.albums(id) ON DELETE CASCADE,
  track_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  is_highlight BOOLEAN DEFAULT false,
  preview_url TEXT,
  spotify_track_id TEXT
);

-- 3. Create RECOMMENDATIONS Table
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_title TEXT NOT NULL,
  artist TEXT NOT NULL,
  user_name TEXT DEFAULT 'Anonymous Listener',
  note TEXT NOT NULL,
  vibe TEXT DEFAULT 'Midnight Drive',
  rating NUMERIC(3,1) DEFAULT 5.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- Enable Row Level Security (RLS) & Public Policies
-- =========================================================

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to albums and tracks
CREATE POLICY "Allow public read on albums" ON public.albums FOR SELECT USING (true);
CREATE POLICY "Allow public read on tracks" ON public.tracks FOR SELECT USING (true);

-- Allow public read and insert on recommendations
CREATE POLICY "Allow public read on recommendations" ON public.recommendations FOR SELECT USING (true);
CREATE POLICY "Allow public insert on recommendations" ON public.recommendations FOR INSERT WITH CHECK (true);

-- =========================================================
-- SEED DATA: Classic City Pop Albums
-- =========================================================

INSERT INTO public.albums (id, title, artist, artist_jp, year, genre, cover_url, rating, reviews_count, synopsis, funkiness, melancholy, sunset_energy, night_drive)
VALUES 
('tatsuro-for-you', 'FOR YOU', 'Tatsuro Yamashita', '山下達郎', 1982, ARRAY['Boogie', 'Synth Funk', 'Beach Sunset'], 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 4.9, 342, 'Arguably the definitive Japanese City Pop album. Featuring Eizin Suzuki''s iconic album art aesthetic, ''FOR YOU'' is packed with upbeat funk guitar riffs, shimmering brass, and Tatsuro''s soaring vocals.', 95, 25, 98, 85),
('mariya-variety', 'VARIETY', 'Mariya Takeuchi', '竹内まりや', 1984, ARRAY['Urban Romance', 'Boogie', 'Synth Pop'], 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', 4.9, 412, 'Home to the viral global anthem ''Plastic Love'', VARIETY was arranged and produced by Mariya''s husband Tatsuro Yamashita. It redefined Japanese pop with sophisticated urban songwriting.', 88, 65, 75, 96),
('miki-pocket-park', 'POCKET PARK', 'Miki Matsubara', '松原みき', 1980, ARRAY['Urban Romance', 'Midnight Drive', 'Disco Funk'], 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', 4.8, 289, 'Featuring the unforgettable single ''Mayonaka no Door / Stay With Me'', Miki Matsubara''s debut album is a masterpiece of late 70s / early 80s Tokyo nightlife energy.', 90, 55, 80, 99),
('anri-timely', 'TIMELY!!', 'Anri', '杏里', 1983, ARRAY['Beach Sunset', 'Boogie', 'Synth Funk'], 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 4.9, 310, 'Arranged by Toshiki Kadomatsu, TIMELY!! is the ultimate coastal synth-pop soundtrack. Bright, energetic, and brimming with tropical horn lines and driving basslines.', 92, 20, 100, 88),
('taeko-sunshower', 'SUNSHOWER', 'Taeko Onuki', '大貫妙子', 1977, ARRAY['Melancholic Sunset', 'Urban Romance', 'Fusion Jazz'], 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', 4.9, 275, 'Featuring Ryuichi Sakamoto and legend musicians from Tin Pan Alley, SUNSHOWER blends jazz fusion, soft soul, and bossa nova with Taeko''s breathy, serene vocals.', 82, 75, 85, 90),
('toshiki-after-5-clash', 'AFTER 5 CLASH', 'Toshiki Kadomatsu', '角松敏生', 1984, ARRAY['Midnight Drive', 'Boogie', 'Synth Funk'], 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', 4.8, 204, 'The ultimate soundtrack for cruising through Shinjuku at 2 AM. Toshiki Kadomatsu delivers punchy slap bass, LinnDrum grooves, and late-night funk elegance.', 98, 35, 70, 100)
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: Selected Tracks
INSERT INTO public.tracks (album_id, track_number, title, duration, is_highlight, preview_url)
VALUES
('tatsuro-for-you', 1, 'SPARKLE', '4:15', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
('tatsuro-for-you', 2, 'MUSIC BOOK', '5:08', false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'),
('tatsuro-for-you', 4, 'MORNING GLORY', '3:28', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'),
('tatsuro-for-you', 7, 'LOVELAND, ISLAND', '4:29', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'),
('mariya-variety', 2, 'Plastic Love', '4:56', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'),
('miki-pocket-park', 1, 'Mayonaka no Door ~ Stay With Me', '5:12', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'),
('anri-timely', 1, 'CAT''S EYE', '3:32', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'),
('anri-timely', 6, 'Remember Summer Days', '4:55', true, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3')
ON CONFLICT DO NOTHING;

-- SEED DATA: Recommendations
INSERT INTO public.recommendations (album_title, artist, user_name, note, vibe, rating)
VALUES
('FOR YOU', 'Tatsuro Yamashita', 'Kenji_80s', 'The guitar intro on SPARKLE instantly transports you to a summer afternoon in Tokyo. Essential listening!', 'Beach Sunset', 5.0),
('POCKET PARK', 'Miki Matsubara', 'VinylCollector_JP', 'Stay With Me bassline is unmatched. RIP Miki Matsubara, a true legend of the era.', 'Midnight Drive', 5.0),
('VARIETY', 'Mariya Takeuchi', 'NeonNights', 'Plastic Love turned me into a City Pop fan 5 years ago. Still play it every single weekend.', 'Urban Romance', 5.0)
ON CONFLICT DO NOTHING;
