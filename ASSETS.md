# ASSETS.md — Love Site real-asset provenance

Downloaded 2026-11-17 by the asset-hunt worker. Every license below was verified on the
live source page (browser read) before download. Generated placeholder files
(`img/buddy.gif`, `img/heartbeat.gif`, `sounds/*.wav`) were left untouched.

Total size of the 13 downloaded files: **3,403,886 bytes (3.25 MiB)** — under the ~12 MB budget.

> **ATTRIBUTION ACTION REQUIRED (music):** `sounds/music.mp3` is CC BY 4.0 and
> Incompetech requires a **visible** credit in the finished site (see entry 16).
> This file alone does not satisfy that — put the credit line in the site's
> visible credits/footer. All other downloaded assets are CC0/public domain
> (no attribution required; authors recorded below as a courtesy).

## 1. GIFs

### 1. `img/hero-heart.gif` — FILLED
- **What it is:** 523×401 animated GIF, 9 frames, 4.5 s, infinite loop. Red hearts
  pop in one by one, then the text "Love", "Love You", "Love You Forever" appears
  in magenta. **Note: opaque white background, not transparent.**
- **Source page:** https://commons.wikimedia.org/wiki/File:Animation_love.gif
- **Direct file URL:** https://upload.wikimedia.org/wikipedia/commons/f/f3/Animation_love.gif
- **Author:** Matheus ssa2 (assumed, per file page)
- **License:** Creative Commons CC0 1.0 Universal Public Domain Dedication.
- **License line verified on the live file page:** "This file is made available
  under the Creative Commons CC0 1.0 Universal Public Domain Dedication." /
  "You can copy, modify, distribute and perform the work, even for commercial
  purposes, all without asking permission."
- **Verification:** `file` = GIF 89a 523×401; PIL frame count = 9; 24,003 bytes.

### 2. `img/hug-bears.gif` — UNFILLED
### 3. `img/cute-cat.gif` — UNFILLED
### 4. `img/love-bear.gif` — UNFILLED
See "Unfilled slots" at the bottom for the full hunt record and reasons.

## 2. PNG stickers (all transparent RGBA, verified with PIL)

### 5. `img/sticker-heart.png` — FILLED
- **What it is:** "Shiny Red Heart" — big glossy red heart with highlight, 716×676.
- **Source page:** https://openclipart.org/detail/241342/shiny-red-heart
- **Direct file URL:** https://openclipart.org/image/800px/241342
- **Author:** GDJ ("redrawn based on a design from Pixabay")
- **License:** CC0 1.0 / public domain (OpenClipart site-wide).
- **License line verified on the live OpenClipart FAQ page
  (https://openclipart.org/share):** "We use the Creative Commons Zero 1.0
  Public Domain License every time an artist uploads a piece of clipart to
  Openclipart to make it clear the artist is releasing the creative work for
  anyone to use for any reason, even commercially." / "you may use all clipart
  from Openclipart even for unlimited commercial use."
- **Verification:** RGBA, alpha range 0–255, 157,479 fully-transparent pixels;
  67,310 bytes.

### 6. `img/sticker-bear.png` — FILLED
- **What it is:** "Teddy bear" — cute sitting orange teddy, arms out, 628×800.
- **Source page:** https://openclipart.org/detail/302769/teddy-bear
- **Direct file URL:** https://openclipart.org/image/800px/302769
- **Author:** klsgfx
- **License:** CC0 1.0 / public domain (same OpenClipart FAQ license lines as #5).
- **Verification:** RGBA, alpha range 0–255, 179,915 fully-transparent pixels;
  84,783 bytes.

### 7. `img/sticker-cat.png` — FILLED
- **What it is:** "Happy Cat" — cute sitting white kitten, pink ears/paws, 800×754.
- **Source page:** https://openclipart.org/detail/332403/happy-cat
- **Direct file URL:** https://openclipart.org/image/800px/332403
- **Author:** j4p4n
- **License:** CC0 1.0 / public domain (same OpenClipart FAQ license lines as #5).
- **Verification:** RGBA, alpha range 0–255, 194,925 fully-transparent pixels;
  83,661 bytes.

### 8. `img/sticker-flowers.png` — FILLED
- **What it is:** "Bouquet (#1)" — red carnation bouquet in a cone wrap with a red
  bow, 645×788.
- **Source page:** https://openclipart.org/detail/312202/bouquet
- **Direct file URL:** https://openclipart.org/image/800px/312202
- **Author:** oksmith ("A public domain image from gahag.net")
- **License:** CC0 1.0 / public domain (same OpenClipart FAQ license lines as #5).
- **Verification:** RGBA, alpha range 0–255, 298,039 fully-transparent pixels;
  103,390 bytes.

### 9. `img/sticker-bow.png` — FILLED
- **What it is:** "Pink Bow" — pale-pink ribbon bow, 800×566.
- **Source page:** https://openclipart.org/detail/170156/pink-bow
- **Direct file URL:** https://openclipart.org/image/800px/170156
- **Author:** Gigglish ("A pink ribbon tied into a bow.")
- **License:** CC0 1.0 / public domain (same OpenClipart FAQ license lines as #5).
- **Verification:** RGBA, alpha range 0–255, 354,549 fully-transparent pixels;
  34,859 bytes.

## 3. Sound effects (all MP3, all far under 300 KB)

Kenney packs ship as OGG; each file below was converted to MP3 with ffmpeg
(libmp3lame, VBR q4) with no other alteration. Kenney pack downloads use
expiring signed URLs, so the canonical source is the pack page; the original
file inside the pack zip is named for each entry.

- **License (all Kenney entries):** Creative Commons CC0.
- **License line verified on the live Kenney page** (Music Jingles pack page,
  https://kenney.nl/assets/music-jingles): info-box row "License | Creative
  Commons CC0". Every Kenney pack page used here carries the same CC0 field,
  and each downloaded zip contains a `License.txt` reading: "License (Creative
  Commons Zero, CC0) http://creativecommons.org/publicdomain/zero/1.0/ You
  may use these assets in personal and commercial projects. Credit (Kenney or
  www.kenney.nl) would be nice but is not mandatory."
- **Author:** Kenney (Kenney Vleugels, kenney.nl). Credit optional.

### 10. `sounds/pop.mp3` — FILLED
- **Source page:** https://kenney.nl/assets/interface-sounds (Interface Sounds pack)
- **Original file in zip:** `Audio/pluck_001.ogg` (short pluck/pop, 0.10 s)
- **Verification:** MP3, 0.10 s, 2,000 bytes.

### 11. `sounds/chime.mp3` — FILLED
- **Source page:** https://kenney.nl/assets/interface-sounds (Interface Sounds pack)
- **Original file in zip:** `Audio/glass_001.ogg` (gentle glass tinkle, 0.28 s)
- **Verification:** MP3, 0.28 s, 2,154 bytes.

### 12. `sounds/sparkle.mp3` — FILLED
- **Source page:** https://kenney.nl/assets/digital-audio (Digital Audio pack)
- **Original file in zip:** `Audio/highUp.ogg` (rising shimmer, 0.55 s)
- **Verification:** MP3, 0.55 s, 6,301 bytes.

### 13. `sounds/yay.mp3` — FILLED
- **Source page:** https://kenney.nl/assets/music-jingles (Music Jingles pack)
- **Original file in zip:** `Audio/Steel jingles/jingles_STEEL07.ogg`
  (cheerful steel-drum jingle, 1.55 s)
- **Verification:** MP3, 1.55 s, 16,179 bytes.

### 14. `sounds/click.mp3` — FILLED
- **Source page:** https://kenney.nl/assets/interface-sounds (Interface Sounds pack)
- **Original file in zip:** `Audio/click_001.ogg` (soft UI click, 0.10 s)
- **Verification:** MP3, 0.10 s, 1,531 bytes.

### 15. `sounds/nope.mp3` — FILLED
- **Source page:** https://kenney.nl/assets/interface-sounds (Interface Sounds pack)
- **Original file in zip:** `Audio/error_003.ogg` (descending comedic error tone,
  0.53 s — the funny "nope" for the runaway button)
- **Verification:** MP3, 0.53 s, 6,403 bytes.
- **Note:** a CC0 cartoon boing was found and license-verified on Freesound
  ("Retro video game sfx - Spring 3" by OwlStorm, 0.94 s,
  https://freesound.org/people/OwlStorm/sounds/404757/ — page shows
  "Creative Commons 0" and "You can copy, modify, distribute and perform the
  sound, even for commercial purposes, all without the need of asking permission
  to the author"), but the Freesound CDN returned HTTP 403 for all preview
  downloads from this environment (HQ + LQ MP3 and OGG, with and without
  Referer), and full downloads need a login. The Kenney tone above was used
  instead; the boing can be swapped in later from that Freesound page if
  desired.

## 4. Music

### 16. `sounds/music.mp3` — FILLED
- **What it is:** "Heartwarming" by Kevin MacLeod — solo piano, 82 BPM, 72 s.
  Composer's description: "Quick and flowing like water, the piano is warm and
  bright, perfect for a romantic comedy or tender interlude. The melody is
  sweet and repeated four times in different refrains." Feel: Bouncy, Bright,
  Uplifting. Picked on title/description metadata (no listening possible).
- **Loop note:** NOT a seamless loop — the piece "slows to the final arpeggiated
  resolve" (composed ending). The site should replay it or crossfade on loop.
- **Source page:** http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100207
  (track page; ISRC USUAN1100207, also listed at
  https://incompetech.filmmusic.io/song/3864-heartwarming/)
- **Direct file URL:** https://incompetech.com/music/royalty-free/mp3-royaltyfree/Heartwarming.mp3
  (downloaded as-is, 320 kbps, no re-encode)
- **Author:** Kevin MacLeod (incompetech.com)
- **License:** Creative Commons Attribution 4.0 (CC BY 4.0).
- **License lines verified on the live Incompetech FAQ page
  (https://incompetech.com/music/royalty-free/faq.html):** "Is this music free
  to use? Yes." / credit block: "Title / Kevin MacLeod (incompetech.com) /
  Licensed under Creative Commons: By Attribution 4.0 /
  https://creativecommons.org/licenses/by/4.0/" / "Do I have to put the credit
  where people can see it? Yes." The Licenses page
  (https://incompetech.com/music/royalty-free/licenses/) confirms:
  "Creative Commons — Free. No charge. Requires that you credit the music."
- **Required attribution text (put it visibly in the site):**
  `Heartwarming — Kevin MacLeod (incompetech.com), licensed under Creative Commons: By Attribution 4.0, https://creativecommons.org/licenses/by/4.0/`
- **Verification:** MP3, 72.02 s, 320 kbps stereo, 2,971,312 bytes (< 4 MB).
- **Note:** FreePD (the preferred public-domain music source) is closed — its
  homepage now reads "FreePD.com - Site Closed ... we have officially taken the
  service offline." That is why a CC-BY Incompetech track was used instead.

## Unfilled slots — RESOLVED with generated art (2026-11-17)

### `img/hug-bears.gif`, `img/cute-cat.gif`, `img/love-bear.gif` — FILLED by code
No clean-licensed download could be found for these three slots (full hunt
record below, kept for honesty), so they were drawn as original animated
artwork with `tools/make_gifs.py` — see section 6. The old generated
placeholders `img/buddy.gif` and `img/heartbeat.gif` were removed from the
final zip because nothing references them any more.

The hunt record (why no download was used):

**Sources searched:**
- **Wikimedia Commons** (API category + title searches over GIF files, each
  candidate's license checked): the only CC0/PD animated GIFs in this area were
  `File:Animation love.gif` (used for the hero slot), `File:Cartoon Cat
  Running.gif` (CC BY 2.5 — rejected on quality: a scruffy textured cat on a
  black background, 131×99, not cute and no heart/kiss/wave), and
  `File:Cat tail ani.gif` (public domain, 91×91 tail close-up — too small and
  abstract). All other heart/cat/bear/kiss/hug GIFs found were CC BY-SA
  (share-alike — outside the allowed CC0/CC-BY scope), anatomical/medical
  imagery, flag-patterned hearts, or unrelated photos. No hugging-bears or
  bear-with-heart GIF exists on Commons under a usable license.
- **OpenGameArt:** "Heart Animation" (CC-BY 3.0) is an anatomically correct
  beating heart — wrong for a love site; "Life heart and rainbow star gifs"
  (CC0) is a pixel game life-heart with crying/bleeding stages — wrong vibe.
  Cat results were game sprite sheets (not GIFs, not cute/romantic); no
  hugging-bear or love-bear animation found.
- **Openverse** (CC-licensed media search, GIF filter): "teddy bear hug",
  "cat heart", "hugging bears", "bear heart", "cute cat" returned 0 usable
  results; "heart beating" returned only anatomical/BY-SA files.
- **Pixabay:** Pixabay GIF pages could not be verified from this environment
  (no live browser; web search surfaced no verifiable pixabay.com GIF pages,
  only a suspicious third-party mirror domain which was rejected as untrusted
  provenance). Pixabay remains the most promising place for a human to look
  for these three slots — any GIF there is under the Pixabay Content License
  (free commercial use, no attribution), but each file's own page must be
  checked before use.

**Fallback used:** the three slots were filled with original generated GIFs
(see section 6). The downloaded CC0 hero GIF (section 1) was likewise
evaluated and replaced by a generated hero animation for visual quality —
its provenance is preserved above and it remains recoverable from its
direct URL.

## 5. Fonts (self-hosted, no CDN)

Both families are licensed under the **SIL Open Font License 1.1**, which
permits free commercial use, embedding, and redistribution (the font files
themselves may not be sold on their own). Files are the Latin subsets from
Fontsource (which redistributes the Google Fonts files unmodified).

- `fonts/caveat-600.woff2`, `fonts/caveat-700.woff2` — **Caveat** by Impallari
  Type (Pablo Impallari). License verified on the live Fontsource page
  (https://fontsource.org/fonts/caveat/about): "License OFL-1.1" with the
  full SIL Open Font License 1.1 text ("This Font Software is licensed under
  the SIL Open Font License, Version 1.1."). Copyright 2014 The Caveat
  Project Authors (https://github.com/googlefonts/caveat).
- `fonts/fredoka-400.woff2`, `fonts/fredoka-500.woff2`, `fonts/fredoka-600.woff2`
  — **Fredoka** by Milena Brandão and Hafontia. License verified via live
  pages (Fontsource/Google Fonts metadata): "SIL Open Font License 1.1 …
  You can use it free in personal and commercial work, including websites,
  apps, logos, print and video, and embed it in documents and software."
  Copyright 2016 The Fredoka Project Authors
  (https://github.com/hafontia/Fredoka-One).

## 6. Generated animated GIFs (original artwork, no licence needed)

Drawn in code with `tools/make_gifs.py` (Python/PIL, run 2026-11-17; the
script is included in the zip so the GIFs can be regenerated). All four are
original drawings made for this site — no third-party art, no licence
restrictions. Each was visually inspected frame by frame.

- `img/hero-heart.gif` — 280×280, 24 frames. Big glossy beating heart with
  highlight, rising mini hearts and twinkling sparkles. REPLACES the
  downloaded CC0 file from section 1 (same filename): the Commons GIF was
  flat red clip-art hearts with magenta text on white, which clashed with
  the site's soft pink theme. The downloaded file's provenance is preserved
  in section 1 and it can be re-downloaded from its direct URL any time.
- `img/hug-bears.gif` — 280×280, 26 frames. Two chibi bears walk together,
  hug, and little hearts rise above them; seamless ping-pong loop.
- `img/cute-cat.gif` — 280×280, 18 frames. White kitten face with pink inner
  ears, bow, whiskers and blush; blinks, ear twitch, pulsing heart above.
- `img/love-bear.gif` — 280×280, 24 frames. Honey bear holding a beating
  heart, gentle bob, blinking, twinkling sparkles.

## 7. Generated fallback sounds (original, no licence needed)

`sounds/*.wav` (pop, chime, sparkle, yay, nope, music) were synthesised by
`tools/make_assets.py` (sine tones, included in the zip). They are fallback
sources only: the site tries the downloaded MP3s first and only uses a WAV
if the MP3 fails to load. Original work, no licence restrictions.

## 8. What is NOT in the zip

- `img/buddy.gif` and `img/heartbeat.gif` (the scaffold's first generated
  GIFs) were removed: no page references them any more.
- No photos of the couple are included or invented. The gallery starts with
  placeholder frames; photos are added via `js/config.js` (see README.txt).
- No emoji characters appear anywhere in the site's text, titles, buttons
  or particles (verified by scan). All icons are inline SVG or image files.
