FOR PRASHU — A LITTLE WEBSITE FULL OF LOVE
==========================================

HOW TO OPEN IT
1. Unzip this folder anywhere.
2. Double-click index.html. It opens in any browser, on a computer
   or a phone. No internet needed — every font, picture and sound
   is inside this folder.
3. Tap the Music button once to start the background tune. Browsers
   block music until the first tap, so it cannot start on its own.

HOW TO PUT IT ONLINE (FREE)
Option A — Netlify Drop: go to app.netlify.com/drop in a browser and
drag this whole folder onto the page. You get a shareable link.
Option B — GitHub Pages: create a free GitHub repository, upload
these files, then turn on Pages in the repository settings.
Send her the link. That is all.

HOW TO EDIT IT (EVERYTHING PERSONAL IS IN ONE FILE)
Open js/config.js in any text editor. You will find, with comments:
- her / me: her name and your name (used everywhere).
- since: your anniversary date as "YYYY-MM-DD". Leave it empty ("")
  if you are not sure — the home page then shows a sweet line with
  no day count instead of guessing a number.
- letters: the five letters. Rewrite them in your own words. A blank
  line in the text starts a new paragraph.
- reasons: the list of reasons. Add or remove as many as you like;
  the cards, shuffle and counter adapt automatically.
- photos: see below.
No other file needs editing for personal touches.

HOW TO ADD YOUR PHOTOS
1. Put your photo files (JPG or PNG) in the img/ folder.
2. In js/config.js, list them under photos, for example:
     photos: ["img/us1.jpg", "img/us2.jpg"]
   You can add a caption to any photo like this:
     photos: [{ src: "img/us1.jpg", caption: "Us, happy" }]
3. Reload the home page. The placeholder frames disappear on their
   own once photos are added. No photos of you are included — the
   gallery starts empty on purpose.

WHAT IS INSIDE
- 5 pages: Home (hugs + gallery), Letters (sealed envelopes),
  Reasons (flip cards), Surprise (a shy No button), Play (catch
  the falling hearts).
- Music + sound effects, floating hearts, confetti, and a hug
  counter that remembers how many hugs were sent.
- Best game score is saved on the device that plays it.

CREDITS AND LICENCES
See ASSETS.md for every image, sound, music track and font used,
with its source and licence. All fonts are SIL Open Font License.
All downloaded assets are free for commercial use; anything made
with code is original. If you replace assets, keep ASSETS.md honest.

TROUBLESHOOTING
- No music? Tap the Music button once. Browsers require a tap.
- A picture looks broken? Check the file name matches exactly,
  including upper/lower case, in js/config.js.
- The site works from file:// (double-click) and from any static
  host. It needs JavaScript turned on.
