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
('bread-butter-late-late-summer', 'LATE LATE SUMMER', 'Bread & Butter', 'ブレッド＆バター', 1979, ARRAY['Beach Sunset', 'City Pop', 'AOR / Soft Rock'], 'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/5c/88/db/5c88db03-a3a8-07cc-e7ad-871694d5e34a/886448397588.jpg/600x600bb.jpg', 4.9, 340, 'Bread & Butter''s legendary 1979 coastal AOR and city pop album. Featuring the immortal summer anthem ''Summer Blue'' and backing by Tin Pan Alley and YMO members.', 85, 30, 100, 75),
('taeko-mignonne', 'MIGNONNE', 'Taeko Ohnuki', '大貫妙子', 1978, ARRAY['Melancholic Sunset', 'Urban Romance', 'Fusion Jazz'], 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/6c/fb/4a6cfb1c-92a2-8e10-9189-63a12a52efc1/4582290457635.jpg/600x600bb.jpg', 4.9, 430, 'Arranged by Ryuichi Sakamoto and Nobuhiro Yamashita, Mignonne is Taeko''s iconic 1978 masterpiece home to global city pop anthems ''4:00 A.M.'' and ''Totsuzen No Okurimono''.', 88, 75, 92, 95),
('miki-pocket-park', 'POCKET PARK', 'Miki Matsubara', '松原みき', 1980, ARRAY['Urban Romance', 'Midnight Drive', 'Disco Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/06/eb/b1/06ebb16a-7e31-5818-4be9-684cb57622dc/PA00204086_0_234544_jacket.jpg/600x600bb.jpg', 4.8, 289, 'Featuring the unforgettable single ''Mayonaka no Door / Stay With Me'', Miki Matsubara''s debut album is a masterpiece of late 70s / early 80s Tokyo nightlife energy.', 90, 55, 80, 99),
('anri-timely', 'TIMELY!!', 'Anri', '杏里', 1983, ARRAY['Beach Sunset', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/81/ad/b2/81adb240-233e-705a-7397-1e8187c97561/artwork.jpg/600x600bb.jpg', 4.9, 310, 'Arranged by Toshiki Kadomatsu, TIMELY!! is the ultimate coastal synth-pop soundtrack. Bright, energetic, and brimming with tropical horn lines and driving basslines.', 92, 20, 100, 88),
('toshiki-after-5-clash', 'AFTER 5 CLASH', 'Toshiki Kadomatsu', '角松敏生', 1984, ARRAY['Midnight Drive', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/78/e3/67/78e367f4-4ef7-4371-0c16-37b331748bc6/4547366621266.jpg/600x600bb.jpg', 4.8, 204, 'The ultimate soundtrack for cruising through Shinjuku at 2 AM. Toshiki Kadomatsu delivers punchy slap bass, LinnDrum grooves, and late-night funk elegance.', 98, 35, 70, 100),
('casiopea-mint-jams', 'MINT JAMS', 'Casiopea', 'カシオペア', 1982, ARRAY['Fusion Jazz', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b2/54/db/b254dbdb-0661-034e-7f7a-04fa43231531/4582290414003.jpg/600x600bb.jpg', 4.9, 360, 'A live-in-studio masterpiece of Japanese jazz-fusion. Famous worldwide for its blistering slap basslines, soaring synths, and infectious rhythm guitar work.', 98, 10, 95, 90),
('junko-magical', 'MAGICAL', 'Junko Ohashi', '大橋純子', 1983, ARRAY['Midnight Drive', 'Disco Funk', 'Boogie'], 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/81/50/27/81502762-96b9-93bf-ea96-80416b09f169/4988021811071.png/600x600bb.jpg', 4.9, 220, 'A holy grail collector''s album featuring ''Telephone Number''. Deep funky grooves, brass arrangements, and Junko''s powerhouse vocal delivery.', 96, 40, 75, 95),
('momoko-adventure', 'ADVENTURE', 'Momoko Kikuchi', '菊池桃子', 1986, ARRAY['Synth Pop', 'Melancholic Sunset', 'Urban Romance'], 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/88/b3/14/88b314cf-f8bb-a7f8-f316-ce026a3293f6/dj.zgrtxkxp.jpg/600x600bb.jpg', 4.8, 198, 'Produced by Tetsuji Hayashi, ADVENTURE is famous for lush synth pads, dreamy whisper vocals, and serene night-drive vibes like ''Mystical Composer'' and ''Night Cruising''.', 72, 80, 65, 98),
('takanaka-seychelles', 'SEYCHELLES', 'Masayoshi Takanaka', '高中正義', 1976, ARRAY['Beach Sunset', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ef/38/80/ef388041-7f6a-1be3-95f3-00489d8a795b/00602498909355.rgb.jpg/600x600bb.jpg', 5.0, 385, 'Masayoshi Takanaka''s legendary 1976 debut solo album. A landmark tropical jazz-fusion & resort city pop masterpiece featuring vibrant Latin percussion, seaside guitar melodies, and lush island vibes.', 98, 15, 100, 90),
('takako-mamiya-love-trip', 'LOVE TRIP', 'Takako Mamiya', '間宮貴子', 1982, ARRAY['Midnight Drive', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e8/3a/2b/e83a2b42-b8a7-b821-32e4-912a2ee9bfec/23UMGIM09953.rgb.jpg/600x600bb.jpg', 5.0, 480, 'Takako Mamiya''s legendary 1982 solitary masterpiece arranged by Genji Sawai and backed by jazz-fusion group So&So. Famous worldwide for late-night city pop grails ''Love Trip'' and ''Mayonaka no Joke''.', 95, 50, 85, 100),
('taeko-sunshower', 'SUNSHOWER', 'Taeko Ohnuki', '大貫妙子', 1977, ARRAY['Urban Romance', 'Fusion Jazz', 'City Pop'], 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/57/a1/ff/57a1ff39-eb23-40d9-1e91-f8fcc923f4a9/CRCPX-20462.jpg/600x600bb.jpg', 5.0, 520, 'Taeko Ohnuki''s historic 1977 sophomore album, arranged with Ryuichi Sakamoto, Haruomi Hosono, and Chris Parker. Home to quintessential city pop classics ''都会 (Tokai)'' and ''Summer Connection''.', 94, 65, 90, 92),
('yurie-kokubu-relief-72-hours', 'RELIEF 72 HOURS', 'Yurie Kokubu', '国分友里恵', 1983, ARRAY['Midnight Drive', 'Boogie', 'Synth Funk'], 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/29/07/b2/2907b2c6-7736-403e-a7db-7392a7f793aa/jacket_MHCL30150B00Z_550.jpg/600x600bb.jpg', 4.9, 310, 'Yurie Kokubu''s dazzling 1983 debut solo album produced by Masaki Matsubara. Packed with crisp slap basslines, horn stabs, and midnight boogie hits like ''Just a Joke'' and ''Snob na Yoru he''.', 96, 45, 80, 98),
('tomoko-aran-fuyu-kukan', 'FUYŪ-KŪKAN (浮遊空間)', 'Tomoko Aran', '亜蘭知子', 1983, ARRAY['Midnight Drive', 'Synth Funk', 'City Pop'], 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/cd/4e/ea/cd4eeac8-b592-e933-6b6b-f928afab15ae/mzi.rjmkypgd.jpg/600x600bb.jpg', 5.0, 620, 'Tomoko Aran''s 1983 seminal masterpiece produced by Masao Sasaji. Featuring the globally iconic bass groove of ''Midnight Pretenders'' and dazzling tracks ''I''m In Love'' and ''Body to Body''.', 98, 60, 75, 100),
('kirinji-3', '3', 'KIRINJI', 'キリンジ', 2000, ARRAY['Urban Romance', 'Melancholic Sunset', 'City Pop'], 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/81/0e/79/810e795a-c228-1e5d-4122-a4a4b2bbd3a8/190295494711.jpg/600x600bb.jpg', 4.9, 410, 'KIRINJI''s monumental 2000 third studio album. Home to the legendary, haunting nocturnal ballad ''エイリアンズ (Aliens)'', widely regarded as one of the finest sophisti-pop / neo-city pop tracks ever made.', 80, 90, 85, 96),
('ryusenkei-tokyo-sniper', 'TOKYO SNIPER', 'Ryusenkei', '流線形', 2006, ARRAY['Midnight Drive', 'Urban Romance', 'Boogie'], 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/a4/d3/b6/a4d3b632-1de0-1d3f-5721-d50eeb58e743/mzi.tndehlcj.jpg/600x600bb.jpg', 5.0, 390, 'Cunimondo Takiguchi''s neo-city pop opus featuring vocals by Hitomi Eguchi. A flawless, sleek tribute to early 80s Tokyo nightlife, driving grooves, and sophisticated melodies.', 95, 40, 88, 99),
('momoko-ocean-side', 'OCEAN SIDE', 'Momoko Kikuchi', '菊池桃子', 1984, ARRAY['Beach Sunset', 'Synth Pop', 'City Pop'], 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/34/60/5b/34605b06-7915-b2e2-61f2-355a263414bc/HIEN-05051_990000.jpg/600x600bb.jpg', 4.8, 260, 'Momoko Kikuchi''s 1984 debut album produced by hitmaker Tetsuji Hayashi. Breezy coastal arrangements, shimmering DX7 synths, and classic summer resort anthems like ''Ocean Side'' and ''Blind Curve''.', 78, 30, 100, 70)
ON CONFLICT (id) DO NOTHING;

-- =========================================================
-- SEED DATA: Tracks with Authentic Audio Previews
-- =========================================================

INSERT INTO public.tracks (album_id, track_number, title, duration, is_highlight, preview_url)
VALUES
('bread-butter-late-late-summer', 8, 'Summer Blue', '4:10', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8f/ca/e0/8fcae049-4e43-62ca-a011-4e5e406f52b8/mzaf_18129130255482439056.plus.aac.p.m4a'),
('bread-butter-late-late-summer', 5, '渚にいこう (Nagisa Ni Ikou)', '3:44', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5d/dc/41/5ddc41d8-a3f6-5999-2825-a6868530168a/mzaf_1650700056955454278.plus.aac.p.m4a'),
('taeko-mignonne', 7, '4:00 A.M.', '5:37', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7c/3d/4e/7c3d4e80-9a67-06f3-1fe4-5ff797915ce5/mzaf_9236926402338949876.plus.aac.p.m4a'),
('taeko-mignonne', 8, '突然の贈り物 (Totsuzen No Okurimono)', '5:02', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b3/41/f6/b341f690-f3eb-e501-0301-f4908acd3a56/mzaf_1594552257957446328.plus.aac.p.m4a'),
('casiopea-mint-jams', 1, 'Take Me', '4:52', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f0/c9/46/f0c946c3-6738-9948-0c01-5160f8572b96/mzaf_18365617094760906428.plus.aac.p.m4a'),
('casiopea-mint-jams', 2, 'Asayake', '5:03', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/77/48/9c/77489ce8-f440-ad56-616a-5bc9f39520ab/mzaf_168556408365358289.plus.aac.p.m4a'),
('miki-pocket-park', 1, '真夜中のドア ~ Stay With Me', '5:12', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5c/a4/e4/5ca4e4b9-296d-6a3a-7d00-cbf14a2c750f/mzaf_8959131982691784733.plus.aac.p.m4a'),
('anri-timely', 1, 'CAT''S EYE', '3:32', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/3c/61/233c6101-8271-7534-c694-45c2af429d77/mzaf_13266760845597227483.plus.aac.p.m4a'),
('toshiki-after-5-clash', 3, 'AIRPORT LADY', '4:18', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/30/c6/53/30c65359-afea-7cf7-e818-ca85b664c918/mzaf_15351634387852462361.plus.aac.p.m4a'),
('junko-magical', 1, 'Telephone Number', '3:54', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ce/a6/b4/cea6b413-3991-f796-d658-5c53f1d08b6d/mzaf_7133749371067584489.plus.aac.p.m4a'),
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
('takanaka-seychelles', 8, 'Tropic Birds', '8:50', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/4c/c5/9d/4cc59d67-6ee3-6c97-02b3-6e11292f35cf/mzaf_6614301067225860638.plus.aac.p.m4a'),
-- Takako Mamiya - LOVE TRIP
('takako-mamiya-love-trip', 1, 'LOVE TRIP', '4:00', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/85/21/dc/8521dcbd-3f90-6150-7c65-4d445c0b031f/mzaf_1489591114926746723.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 2, 'チャイニーズ・レストラン', '3:52', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f2/05/7a/f2057ab3-35b8-cd45-6f02-e5f0e3990f1d/mzaf_16715756362598591831.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 3, '真夜中のジョーク', '4:52', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/51/72/fc/5172fc22-417e-1800-fcb1-839bbda45006/mzaf_11444892637683946534.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 4, '哀しみは夜の向こう', '4:05', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bb/85/d3/bb85d338-5233-2c80-e4bc-fbb2c5205280/mzaf_1753874604279449153.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 5, 'ALL OR NOTHING', '4:23', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e7/f5/4c/e7f54cd0-107b-81fe-597f-f2ae07c2b8e5/mzaf_9852240325519387545.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 6, '渚でダンス', '4:18', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/74/f0/0f/74f00f9a-1a04-89d6-208d-62cbac22ccbc/mzaf_17195789534838938387.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 7, 'ONE MORE NIGHT', '4:02', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ef/75/4e/ef754e58-c232-f2ec-6de8-549ac6159373/mzaf_922465186258534934.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 8, 'モーニング・フライト', '4:09', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0c/55/44/0c5544bd-7b20-6318-3b8e-45cbce56006b/mzaf_5048746590040679934.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 9, 'たそがれは銀箔の…', '4:27', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ff/9a/c8/ff9ac8b2-cd6a-fb26-a608-9ad5c1576721/mzaf_6822713001248761896.plus.aac.p.m4a'),
('takako-mamiya-love-trip', 10, 'WHAT A BROKEN HEART CAN DO', '4:12', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c4/d8/2e/c4d82e59-24f7-9309-3eba-0e4ec7420994/mzaf_16092514159516108110.plus.aac.p.m4a'),
-- Taeko Ohnuki - SUNSHOWER
('taeko-sunshower', 1, 'Summer Connection', '4:30', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8c/e0/a3/8ce0a393-41e7-5df7-7644-7febb42f722b/mzaf_15802220211347961851.plus.aac.p.m4a'),
('taeko-sunshower', 2, 'くすりをたくさん', '4:09', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2f/80/46/2f8046dc-5f77-225d-bf60-591c01d557e8/mzaf_18258321986701043116.plus.aac.p.m4a'),
('taeko-sunshower', 3, '何もいらない', '4:02', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/95/fe/11/95fe1169-8aff-e731-fefe-d8d88f796d6a/mzaf_11158243454771049211.plus.aac.p.m4a'),
('taeko-sunshower', 4, '都会 (Tokai)', '5:10', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/68/92/2b/68922b06-4c92-0f91-0660-3f78b7d03be2/mzaf_17098287226750890228.plus.aac.p.m4a'),
('taeko-sunshower', 5, 'からっぽの椅子', '5:34', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8d/7f/f2/8d7ff2d0-9957-b641-92e8-7b72aa67b4fe/mzaf_16134311775240667749.plus.aac.p.m4a'),
('taeko-sunshower', 8, 'Silent Screamer', '3:35', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/01/53/ce/0153cef3-059c-83a5-e7f3-bd971830dd9b/mzaf_17840042833834256615.plus.aac.p.m4a'),
-- Yurie Kokubu - RELIEF 72 HOURS
('yurie-kokubu-relief-72-hours', 1, 'スノッブな夜へ', '4:51', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/93/94/19939493-d740-c2a2-2ecb-80e4fce55bad/mzaf_4653016112884440284.plus.aac.p.m4a'),
('yurie-kokubu-relief-72-hours', 2, '恋の横顔', '3:22', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c0/11/a6/c011a66d-bb7a-4348-8384-c0d00435ce7d/mzaf_2222375746045965911.plus.aac.p.m4a'),
('yurie-kokubu-relief-72-hours', 3, 'Weekend Love', '4:07', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/83/e6/a583e607-2e9f-7ad5-efc0-9d07945b03f7/mzaf_1563473862165157812.plus.aac.p.m4a'),
('yurie-kokubu-relief-72-hours', 4, 'Love Song', '4:12', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/87/55/ff/8755ffa2-4d28-b571-67e8-409e235e07d8/mzaf_280041514602621649.plus.aac.p.m4a'),
('yurie-kokubu-relief-72-hours', 9, 'Just a Joke', '3:09', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d3/d9/87/d3d987d2-3627-8de1-15e2-b4883dd61345/mzaf_18177970469141514272.plus.aac.p.m4a'),
-- Tomoko Aran - FUYŪ-KŪKAN (浮遊空間)
('tomoko-aran-fuyu-kukan', 1, 'Body to Body', '4:06', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/30/c1/c7/30c1c7f3-9b7d-80a5-f1c2-6e82af058326/mzaf_7473662511268920906.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 2, 'Lonely Night', '2:24', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/01/87/b8/0187b8bf-1711-7c90-3556-9fbb31dad10e/mzaf_7957403675820547016.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 3, 'I''m In Love', '5:53', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4e/6d/eb/4e6deb97-f22a-0390-940b-98329d39bae8/mzaf_4462917757292400750.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 4, 'ジ・レ・ン・マ', '3:33', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f9/50/37/f95037c3-a952-55c3-8c59-4dc09d9a6bf9/mzaf_10560317385245466365.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 5, 'Midnight Pretenders', '5:45', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/20/f1/19/20f1190f-5157-6e6c-c790-30ce193899d5/mzaf_9594880718756910998.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 6, 'ひと夏のタペストリー', '4:29', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/3b/d6/d8/3bd6d887-5491-e97a-852c-69bef6b41275/mzaf_7805430678307023004.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 7, 'HANNYA', '5:30', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/30/61/c0/3061c01e-72fa-a3b7-77f9-7cf880245bb5/mzaf_5717923050247667881.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 8, 'しゃくなYesterday', '5:01', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1b/7e/84/1b7e849c-9d87-ca81-9338-a3c91f78f3e1/mzaf_10085975202032876005.plus.aac.p.m4a'),
('tomoko-aran-fuyu-kukan', 9, 'Baby, Don''t You Cry Anymore', '5:25', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a4/66/2f/a4662f91-1cf8-acb3-50a8-000fd8a57b3a/mzaf_13953370988965515968.plus.aac.p.m4a'),
-- KIRINJI - 3
('kirinji-3', 1, 'グッデイ・グッバイ (Good Day Goodbye)', '4:20', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/0d/b4/86/0db48600-f06f-9b0e-4288-0439c0b5487f/mzaf_9508774298473086744.plus.aac.p.m4a'),
('kirinji-3', 6, 'エイリアンズ (Aliens)', '6:04', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7c/65/d2/7c65d2a8-cfe8-0c45-a567-ccc0cf71e3d4/mzaf_12812858319348990513.plus.aac.p.m4a'),
-- Ryusenkei - TOKYO SNIPER
('ryusenkei-tokyo-sniper', 1, 'タイムマシーン・ラブ (Time Machine Love)', '4:26', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ba/de/28/bade287c-79dd-5062-6a8c-331742b693b8/mzaf_16923115120955546535.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 2, '花びら', '5:39', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/88/08/b0/8808b0d1-0f66-5118-ea52-7c2787104da9/mzaf_12075890494599304429.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 3, 'レインボー・シティ・ライン (Rainbow City Line)', '4:33', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d1/4e/86/d14e8668-8c8a-5492-05ee-cdf062829220/mzaf_2973326275731399462.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 4, '恋のラストナンバー', '5:20', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/e8/4c/3fe84c97-8850-606c-23dc-076039356042/mzaf_18296685992817428965.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 5, '薄紫色の彼方', '4:25', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/0b/56/980b56a7-cc72-07d6-bd5f-99df7e82f334/mzaf_13297560860881188883.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 6, 'TOKYO SNIPER', '4:37', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/42/1c/b3/421cb3fb-a9de-5687-da26-8cfbba9306cf/mzaf_353048213386480683.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 7, 'DANCING INTO FANTASY', '4:35', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/45/70/534570fc-4bee-aa23-78ff-735a29ce8d67/mzaf_1180990127416722934.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 8, 'スプリング・レイン', '6:25', false, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/57/5e/21/575e215d-cc31-2940-72e9-9bbde139b05f/mzaf_11297103345103545165.plus.aac.p.m4a'),
('ryusenkei-tokyo-sniper', 9, '雨のシンデレラ', '6:35', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b8/e1/ef/b8e1ef31-7de1-bb71-b7d6-e446f682b165/mzaf_3743878716654372802.plus.aac.p.m4a'),
-- Momoko Kikuchi - OCEAN SIDE
('momoko-ocean-side', 1, 'Ocean Side', '4:38', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8a/08/29/8a082982-02f6-f707-b10e-f4b270cbca9d/mzaf_6519586324793034289.plus.aac.p.m4a'),
('momoko-ocean-side', 3, 'Blind Curve', '4:03', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c2/5b/65/c25b6542-32ae-b871-2739-d827786e78a4/mzaf_2234363413883134988.plus.aac.p.m4a'),
('momoko-ocean-side', 4, 'Summer Eyes', '3:37', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1c/76/19/1c7619f3-4f16-dc9c-78cb-4dc464c35b8c/mzaf_13166030574604496837.plus.aac.p.m4a'),
('momoko-ocean-side', 5, 'Futari No Night Dive', '4:23', true, 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/30/90/93/309093ea-1cf1-7615-2f6c-855816e386dc/mzaf_2242174629655713121.plus.aac.p.m4a')
ON CONFLICT DO NOTHING;

-- SEED DATA: Recommendations
INSERT INTO public.recommendations (album_title, artist, user_name, note, vibe, rating)
VALUES
('FUYŪ-KŪKAN (浮遊空間)', 'Tomoko Aran', 'MidnightPretender', 'The synth bassline on Midnight Pretenders is heavenly. Sampled by The Weeknd, unmatched atmosphere!', 'Midnight Drive', 5.0),
('LOVE TRIP', 'Takako Mamiya', 'MayonakaGroove', 'The title track and Mayonaka no Joke are the pinnacle of 1982 nocturnal city pop. Timeless bassline.', 'Midnight Drive', 5.0),
('TOKYO SNIPER', 'Ryusenkei', 'ShinjukuCruiser', 'Neo city pop at its finest! Time Machine Love and Tokyo Sniper feel like cruising down Shuto Expressway at night.', 'Midnight Drive', 5.0),
('3', 'KIRINJI', 'AorLover', 'Aliens is a masterpiece of songwriting. Perfect chord progressions and late night Tokyo mood.', 'Urban Romance', 5.0),
('OCEAN SIDE', 'Momoko Kikuchi', 'HayashiFan', 'Tetsuji Hayashi''s production on Ocean Side and Blind Curve is the definition of sunny seaside city pop.', 'Beach Sunset', 5.0),
('FOR YOU', 'Tatsuro Yamashita', 'Kenji_80s', 'The guitar intro on SPARKLE instantly transports you to a summer afternoon in Tokyo. Essential listening!', 'Beach Sunset', 5.0),
('POCKET PARK', 'Miki Matsubara', 'VinylCollector_JP', 'Stay With Me bassline is unmatched. RIP Miki Matsubara, a true legend of the era.', 'Midnight Drive', 5.0),
('SUNSHOWER', 'Taeko Ohnuki', 'TokyoAfterDark', '都会 (Tokai) arranged by Ryuichi Sakamoto is an untouchable classic.', 'Urban Romance', 5.0),
('RELIEF 72 HOURS', 'Yurie Kokubu', 'BoogieKing', 'Masaki Matsubara''s guitar work and Yurie''s vocals on Just a Joke are perfection.', 'Midnight Drive', 5.0),
('VARIETY', 'Mariya Takeuchi', 'NeonNights', 'Plastic Love turned me into a City Pop fan 5 years ago. Still play it every single weekend.', 'Urban Romance', 5.0)
ON CONFLICT DO NOTHING;
