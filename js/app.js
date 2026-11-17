/* For Prashu — a little website full of love. All content lives in js/config.js. */
(function () {
  "use strict";
  const C = window.CONFIG || {};
  const HER = C.her || "Prashu";
  const ME = C.me || "Samman";
  const page = document.body.dataset.page || "index";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  };

  /* ---------------- Inline SVG icons (no emojis anywhere) ---------------- */
  const P = {
    heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    sparkle: "M12 2l2.1 6.5L21 11l-6.9 2.5L12 20l-2.1-6.5L3 11l6.9-2.5z",
    note: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
    mail: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    play: "M8 5v14l11-7z",
    shuffle: "M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z",
    chevron: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
    camera: "M12 15.2c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2 1.43 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
    refresh: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
  };
  const icon = (name, cls) => '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + P[name] + '"/></svg>';
  const heartSvg = (color) => '<svg viewBox="0 0 24 24" fill="' + color + '" aria-hidden="true"><path d="' + P.heart + '"/></svg>';

  /* ---------------- Sounds (downloaded files first, generated fallback) ---------------- */
  const SFX = {
    pop: ["sounds/pop.mp3", "sounds/pop.wav"],
    chime: ["sounds/chime.mp3", "sounds/chime.wav"],
    sparkle: ["sounds/sparkle.mp3", "sounds/sparkle.wav"],
    yay: ["sounds/yay.mp3", "sounds/yay.wav"],
    click: ["sounds/click.mp3", "sounds/pop.mp3", "sounds/pop.wav"],
    nope: ["sounds/nope.mp3", "sounds/nope.wav"]
  };
  function playSfx(name) {
    const srcs = SFX[name] || [];
    let i = 0;
    const attempt = () => {
      if (i >= srcs.length) return;
      const a = new Audio(srcs[i++]);
      let settled = false;
      const next = () => { if (!settled) { settled = true; attempt(); } };
      a.addEventListener("error", next, { once: true });
      const p = a.play();
      if (p && p.then) p.then(() => { settled = true; }).catch(next);
      else settled = true;
    };
    try { attempt(); } catch (e) { /* audio unavailable — stay silent */ }
  }

  /* ---------------- Music (click-to-start; browsers block autoplay) ---------------- */
  const MUSIC_SRCS = ["sounds/music.mp3", "sounds/music.wav"];
  const music = new Audio();
  music.loop = true;
  music.volume = 0.35;
  music.preload = "auto";
  let musicIdx = 0, musicReady = false;
  function loadMusic() {
    if (musicIdx >= MUSIC_SRCS.length) return;
    music.src = MUSIC_SRCS[musicIdx++];
  }
  music.addEventListener("error", () => { if (!musicReady) loadMusic(); });
  loadMusic();
  let musicOn = store.get("prashu-music") === "1";
  const savedPos = parseFloat(store.get("prashu-music-pos") || "0");
  function updateMusicBtn() {
    const b = $("#musicBtn");
    if (!b) return;
    b.classList.toggle("playing", musicOn);
    b.setAttribute("aria-pressed", musicOn ? "true" : "false");
    const lbl = b.querySelector(".lbl");
    if (lbl) lbl.textContent = musicOn ? "Music on" : "Music";
  }
  function startMusic() {
    if (!musicOn) return;
    try {
      if (savedPos > 0 && music.currentTime === 0) { try { music.currentTime = savedPos; } catch (e) { } }
      const p = music.play();
      if (p && p.then) p.then(() => { musicReady = true; }).catch(() => { /* waits for a tap */ });
    } catch (e) { }
  }
  function toggleMusic() {
    musicOn = !musicOn;
    store.set("prashu-music", musicOn ? "1" : "0");
    if (musicOn) { startMusic(); playSfx("chime"); }
    else { try { music.pause(); store.set("prashu-music-pos", String(music.currentTime)); } catch (e) { } }
    updateMusicBtn();
  }
  window.addEventListener("pagehide", () => { try { store.set("prashu-music-pos", String(music.currentTime)); } catch (e) { } });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { try { store.set("prashu-music-pos", String(music.currentTime)); } catch (e) { } } });
  // First user gesture unlocks audio on phones.
  const unlock = () => { if (musicOn) startMusic(); document.removeEventListener("pointerdown", unlock); document.removeEventListener("keydown", unlock); };
  document.addEventListener("pointerdown", unlock);
  document.addEventListener("keydown", unlock);
  startMusic();

  /* ---------------- Floating hearts + click bursts + confetti ---------------- */
  const HEART_COLORS = ["#ff5c96", "#ff8fb8", "#e0457b", "#ffb3cd", "#f472a5"];
  let floatCount = 0;
  function spawnFloatHeart() {
    if (reducedMotion || document.hidden || floatCount >= 12) return;
    floatCount++;
    const s = document.createElement("span");
    s.className = "fl";
    const size = 16 + Math.random() * 30;
    s.style.cssText = "left:" + (Math.random() * 96) + "vw;width:" + size + "px;height:" + size + "px;" +
      "animation-duration:" + (7 + Math.random() * 6) + "s;--o:" + (0.35 + Math.random() * 0.45).toFixed(2) +
      ";--sway:" + (Math.random() * 80 - 40).toFixed(0) + "px;--rot:" + (Math.random() * 60 - 30).toFixed(0) + "deg";
    s.innerHTML = heartSvg(HEART_COLORS[(Math.random() * HEART_COLORS.length) | 0]);
    document.body.appendChild(s);
    setTimeout(() => { s.remove(); floatCount--; }, 13500);
  }
  setInterval(spawnFloatHeart, 900);
  for (let i = 0; i < 4; i++) setTimeout(spawnFloatHeart, 250 * i);

  let burstCount = 0;
  function burst(x, y, n) {
    if (reducedMotion || burstCount > 24) return;
    n = n || 8;
    for (let i = 0; i < n; i++) {
      burstCount++;
      const s = document.createElement("span");
      s.className = "bst";
      const size = 12 + Math.random() * 16;
      const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 110;
      const kind = Math.random();
      s.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + size + "px;height:" + size + "px;" +
        "--dx:" + (Math.cos(a) * r).toFixed(0) + "px;--dy:" + (Math.sin(a) * r - 30).toFixed(0) + "px;--rr:" + (Math.random() * 160 - 80).toFixed(0) + "deg";
      s.innerHTML = kind < 0.62 ? heartSvg(HEART_COLORS[(Math.random() * HEART_COLORS.length) | 0])
        : '<svg viewBox="0 0 24 24" fill="' + (kind < 0.82 ? "#ffc93d" : "#ff8fb8") + '" aria-hidden="true"><path d="' + (kind < 0.82 ? P.star : P.sparkle) + '"/></svg>';
      document.body.appendChild(s);
      setTimeout(() => { s.remove(); burstCount--; }, 900);
    }
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest && e.target.closest(".arena, .fh")) return;
    burst(e.clientX, e.clientY, 6);
  });

  function confetti(n) {
    if (reducedMotion) return;
    n = n || 60;
    const colors = ["#ff5c96", "#ff8fb8", "#e0457b", "#ffc93d", "#7fd4ff", "#9dffb0", "#ffffff"];
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "cf";
      const size = 8 + Math.random() * 10;
      const isHeart = Math.random() < 0.35;
      s.style.cssText = "left:" + (Math.random() * 100) + "vw;width:" + size + "px;height:" + (isHeart ? size : size * 0.6) + "px;" +
        "animation-duration:" + (2.4 + Math.random() * 2) + "s;animation-delay:" + (Math.random() * 0.7) + "s;" +
        "--cx:" + (Math.random() * 160 - 80).toFixed(0) + "px;--cr:" + (Math.random() * 720 - 360).toFixed(0) + "deg;" +
        (isHeart ? "" : "background:" + colors[(Math.random() * colors.length) | 0] + ";border-radius:2px");
      if (isHeart) s.innerHTML = heartSvg(colors[(Math.random() * colors.length) | 0]);
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 5200);
    }
  }

  /* ---------------- Image fallbacks (never show a broken image) ---------------- */
  function wireImgFallbacks(root) {
    $$("img[data-fb]", root).forEach((img) => {
      const swap = () => {
        const altSrc = img.getAttribute("data-fb-src");
        if (altSrc && !img.dataset.fbTried) {
          img.dataset.fbTried = "1";
          img.src = altSrc;
          return;
        }
        const kind = img.getAttribute("data-fb") || "heart";
        const cap = img.getAttribute("data-fb-cap") || "";
        const div = document.createElement("div");
        div.className = "img-ph";
        div.setAttribute("role", "img");
        div.setAttribute("aria-label", img.alt || "A cute decoration");
        div.innerHTML = heartSvg("#ff8fb8") + (cap ? "<p>" + esc(cap) + "</p>" : "");
        if (kind === "bear" || kind === "cat") div.innerHTML = icon("heart") + (cap ? "<p>" + esc(cap) + "</p>" : "");
        img.replaceWith(div);
      };
      img.addEventListener("error", swap, { once: false });
      if (img.complete && img.naturalWidth === 0) swap();
    });
  }

  /* ---------------- Navigation + footer + page transitions ---------------- */
  const PAGES = [
    ["index", "Home", "heart"],
    ["letters", "Letters", "mail"],
    ["reasons", "Reasons", "star"],
    ["surprise", "Surprise", "sparkle"],
    ["play", "Play", "play"]
  ];
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Pages");
  nav.innerHTML = PAGES.map(([f, t, ic]) =>
    '<a href="' + f + '.html"' + (f === page ? ' class="on" aria-current="page"' : "") + ">" + icon(ic) + "<span>" + t + "</span></a>"
  ).join("") +
    '<button type="button" class="navbtn" id="musicBtn" aria-pressed="false">' + icon("note") + '<span class="lbl">Music</span><span class="dot" aria-hidden="true"></span></button>';
  document.body.insertAdjacentElement("afterbegin", nav);
  $("#musicBtn").addEventListener("click", toggleMusic);
  updateMusicBtn();

  const main = document.createElement("main");
  main.id = "app";
  document.body.appendChild(main);
  const footer = document.createElement("footer");
  footer.innerHTML = 'Made with <span class="f-heart">' + heartSvg("#e0457b") + '</span> by ' + esc(ME) + " for " + esc(HER) +
    '<br><span class="credit">Music: Heartwarming — Kevin MacLeod (incompetech.com), licensed under <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">Creative Commons: By Attribution 4.0</a></span>';
  document.body.appendChild(footer);

  document.addEventListener("click", (e) => {
    const a = e.target.closest ? e.target.closest('a[href$=".html"]') : null;
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    playSfx("click");
    const href = a.getAttribute("href");
    if (reducedMotion) { window.location.href = href; return; }
    document.body.classList.add("leaving");
    setTimeout(() => { window.location.href = href; }, 170);
  });
  requestAnimationFrame(() => document.body.classList.add("ready"));

  /* ---------------- Shared bits ---------------- */
  function daysTogether() {
    if (!C.since) return null;
    const d = new Date(C.since + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    const n = Math.floor((Date.now() - d.getTime()) / 864e5);
    return n >= 0 ? n : null;
  }
  function letterHTML(l) {
    return esc(l.body).split(/\n\s*\n/).map((p) => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");
  }
  function hugCount() { return parseInt(store.get("prashu-hugs") || "0", 10) || 0; }

  /* ================= HOME ================= */
  function renderIndex() {
    const days = daysTogether();
    const daysLine = days === null
      ? '<p class="lead">Every day with you is my favorite day, and I made this little place to remind you of that.</p>'
      : '<p class="lead">We have been us for <span class="pill"><b>' + days + "</b> days</span>, and I would choose you in every single one of them.</p>";
    const hugs = hugCount();
    main.innerHTML =
      '<p class="pill">A little website, made only for you</p>' +
      '<h1 class="hero-name">For ' + esc(HER) + "</h1>" +
      daysLine +
      '<div class="hero-frame">' +
      '<img src="img/hero-heart.gif" data-fb="heart" data-fb-cap="A heart, beating just for you" alt="A cute beating heart" width="320" height="320">' +
      '<img class="sticker tl" src="img/sticker-bow.png" alt="" aria-hidden="true" onerror="this.remove()">' +
      '<img class="sticker br" src="img/sticker-heart.png" alt="" aria-hidden="true" onerror="this.remove()">' +
      "</div>" +
      '<div class="btn-row"><button class="btn big" id="hugBtn" type="button">' + icon("heart") + " Send " + esc(HER) + " a hug</button></div>" +
      '<p><span class="pill" id="hugPill">Hugs sent: <b>' + hugs + "</b></span></p>" +
      '<p class="muted" id="hugNote" aria-live="polite"></p>' +
      "<h2>Sweet things for you</h2>" +
      '<div class="showcase">' +
      '<figure class="show-card"><img src="img/cute-cat.gif" data-fb="cat" data-fb-src="img/sticker-cat.png" data-fb-cap="A cute cat, thinking of you" alt="A cute cat with a heart" loading="lazy"><p>Me, waiting to hear from you</p></figure>' +
      '<figure class="show-card"><img src="img/love-bear.gif" data-fb="bear" data-fb-src="img/sticker-bear.png" data-fb-cap="A little bear, sending love" alt="A cute bear holding a heart" loading="lazy"><p>Sending you all my love</p></figure>' +
      "</div>" +
      "<h2>Our little gallery</h2>" +
      '<div id="gallery"></div>' +
      '<div class="btn-row">' +
      '<a class="btn" href="letters.html">' + icon("mail") + " Read your letters</a>" +
      '<a class="btn" href="reasons.html">' + icon("star") + " See the reasons</a>" +
      '<a class="btn" href="play.html">' + icon("play") + " Play the heart game</a>" +
      "</div>";

    const MILESTONES = { 1: "First hug delivered. Many more where that came from.", 10: "Ten hugs! You are officially the most hugged person on the internet.", 25: "Twenty-five hugs and counting. I am not stopping.", 50: "Fifty hugs! This is what happiness looks like.", 100: "One hundred hugs. You are so loved, Prashu." };
    $("#hugBtn").addEventListener("click", (e) => {
      const n = hugCount() + 1;
      store.set("prashu-hugs", String(n));
      $("#hugPill").innerHTML = "Hugs sent: <b>" + n + "</b>";
      const r = e.currentTarget.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 16);
      if (MILESTONES[n]) {
        $("#hugNote").textContent = MILESTONES[n];
        playSfx("yay");
        confetti(40);
      } else {
        $("#hugNote").textContent = ["Warmest hug, delivered instantly.", "Another one, because you deserve it.", "Squeeze! Sending all my love.", "A hug with extra sparkle, just for you."][n % 4];
        playSfx("pop");
      }
    });

    // Gallery: real photos from config, or clearly-marked placeholders.
    const g = $("#gallery");
    const photos = Array.isArray(C.photos) ? C.photos : [];
    if (!photos.length) {
      g.innerHTML =
        '<div class="gallery">' +
        ["Your favorite photo together", "A silly selfie", "A perfect little moment"].map((t) =>
          '<div class="photo-empty">' + icon("camera") + "<b>" + t + "</b><span>Your photo goes here</span></div>").join("") +
        "</div>" +
        '<div class="hint-box"><b>How to add your photos:</b> put the photo files in the <code>img/</code> folder, then list them in <code>js/config.js</code> under <code>photos</code> — for example <code>photos: ["img/us1.jpg", "img/us2.jpg"]</code>. These placeholder frames disappear on their own once photos are added.</div>';
    } else {
      g.innerHTML = '<div class="gallery">' + photos.map((p) => {
        const src = typeof p === "string" ? p : p.src;
        const cap = typeof p === "string" ? "" : (p.caption || "");
        return '<figure class="photo"><img src="' + esc(src) + '" alt="' + esc(cap || "A photo of you two") + '" loading="lazy" data-fb="photo" data-fb-cap="Photo coming soon">' + (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";
      }).join("") + "</div>";
    }
    wireImgFallbacks(main);
  }

  /* ================= LETTERS ================= */
  function renderLetters() {
    const letters = Array.isArray(C.letters) ? C.letters : [];
    main.innerHTML =
      "<h1>Letters for you</h1>" +
      '<p class="sub">Tap an envelope to open it. Each one was written with you in mind.</p>' +
      '<div id="envList">' + letters.map((l, i) =>
        '<section class="env" data-i="' + i + '">' +
        '<button class="env-btn" type="button" aria-expanded="false">' +
        '<span class="seal">' + icon("heart") + "</span>" +
        '<span class="t"><b>' + esc(l.title) + "</b><span>Tap to open your letter</span></span>" +
        '<span class="chev">' + icon("chevron") + "</span>" +
        "</button>" +
        '<div class="env-flap" aria-hidden="true"></div>' +
        '<div class="letter-wrap"><div class="letter-clip"><article class="letter" hidden>' +
        '<div class="letter-body">' + letterHTML(l) + "</div>" +
        '<p class="sig"><small>With all my love</small>' + esc(ME) + "</p>" +
        '<div class="type-row"><button class="btn" type="button" data-type>Read it typed out</button></div>' +
        "</article></div></div>" +
        "</section>").join("") +
      "</div>" +
      '<div class="btn-row"><a class="btn" href="reasons.html">' + icon("star") + " Now, the reasons</a></div>";

    const typing = new Map();
    $$(".env", main).forEach((env) => {
      const btn = $(".env-btn", env);
      const article = $(".letter", env);
      const bodyEl = $(".letter-body", env);
      const typeBtn = $("[data-type]", env);
      const letter = letters[+env.dataset.i];
      const fullHTML = letterHTML(letter);
      const plainText = letter.body;
      btn.addEventListener("click", () => {
        const opening = !env.classList.contains("open");
        env.classList.toggle("open", opening);
        btn.setAttribute("aria-expanded", opening ? "true" : "false");
        if (opening) {
          article.hidden = false;
          playSfx("chime");
          const r = btn.getBoundingClientRect();
          burst(r.left + r.width / 2, r.top + 20, 8);
        } else {
          stopTyping();
          setTimeout(() => { if (!env.classList.contains("open")) article.hidden = true; }, 480);
        }
      });
      function stopTyping() {
        const id = typing.get(env);
        if (id) { clearInterval(id); typing.delete(env); }
        bodyEl.innerHTML = fullHTML;
        typeBtn.textContent = "Read it typed out";
      }
      typeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (typing.has(env)) { stopTyping(); return; }
        playSfx("click");
        if (reducedMotion) { bodyEl.innerHTML = fullHTML; return; }
        bodyEl.innerHTML = "";
        bodyEl.style.whiteSpace = "pre-wrap";
        const caret = document.createElement("span");
        caret.className = "typing-caret";
        typeBtn.textContent = "Show it all at once";
        let i = 0;
        const id = setInterval(() => {
          i += 2;
          bodyEl.textContent = plainText.slice(0, i);
          bodyEl.appendChild(caret);
          if (i >= plainText.length) {
            clearInterval(id);
            typing.delete(env);
            bodyEl.style.whiteSpace = "";
            bodyEl.innerHTML = fullHTML;
            typeBtn.textContent = "Read it typed out";
            playSfx("sparkle");
          }
        }, 24);
        typing.set(env, id);
      });
    });
  }

  /* ================= REASONS ================= */
  function renderReasons() {
    const reasons = Array.isArray(C.reasons) ? C.reasons.slice() : [];
    main.innerHTML =
      "<h1>Reasons I love you</h1>" +
      '<p class="sub">Tap a card to flip it over and read a reason. Try to find them all.</p>' +
      '<div class="progress"><div class="bar"><div class="fill" id="progFill"></div></div><p id="progText"></p></div>' +
      '<div class="btn-row"><button class="btn" id="shuffleBtn" type="button">' + icon("shuffle") + " Shuffle the cards</button>" +
      '<button class="btn" id="flipAllBtn" type="button">' + icon("star") + " Flip them all</button></div>" +
      '<div class="grid" id="cardGrid"></div>' +
      '<p class="muted" id="doneNote" aria-live="polite"></p>';

    let found = new Set();
    try { found = new Set(JSON.parse(store.get("prashu-found") || "[]")); } catch (e) { found = new Set(); }
    let order = reasons.map((_, i) => i);
    function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
    function saveFound() { store.set("prashu-found", JSON.stringify(Array.from(found))); }
    function updateProgress() {
      const n = found.size, total = reasons.length;
      $("#progFill").style.width = (total ? (n / total) * 100 : 0) + "%";
      $("#progText").textContent = n + " of " + total + " reasons found";
      $("#doneNote").textContent = n === total && total > 0
        ? "You found them all. And honestly, there are a hundred more where those came from."
        : "";
    }
    function renderGrid() {
      const grid = $("#cardGrid");
      grid.innerHTML = order.map((ri, pos) => {
        const r = reasons[ri];
        const isFound = found.has(r);
        return '<button class="flip' + (isFound ? " flipped" : "") + '" type="button" data-r="' + esc(r) + '" aria-label="Reason ' + (pos + 1) + (isFound ? ", found" : "") + '">' +
          '<span class="flip-inner"><span class="flip-face flip-front">' + icon("heart") + '<span class="num">Reason ' + (pos + 1) + "</span><span>Tap to reveal</span></span>" +
          '<span class="flip-face flip-back">' + icon("heart") + "<span>" + esc(r) + "</span></span></span></button>";
      }).join("");
      $$(".flip", grid).forEach((card) => {
        card.addEventListener("click", (e) => {
          const r = card.dataset.r;
          const flipping = !card.classList.contains("flipped");
          card.classList.toggle("flipped", flipping);
          if (flipping && !found.has(r)) {
            found.add(r);
            saveFound();
            updateProgress();
            playSfx("sparkle");
            const rc = card.getBoundingClientRect();
            burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 8);
          } else {
            playSfx("click");
          }
        });
      });
    }
    $("#shuffleBtn").addEventListener("click", () => {
      shuffle(order);
      renderGrid();
      playSfx("click");
    });
    $("#flipAllBtn").addEventListener("click", (e) => {
      reasons.forEach((r) => found.add(r));
      saveFound();
      renderGrid();
      updateProgress();
      playSfx("yay");
      const r = e.currentTarget.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top, 14);
    });
    renderGrid();
    updateProgress();
  }

  /* ================= SURPRISE ================= */
  function renderSurprise() {
    main.innerHTML =
      "<h1>One more thing…</h1>" +
      '<div class="stage" id="stage">' +
      '<p class="lead" id="qText">' + esc(HER) + ", will you be mine, today and always?</p>" +
      '<div class="btn-row" style="margin:0"><button class="btn big" id="yesBtn" type="button">' + icon("heart") + " Yes, always</button></div>" +
      '<p class="muted">The other button seems shy. Try to catch it if you can.</p>' +
      "</div>" +
      '<button class="btn" id="noBtn" type="button">No</button>' +
      '<div id="celebrate" class="celebrate" hidden>' +
      '<img src="img/hug-bears.gif" data-fb="bear" data-fb-src="img/sticker-bear.png" data-fb-cap="Two bears, hugging tight" alt="Two cute bears hugging" width="300">' +
      '<img class="bouquet" src="img/sticker-flowers.png" alt="A bouquet of red flowers" width="130" onerror="this.remove()">' +
      "<h2>I knew it!</h2>" +
      '<p class="lead">Best answer ever. I love you, ' + esc(HER) + ". You just made my whole world brighter.</p>" +
      '<div class="btn-row"><a class="btn big" href="index.html">' + icon("heart") + " Back to the hugs</a></div>" +
      "</div>";
    wireImgFallbacks(main);

    const noBtn = $("#noBtn");
    const yesBtn = $("#yesBtn");
    let scale = 1, dodges = 0, answered = false;
    // Park the No button near the question to start.
    function parkNo() {
      const q = $("#qText").getBoundingClientRect();
      noBtn.style.left = Math.max(12, q.left + q.width / 2 - 40) + "px";
      noBtn.style.top = Math.min(window.innerHeight - 120, q.bottom + 90) + "px";
    }
    parkNo();
    function dodge() {
      if (answered) return;
      dodges++;
      playSfx("nope");
      const w = noBtn.offsetWidth || 90, h = noBtn.offsetHeight || 48;
      const maxX = Math.max(12, window.innerWidth - w - 12);
      const maxY = Math.max(12, window.innerHeight - h - 12);
      noBtn.style.left = (12 + Math.random() * (maxX - 12)) + "px";
      noBtn.style.top = (12 + Math.random() * (maxY - 12)) + "px";
      scale = Math.min(2.3, scale + 0.14);
      yesBtn.style.transform = "scale(" + scale.toFixed(2) + ")";
      if (dodges === 4) $("#qText").textContent = "The No button is not very good at this. The Yes button is right there.";
      if (dodges === 9) $("#qText").textContent = "Okay, the No button has officially given up. Yes is waiting for you.";
    }
    noBtn.addEventListener("pointerenter", dodge);
    noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });
    noBtn.addEventListener("click", (e) => { e.preventDefault(); dodge(); });
    noBtn.addEventListener("focus", dodge);
    window.addEventListener("resize", () => { if (!answered) parkNo(); });

    yesBtn.addEventListener("click", () => {
      answered = true;
      playSfx("yay");
      confetti(90);
      const r = yesBtn.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 20);
      $("#stage").hidden = true;
      noBtn.hidden = true;
      const cel = $("#celebrate");
      cel.hidden = false;
      wireImgFallbacks(cel);
      document.querySelector("h1").textContent = "She said yes!";
    });
  }

  /* ================= PLAY: HEART-CATCH GAME ================= */
  function renderPlay() {
    const total = C.gameSeconds || 30;
    main.innerHTML =
      "<h1>Catch the Hearts</h1>" +
      '<p class="sub">Tap or click the falling hearts before they disappear. How many can you catch in ' + total + " seconds?</p>" +
      '<div class="hud">' +
      '<span class="pill">Score: <b id="gScore">0</b></span>' +
      '<span class="pill">Time: <b id="gTime">' + total + "</b>s</span>" +
      '<span class="pill">Best: <b id="gBest">' + (parseInt(store.get("prashu-best") || "0", 10) || 0) + "</b></span>" +
      "</div>" +
      '<div class="arena" id="arena">' +
      '<div class="arena-overlay" id="gOverlay">' +
      "<h2>Ready?</h2>" +
      "<p>Hearts will rain down. Catch as many as you can — every heart is a little bit of love.</p>" +
      '<button class="btn big" id="gStart" type="button">' + icon("play") + " Start the game</button>" +
      "</div>" +
      "</div>" +
      '<div class="btn-row"><button class="btn" id="gAgain" type="button" hidden>' + icon("refresh") + " Play again</button></div>";

    const arena = $("#arena"), overlay = $("#gOverlay");
    const scoreEl = $("#gScore"), timeEl = $("#gTime"), bestEl = $("#gBest");
    let running = false, paused = false, score = 0, hearts = [], raf = 0, lastT = 0, spawnIn = 0, endAt = 0, remainMs = total * 1000, newBest = false;

    function best() { return parseInt(store.get("prashu-best") || "0", 10) || 0; }
    function clearHearts() { hearts.forEach((h) => h.el.remove()); hearts = []; }
    function spawnHeart(now) {
      const w = arena.clientWidth;
      const size = 48 + Math.random() * 18;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "fh";
      el.setAttribute("aria-label", "Catch this heart");
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.innerHTML = heartSvg(HEART_COLORS[(Math.random() * HEART_COLORS.length) | 0]);
      const elapsed = total * 1000 - remainMs;
      const speed = 95 + Math.random() * 55 + (elapsed / (total * 1000)) * 70; // px per second, ramps up
      const h = { el, x: 8 + Math.random() * Math.max(8, w - size - 16), y: -size - 8, vy: speed, sway: 14 + Math.random() * 22, ph: Math.random() * 6.28, size, dead: false };
      el.addEventListener("click", (e) => {
        if (h.dead || !running || paused) return;
        h.dead = true;
        score++;
        scoreEl.textContent = score;
        playSfx("pop");
        const r = el.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, 7);
        el.classList.add("caught");
        setTimeout(() => el.remove(), 240);
      });
      arena.appendChild(el);
      hearts.push(h);
    }
    function frame(now) {
      if (!running || paused) return;
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      remainMs = Math.max(0, endAt - now);
      timeEl.textContent = Math.ceil(remainMs / 1000);
      spawnIn -= dt * 1000;
      if (spawnIn <= 0 && remainMs > 600) {
        spawnHeart(now);
        const elapsed = total * 1000 - remainMs;
        spawnIn = 720 - (elapsed / (total * 1000)) * 340; // faster spawns near the end
      }
      const H = arena.clientHeight;
      const t = now / 1000;
      hearts = hearts.filter((h) => {
        if (h.dead) return false;
        h.y += h.vy * dt;
        const x = h.x + Math.sin(t * 2 + h.ph) * h.sway;
        h.el.style.transform = "translate3d(" + x.toFixed(1) + "px," + h.y.toFixed(1) + "px,0) rotate(" + (Math.sin(t * 2 + h.ph) * 14).toFixed(1) + "deg)";
        if (h.y > H + 70) { h.el.remove(); return false; }
        return true;
      });
      if (remainMs <= 0) { endGame(); return; }
      raf = requestAnimationFrame(frame);
    }
    function startGame() {
      clearHearts();
      score = 0;
      newBest = false;
      scoreEl.textContent = "0";
      timeEl.textContent = String(total);
      $("#gAgain").hidden = true;
      overlay.hidden = true;
      running = true;
      paused = false;
      remainMs = total * 1000;
      endAt = performance.now() + remainMs;
      lastT = performance.now();
      spawnIn = 0;
      playSfx("chime");
      raf = requestAnimationFrame(frame);
    }
    function endGame() {
      running = false;
      cancelAnimationFrame(raf);
      clearHearts();
      const b = best();
      if (score > b) { store.set("prashu-best", String(score)); bestEl.textContent = score; newBest = true; }
      overlay.innerHTML =
        "<h2>Time's up!</h2>" +
        '<p class="big-score">' + score + " hearts caught</p>" +
        "<p>" + (newBest ? "A brand new best score! You are amazing at this." : (score >= 20 ? "Wonderful catching! So much love in one game." : "Every heart you caught is a little bit of love. Try again?")) + "</p>" +
        '<button class="btn big" id="gRestart" type="button">' + icon("refresh") + " Play again</button>";
      overlay.hidden = false;
      $("#gAgain").hidden = true;
      playSfx(newBest ? "yay" : "sparkle");
      if (newBest) confetti(50);
      $("#gRestart").addEventListener("click", startGame);
    }
    function pauseGame() {
      if (!running || paused) return;
      paused = true;
      cancelAnimationFrame(raf);
      remainMs = Math.max(0, endAt - performance.now());
      overlay.innerHTML = "<h2>Paused</h2><p>Take a breath. Your hearts are waiting.</p>" +
        '<button class="btn big" id="gResume" type="button">' + icon("play") + " Keep playing</button>";
      overlay.hidden = false;
      $("#gResume").addEventListener("click", () => {
        overlay.hidden = true;
        paused = false;
        endAt = performance.now() + remainMs;
        lastT = performance.now();
        raf = requestAnimationFrame(frame);
      });
    }
    document.addEventListener("visibilitychange", () => { if (document.hidden) pauseGame(); });
    $("#gStart").addEventListener("click", startGame);
    $("#gAgain").addEventListener("click", startGame);
  }

  /* ---------------- Render the current page ---------------- */
  const RENDER = { index: renderIndex, letters: renderLetters, reasons: renderReasons, surprise: renderSurprise, play: renderPlay };
  (RENDER[page] || renderIndex)();
})();
