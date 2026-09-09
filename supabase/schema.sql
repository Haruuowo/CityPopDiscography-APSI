-- =========================================================
-- CITY POP DISCOGRAPHY & COMMUNITY VAULT
-- Supabase PostgreSQL Schema & Comprehensive Seed Data
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
('casiopea-mint-jams', 'MINT JAMS', 'Casiopea', 'カシオペア', 1982, ARRAY['Fusion Jazz', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b2/54/db/b254dbdb-0661-034e-7f7a-04fa43231531/4582290414003.jpg/600x600bb.jpg', 4.9, 360, 'A live-in-studio masterpiece of Japanese jazz-fusion. Famous worldwide for its blistering slap basslines, soaring synths, and infectious rhythm guitar work.', 98, 10, 95, 90),
('sato-awakening', 'AWAKENING', 'Hiroshi Sato', '佐藤博', 1982, ARRAY['Urban Romance', 'Synth Pop', 'Melancholic Sunset'], 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0a/8c/c4/0a8cc4a7-3357-8323-68f6-f7f8c4f17a89/00602567714675.rgb.jpg/600x600bb.jpg', 4.8, 240, 'Blending LinnDrum beats, smooth Fender Rhodes piano, and soul vocals from Wendy Matthews. Awakening is a smooth AOR & synth-pop treasure.', 82, 60, 85, 92),
('taeko-sunshower', 'SUNSHOWER', 'Taeko Ohnuki', '大貫妙子', 1977, ARRAY['Melancholic Sunset', 'Urban Romance', 'Fusion Jazz'], 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/85/ee/ac/85eeac60-e8dc-88b9-15c4-59f251475444/823375208259_Cover.jpg/600x600bb.jpg', 4.9, 450, 'Featuring Ryuichi Sakamoto and legendary YMO musicians from Tin Pan Alley, SUNSHOWER is an absolute masterpiece blending jazz fusion, soft soul, and bossa nova with Taeko''s serene vocal delivery.', 88, 75, 92, 95),
('miki-pocket-park', 'POCKET PARK', 'Miki Matsubara', '松原みき', 1980, ARRAY['Urban Romance', 'Midnight Drive', 'Disco Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/06/eb/b1/06ebb16a-7e31-5818-4be9-684cb57622dc/PA00204086_0_234544_jacket.jpg/600x600bb.jpg', 4.8, 289, 'Featuring the unforgettable single ''Mayonaka no Door / Stay With Me'', Miki Matsubara''s debut album is a masterpiece of late 70s / early 80s Tokyo nightlife energy.', 90, 55, 80, 99),
('anri-timely', 'TIMELY!!', 'Anri', '杏里', 1983, ARRAY['Beach Sunset', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/81/ad/b2/81adb240-233e-705a-7397-1e8187c97561/artwork.jpg/600x600bb.jpg', 4.9, 310, 'Arranged by Toshiki Kadomatsu, TIMELY!! is the ultimate coastal synth-pop soundtrack. Bright, energetic, and brimming with tropical horn lines and driving basslines.', 92, 20, 100, 88),
('toshiki-after-5-clash', 'AFTER 5 CLASH', 'Toshiki Kadomatsu', '角松敏生', 1984, ARRAY['Midnight Drive', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/78/e3/67/78e367f4-4ef7-4371-0c16-37b331748bc6/4547366621266.jpg/600x600bb.jpg', 4.8, 204, 'The ultimate soundtrack for cruising through Shinjuku at 2 AM. Toshiki Kadomatsu delivers punchy slap bass, LinnDrum grooves, and late-night funk elegance.', 98, 35, 70, 100),
('piper-summer-breeze', 'SUMMER BREEZE', 'Piper', 'パイパー', 1983, ARRAY['Beach Sunset', 'Synth Funk', 'Boogie'], 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e0/fc/8c/e0fc8c69-1875-e0c7-5faa-b5b5817286c0/186.jpg/600x600bb.jpg', 4.7, 165, 'A breezy, guitar-heavy coastal funk gem. Keisuke Yamamoto''s shimmering chorus guitars and synth arpeggios recreate the feeling of driving along the Shonan coastline.', 86, 15, 99, 70),
('junko-magical', 'MAGICAL', 'Junko Ohashi', '大橋純子', 1983, ARRAY['Midnight Drive', 'Disco Funk', 'Boogie'], 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/81/50/27/81502762-96b9-93bf-ea96-80416b09f169/4988021811071.png/600x600bb.jpg', 4.9, 220, 'A holy grail collector''s album featuring ''Telephone Number''. Deep funky grooves, brass arrangements, and Junko''s powerhouse vocal delivery.', 96, 40, 75, 95),
('momoko-adventure', 'ADVENTURE', 'Momoko Kikuchi', '菊池桃子', 1986, ARRAY['Synth Pop', 'Melancholic Sunset', 'Urban Romance'], 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/88/b3/14/88b314cf-f8bb-a7f8-f316-ce026a3293f6/dj.zgrtxkxp.jpg/600x600bb.jpg', 4.8, 198, 'Produced by Tetsuji Hayashi, ADVENTURE is famous for lush synth pads, dreamy whisper vocals, and serene night-drive vibes like ''Mystical Composer'' and ''Night Cruising''.', 72, 80, 65, 98),
('takanaka-seychelles', 'SEYCHELLES', 'Masayoshi Takanaka', '高中正義', 1976, ARRAY['Beach Sunset', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ef/38/80/ef388041-7f6a-1be3-95f3-00489d8a795b/00602498909355.rgb.jpg/600x600bb.jpg', 5.0, 385, 'Masayoshi Takanaka''s legendary 1976 debut solo album. A landmark tropical jazz-fusion & resort city pop masterpiece featuring vibrant Latin percussion, seaside guitar melodies, and lush island vibes.', 98, 15, 100, 90)
ON CONFLICT (id) DO NOTHING;

-- =========================================================
-- SEED DATA: Tracks with Authentic Audio Previews
-- =========================================================

INSERT INTO public.tracks (album_id, track_number, title, duration, is_highlight, preview_url)
VALUES
('casiopea-mint-jams', 1, 'Take Me', '4:52', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f0/c9/46/f0c946c3-6738-9948-0c01-5160f8572b96/mzaf_18365617094760906428.plus.aac.p.m4a'),
('casiopea-mint-jams', 2, 'Asayake', '5:03', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/77/48/9c/77489ce8-f440-ad56-616a-5bc9f39520ab/mzaf_168556408365358289.plus.aac.p.m4a'),
('casiopea-mint-jams', 3, 'Midnight Rendezvous', '3:48', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b0/0b/5d/b00b5d20-5e10-4db9-61ea-272e3af41f97/mzaf_14940539318302275894.plus.aac.p.m4a'),
('sato-awakening', 2, 'You''re My Baby', '4:22', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2f/a1/56/2fa15645-2129-7330-c17d-20d3b7856288/mzaf_11489161801932533416.plus.aac.p.m4a'),
('sato-awakening', 3, 'Blue and Moody Music', '4:45', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2a/1f/d8/2a1fd860-94ae-324a-e0a3-52865e8b5c31/mzaf_9867590609431036642.plus.aac.p.m4a'),
('taeko-sunshower', 1, 'Summer Connection', '4:32', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/05/ae/30/05ae30f0-c558-86d9-fb4d-d7be8f572709/mzaf_10034446366055562725.plus.aac.p.m4a'),
('taeko-sunshower', 4, '都会 (Tokai)', '5:12', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8c/66/32/8c6632aa-ce5d-c896-9c8b-33c57834f2a0/mzaf_7224194775516073757.plus.aac.p.m4a'),
('taeko-sunshower', 6, '4:00A.M.', '5:37', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7c/3d/4e/7c3d4e80-9a67-06f3-1fe4-5ff797915ce5/mzaf_9236926402338949876.plus.aac.p.m4a'),
('miki-pocket-park', 1, '真夜中のドア ~ Stay With Me', '5:12', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5c/a4/e4/5ca4e4b9-296d-6a3a-7d00-cbf14a2c750f/mzaf_8959131982691784733.plus.aac.p.m4a'),
('miki-pocket-park', 6, 'Manhattan Wind', '4:15', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/06/c5/8e/06c58e0e-7fe8-7741-d3fe-2cf688ffaa44/mzaf_17212436290465474445.plus.aac.p.m4a'),
('miki-pocket-park', 7, '愛はエネルギー (Ai Wa Energy)', '4:32', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/de/8e/14/de8e14d1-44a8-cb2d-c03d-a2bd0daea03d/mzaf_15758675293557199442.plus.aac.p.m4a'),
('anri-timely', 1, 'CAT''S EYE', '3:32', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/3c/61/233c6101-8271-7534-c694-45c2af429d77/mzaf_13266760845597227483.plus.aac.p.m4a'),
('anri-timely', 2, 'Windy Summer', '4:07', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ee/f9/c7/eef9c708-1346-d42f-ad51-c075c20b4818/mzaf_10414375687322176447.plus.aac.p.m4a'),
('anri-timely', 6, '悲しみがとまらない (I Can''t Stop The Loneliness)', '4:23', true, null),
('anri-timely', 8, 'Remember Summer Days', '4:55', true, null),
('toshiki-after-5-clash', 1, 'IF YOU...', '4:44', true, null),
('toshiki-after-5-clash', 2, 'MIDNIGHT GIRL', '4:31', true, null),
('toshiki-after-5-clash', 3, 'AIRPORT LADY', '4:18', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/30/c6/53/30c65359-afea-7cf7-e818-ca85b664c918/mzaf_15351634387852462361.plus.aac.p.m4a'),
('toshiki-after-5-clash', 7, 'AFTER 5 CLASH', '5:02', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/cb/a8/67/cba867ba-d1ff-a942-ba1f-d1d1991f703a/mzaf_12421663637933207777.plus.aac.p.m4a'),
('piper-summer-breeze', 1, 'Shine On', '3:45', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/78/f2/b0/78f2b0b6-12d4-e918-4aa2-0814c146499b/mzaf_18131893792219195241.plus.aac.p.m4a'),
('piper-summer-breeze', 2, 'Summer Breeze', '4:20', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f4/b7/6a/f4b76a88-3ddb-3577-9150-8404bce29099/mzaf_16561491559441694509.plus.aac.p.m4a'),
('junko-magical', 1, 'Telephone Number', '3:54', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ce/a6/b4/cea6b413-3991-f796-d658-5c53f1d08b6d/mzaf_7133749371067584489.plus.aac.p.m4a'),
('junko-magical', 4, 'Sweet Love', '4:33', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/69/48/2d/69482da2-9c0e-41f7-60ae-541a94598484/mzaf_1039618077750197339.plus.aac.p.m4a'),
('momoko-adventure', 2, 'Adventure', '4:40', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/97/79/d6/mzi.fwvpuymu.aac.p.m4a'),
('momoko-adventure', 4, 'Night Cruising', '4:53', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/4b/db/ac/mzi.ycqnlnfv.aac.p.m4a'),
('momoko-adventure', 6, 'Mystical Composer', '5:06', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/43/50/62/mzi.esmhxtgt.aac.p.m4a'),
('takanaka-seychelles', 1, 'Oh! Tengo Suerte', '4:12', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/af/97/8a/af978a86-ba20-07c3-9867-3bbf617789d5/mzaf_4129898994992946841.plus.aac.p.m4a'),
('takanaka-seychelles', 2, 'トーキョーレギー (Tokyo Reggie)', '4:20', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/37/a7/2b/37a72b60-07a7-02be-e8cf-f0776230113a/mzaf_1646310089032148943.plus.aac.p.m4a'),
('takanaka-seychelles', 3, '蜃気楼の島へ (Shinkirou no Shima he)', '3:38', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/c8/59/01/c859016f-17b5-beee-d91c-5c40994f85d3/mzaf_5032750030305559266.plus.aac.p.m4a'),
('takanaka-seychelles', 4, '憧れのセーシェル諸島 (Akogare no Seychelles)', '6:08', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/18/77/53/187753a7-2d6a-0b04-3e92-61ee4299fdff/mzaf_6293613640638387623.plus.aac.p.m4a'),
('takanaka-seychelles', 5, 'Funkee Mah-Chan', '5:02', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/19/82/db/1982dbff-64a4-bd31-5f25-dec6e669ad03/mzaf_3816370574317625095.plus.aac.p.m4a'),
('takanaka-seychelles', 6, 'サヨナラ... Fujiさん (Sayonara... Fuji-san)', '4:28', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/bb/36/cd/bb36cd9f-1e9b-f48f-851c-c08624e564fb/mzaf_5137407621538772953.plus.aac.p.m4a'),
('takanaka-seychelles', 7, 'バードアイランド急行 (Bird Island Express)', '3:42', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/f6/91/02/f691025a-f861-cbf2-6a20-13edf30eaa37/mzaf_5795529053362336744.plus.aac.p.m4a'),
('takanaka-seychelles', 8, 'Tropic Birds', '8:50', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/4c/c5/9d/4cc59d67-6ee3-6c97-02b3-6e11292f35cf/mzaf_6614301067225860638.plus.aac.p.m4a')
ON CONFLICT DO NOTHING;

-- SEED DATA: Recommendations
INSERT INTO public.recommendations (album_title, artist, user_name, note, vibe, rating)
VALUES
('FOR YOU', 'Tatsuro Yamashita', 'Kenji_80s', 'The guitar intro on SPARKLE instantly transports you to a summer afternoon in Tokyo. Essential listening!', 'Beach Sunset', 5.0),
('POCKET PARK', 'Miki Matsubara', 'VinylCollector_JP', 'Stay With Me bassline is unmatched. RIP Miki Matsubara, a true legend of the era.', 'Midnight Drive', 5.0),
('VARIETY', 'Mariya Takeuchi', 'NeonNights', 'Plastic Love turned me into a City Pop fan 5 years ago. Still play it every single weekend.', 'Urban Romance', 5.0)
ON CONFLICT DO NOTHING;
