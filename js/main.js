/* ============================================================
   Anniversary — main.js
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const C = CONFIG;
  const STORE_KEY = "anniv_photos_v1";

  /* ---------------------------------------------------------
     1. Isi konten dari CONFIG
     --------------------------------------------------------- */
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };

  setText("#heroEyebrow", C.hero.eyebrow);
  setText("#heroNameA", C.names.a);
  setText("#heroNameB", C.names.b);
  setText("#heroDate", C.anniversary.label);
  setText("#heroTag", C.hero.tagline);
  setText("#letterHi", C.letter.hi);
  setText("#letterText", C.letter.body);
  setText("#letterSign", C.letter.sign);
  setText("#envelopeHint", C.letter.hint);
  setText("#finalText", C.final.text);
  setText("#finalSign", C.final.sign);
  setText("#footerBy", C.names.from);
  setText("#footerTo", C.names.to);
  setText("#confettiBtn", C.final.button);

  /* ---------------------------------------------------------
     2. Intro overlay
     --------------------------------------------------------- */
  const intro = $("#intro");
  let entered = false;

  function enterSite() {
    if (entered) return;
    entered = true;
    intro.classList.add("is-hidden");
    setTimeout(() => { intro.style.display = "none"; }, 900);
    $("#player").classList.add("is-visible");
    if (C.effects.confetti) burstConfetti(140);
    startMusic();
  }
  $("#introBtn").addEventListener("click", enterSite);
  document.addEventListener("keydown", (e) => {
    if (!entered && (e.key === "Enter" || e.key === " ")) enterSite();
  });

  /* ---------------------------------------------------------
     3. Countdown
     --------------------------------------------------------- */
  const target = new Date(C.anniversary.date.replace(/-/g, "/").replace("T", " "));
  const boxes = {};
  $$("#counter [data-unit]").forEach((b) => { boxes[b.dataset.unit] = b; });

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now = new Date();
    let next = target;

    if (next <= now) {
      // sudah lewat: hitung mundur ke anniversary tahun depan
      next = new Date(target.getTime());
      while (next <= now) next.setFullYear(next.getFullYear() + 1);
      setText("#counterSince", "Sudah lewat! Berikutnya: " +
        next.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }));
    } else {
      setText("#counterSince", "Sejak " + sinceLabel + " — dan terus berjalan.");
    }

    const diff = next - now;
    boxes.days.textContent = pad(Math.floor(diff / 86400000));
    boxes.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
    boxes.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
    boxes.seconds.textContent = pad(Math.floor(diff / 1000) % 60);
  }
  const sinceLabel = target.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  tick();
  setInterval(tick, 1000);

  /* ---------------------------------------------------------
     4. Amplop surat
     --------------------------------------------------------- */
  const envelope = $("#envelope");
  let opened = false;
  function openEnvelope() {
    if (opened) return;
    opened = true;
    envelope.classList.add("is-open");
    $("#envelopeHint").classList.add("is-hidden");
    burstConfetti(60);
  }
  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
  });

  /* ---------------------------------------------------------
     5. Galeri foto
     --------------------------------------------------------- */
  let userPhotos = [];
  try { userPhotos = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); }
  catch (e) { userPhotos = []; }

  function saveUserPhotos() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(userPhotos));
      return true;
    } catch (e) {
      alert("Penyimpanan browser penuh. Hapus beberapa foto terlebih dahulu.");
      return false;
    }
  }

  let filter = "all";
  let current = [];

  function allPhotos() {
    return C.photos.concat(userPhotos);
  }

  function renderGallery() {
    const grid = $("#galleryGrid");
    grid.innerHTML = "";
    current = allPhotos().filter((p) => filter === "all" || (p.type || "foto") === filter);

    current.forEach((p, i) => {
      const item = document.createElement("div");
      item.className = "gallery__item";
      item.dataset.index = String(i);

      if ((p.type || "foto") === "video") {
        const v = document.createElement("video");
        v.src = p.src;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        item.appendChild(v);
      } else {
        const img = document.createElement("img");
        img.src = p.src;
        img.alt = p.cap || "Foto";
        img.loading = "lazy";
        item.appendChild(img);
      }

      const cap = document.createElement("span");
      cap.className = "gallery__cap";
      cap.textContent = p.cap || "";
      item.appendChild(cap);

      if (p.user) {
        const del = document.createElement("button");
        del.className = "gallery__del";
        del.textContent = "✕";
        del.title = "Hapus foto ini";
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          userPhotos = userPhotos.filter((x) => x.id !== p.id);
          saveUserPhotos();
          renderGallery();
        });
        item.appendChild(del);
      }

      item.addEventListener("click", () => openLightbox(i));
      grid.appendChild(item);
    });

    $("#galleryEmpty").style.display = current.length ? "none" : "block";
  }

  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      filter = chip.dataset.filter;
      renderGallery();
    });
  });

  /* --- Lightbox --- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbVideo = $("#lbVideo");
  let lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i;
    showLightbox();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
  }
  function showLightbox() {
    const p = current[lbIndex];
    if (!p) return;
    if ((p.type || "foto") === "video") {
      lbImg.style.display = "none";
      lbVideo.style.display = "block";
      lbVideo.src = p.src;
    } else {
      lbVideo.style.display = "none";
      lbVideo.removeAttribute("src");
      lbImg.style.display = "block";
      lbImg.src = p.src;
    }
    $("#lbCap").textContent = p.cap || "";
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    lbVideo.pause();
    lbVideo.removeAttribute("src");
  }
  $("#lbClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  $("#lbPrev").addEventListener("click", () => { lbIndex = (lbIndex - 1 + current.length) % current.length; showLightbox(); });
  $("#lbNext").addEventListener("click", () => { lbIndex = (lbIndex + 1) % current.length; showLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") $("#lbPrev").click();
    if (e.key === "ArrowRight") $("#lbNext").click();
  });

  /* --- Upload foto --- */
  function readImages(files) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        shrink(ev.target.result, file.name.replace(/\.[^.]+$/, ""), (small) => {
          userPhotos.push({ id: Date.now() + Math.random(), src: small, cap: file.name.replace(/\.[^.]+$/, ""), type: "foto", user: true });
          if (saveUserPhotos()) renderGallery();
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // perkecil gambar supaya muat di localStorage
  function shrink(dataUrl, name, cb) {
    const img = new Image();
    img.onload = () => {
      const max = 1400;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      try { cb(c.toDataURL("image/jpeg", 0.82)); }
      catch (e) { cb(dataUrl); }
    };
    img.onerror = () => cb(dataUrl);
    img.src = dataUrl;
  }

  $("#uploadInput").addEventListener("change", (e) => {
    readImages(e.target.files);
    e.target.value = "";
  });

  const dz = $("#dropzone");
  ["dragenter", "dragover"].forEach((ev) =>
    dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("is-over"); })
  );
  ["dragleave", "drop"].forEach((ev) =>
    dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("is-over"); })
  );
  dz.addEventListener("drop", (e) => {
    if (e.dataTransfer && e.dataTransfer.files.length) readImages(e.dataTransfer.files);
  });
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => e.preventDefault());

  renderGallery();

  /* ---------------------------------------------------------
     6. Timeline & alasan
     --------------------------------------------------------- */
  const tlWrap = $("#timeline");
  C.timeline.forEach((t) => {
    const item = document.createElement("div");
    item.className = "tl-item reveal";
    item.innerHTML =
      '<span class="tl-item__dot">' + t.icon + "</span>" +
      '<div class="tl-item__card">' +
        '<div class="tl-item__date">' + t.date + "</div>" +
        '<h3 class="tl-item__title">' + t.title + "</h3>" +
        '<p class="tl-item__text">' + t.text + "</p>" +
      "</div>";
    tlWrap.appendChild(item);
  });

  const rWrap = $("#reasonsGrid");
  C.reasons.forEach((r) => {
    const card = document.createElement("div");
    card.className = "reason reveal";
    card.innerHTML =
      '<span class="reason__icon">' + r.icon + "</span>" +
      '<h3 class="reason__title">' + r.title + "</h3>" +
      '<p class="reason__text">' + r.text + "</p>";
    rWrap.appendChild(card);
  });

  /* ---------------------------------------------------------
     7. Scroll reveal + nav
     --------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });

  function observeAll() { $$(".reveal").forEach((el) => io.observe(el)); }
  observeAll();

  window.addEventListener("scroll", () => {
    $("#nav").classList.toggle("is-stuck", window.scrollY > 40);
  }, { passive: true });

  /* ---------------------------------------------------------
     8. Musik
     --------------------------------------------------------- */
  const audio = $("#audio");
  const playlist = C.music.filter((m) => m.src);
  let idx = 0;

  function loadTrack(i) {
    if (!playlist.length) return;
    idx = (i + playlist.length) % playlist.length;
    const t = playlist[idx];
    audio.src = t.src;
    $("#trackTitle").textContent = t.title || "Lagu";
    $("#trackSub").textContent = (idx + 1) + " / " + playlist.length;
  }
  function startMusic() {
    if (!playlist.length) return;
    if (!audio.src) loadTrack(0);
    audio.play().catch(() => { /* autoplay diblokir browser, tidak apa-apa */ });
  }
  $("#playBtn").addEventListener("click", () => {
    if (!audio.src) loadTrack(0);
    if (audio.paused) audio.play(); else audio.pause();
  });
  $("#nextBtn").addEventListener("click", () => { loadTrack(idx + 1); if (!audio.paused) audio.play(); });
  audio.addEventListener("play", () => $("#player").classList.add("is-playing"));
  audio.addEventListener("pause", () => $("#player").classList.remove("is-playing"));
  audio.addEventListener("timeupdate", () => {
    const seek = $("#seek");
    if (audio.duration) seek.style.setProperty("--p", (audio.currentTime / audio.duration) * 100 + "%");
  });
  audio.addEventListener("ended", () => { loadTrack(idx + 1); audio.play(); });
  $("#seek").addEventListener("input", (e) => {
    if (audio.duration) audio.currentTime = (e.target.value / 100) * audio.duration;
  });

  /* ---------------------------------------------------------
     9. Hujan kelopak (canvas)
     --------------------------------------------------------- */
  const cv = $("#petals");
  const ctx = cv.getContext("2d");
  let petals = [];

  function resizeCanvas() {
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function initPetals() {
    const count = window.innerWidth < 700 ? 22 : 45;
    petals = Array.from({ length: count }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: 5 + Math.random() * 7,
      s: 0.3 + Math.random() * 0.7,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      o: 0.18 + Math.random() * 0.35,
      heart: Math.random() > 0.45
    }));
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.o;
    ctx.fillStyle = p.heart ? "#ff6f91" : "#ffc2d1";
    ctx.beginPath();
    if (p.heart) {
      const s = p.r / 8;
      ctx.moveTo(0, 3 * s);
      ctx.bezierCurveTo(-6 * s, -2 * s, -3 * s, -7 * s, 0, -3.5 * s);
      ctx.bezierCurveTo(3 * s, -7 * s, 6 * s, -2 * s, 0, 3 * s);
    } else {
      ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }

  let raf = null;
  function loop() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    petals.forEach((p) => {
      p.y += p.s;
      p.x += Math.sin(p.y / 40) * 0.5;
      p.rot += p.vr;
      if (p.y > cv.height + 20) { p.y = -20; p.x = Math.random() * cv.width; }
      drawPetal(p);
    });
    raf = requestAnimationFrame(loop);
  }
  if (C.effects.petals) { initPetals(); loop(); } else { cv.style.display = "none"; }

  /* ---------------------------------------------------------
     10. Konfeti
     --------------------------------------------------------- */
  function burstConfetti(count) {
    if (!C.effects.confetti) return;
    const colors = ["#ff6f91", "#ffc2d1", "#f7c873", "#ffffff", "#ff9ec4"];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("i");
      const size = 6 + Math.random() * 8;
      p.style.cssText =
        "position:fixed;z-index:500;pointer-events:none;width:" + size + "px;height:" + (size * 1.6) + "px;" +
        "left:" + Math.random() * 100 + "vw;top:-8vh;background:" + colors[Math.floor(Math.random() * colors.length)] +
        ";border-radius:2px;animation:confettiFall " + (2.4 + Math.random() * 2.2) + "s linear " + (Math.random() * 0.8) + "s forwards";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 6000);
    }
  }
  $("#confettiBtn").addEventListener("click", () => {
    burstConfetti(90);
    if (C.effects.clickHearts) heartBurst(window.innerWidth / 2, window.innerHeight / 2, 6);
  });

  /* ---------------------------------------------------------
     11. Hati saat klik
     --------------------------------------------------------- */
  function heartBurst(x, y, n) {
    const glyphs = ["💗", "💖", "💕", "❤", "💘"];
    for (let i = 0; i < n; i++) {
      const h = document.createElement("span");
      h.className = "click-heart";
      h.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      h.style.left = (x + (Math.random() - 0.5) * 80) + "px";
      h.style.top = (y + (Math.random() - 0.5) * 50) + "px";
      h.style.fontSize = (18 + Math.random() * 20) + "px";
      h.style.animationDuration = (0.8 + Math.random() * 0.6) + "s";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1600);
    }
  }
  if (C.effects.clickHearts) {
    document.addEventListener("click", (e) => {
      if (e.target.closest("button, a, .gallery__item, .envelope")) return;
      heartBurst(e.clientX, e.clientY, 3);
    });
  }

  /* ---------------------------------------------------------
     12. Intro: hati dekoratif
     --------------------------------------------------------- */
  const introHearts = $(".intro__hearts");
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.textContent = ["♥", "❤", "💕"][Math.floor(Math.random() * 3)];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = (12 + Math.random() * 22) + "px";
    s.style.animationDuration = (9 + Math.random() * 10) + "s";
    s.style.animationDelay = (Math.random() * 10) + "s";
    introHearts.appendChild(s);
  }

})();
