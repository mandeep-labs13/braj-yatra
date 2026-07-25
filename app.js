/* ============================================================
   BRAJ DARSHAN YATRA — APP
   ============================================================ */
(function () {
  const CFG = window.BRAJ_CONFIG;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Populate config-driven content ---------- */
  document.title = CFG.tour.name + " — " + CFG.tour.tagline;
  document.getElementById("heroTagline").textContent = CFG.tour.tagline;
  document.getElementById("heroDates").textContent =
    CFG.tour.startDateDisplay.split(",")[1].trim() + " · Departing " + CFG.tour.departureCity;
  document.getElementById("footerOrganiser").textContent = CFG.tour.organiser;
  document.getElementById("footerContact").textContent = CFG.tour.contactDisplay;

  const waLink = "https://wa.me/" + CFG.tour.contactWhatsApp +
    "?text=" + encodeURIComponent("Hi! I'd like to know more about the " + CFG.tour.name + ".");
  document.getElementById("navCta").href = waLink;
  document.getElementById("finalCta").href = waLink;

  // Inclusions / exclusions
  const incList = document.getElementById("inclusionsList");
  CFG.inclusions.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    incList.appendChild(li);
  });
  const excList = document.getElementById("exclusionsList");
  CFG.notIncluded.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    excList.appendChild(li);
  });

  // Timeline / itinerary days
  const timeline = document.getElementById("timeline");
  CFG.days.forEach(d => {
    const card = document.createElement("div");
    card.className = "day-card reveal-up";
    card.innerHTML = `
      <div class="day-num" style="border-color:${d.accent}; color:${d.accent}">${String(d.num).padStart(2,'0')}</div>
      <h3>${d.title}</h3>
      <p class="day-sub">Day ${d.num} · ${d.subtitle}</p>
      <p class="day-line">${d.line}</p>
      <div class="day-stops">${d.stops.map(s => `<span class="day-stop">${s}</span>`).join("")}</div>
    `;
    timeline.appendChild(card);
  });

  /* ---------- Countdown ---------- */
  const target = new Date(CFG.tour.startDateISO).getTime();
  function tickCountdown() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("cd-days").textContent = String(d).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(h).padStart(2, "0");
    document.getElementById("cd-mins").textContent = String(m).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(s).padStart(2, "0");
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById("siteNav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal-up");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Frame-sequence scroll cinema (hero gate) ---------- */
  const FRAME_COUNT_HI = 120;
  const FRAME_COUNT_LO = 80;
  const isSmall = window.innerWidth < 760;
  const frameDir = isSmall ? "assets/frames/lo" : "assets/frames/hi";
  const frameCount = isSmall ? FRAME_COUNT_LO : FRAME_COUNT_HI;

  const canvas = document.getElementById("gateCanvas");
  const ctx = canvas.getContext("2d");
  const images = new Array(frameCount);
  let loadedCount = 0;

  function frameSrc(i) {
    return `${frameDir}/f_${String(i + 1).padStart(3, "0")}.webp`;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrame);
  }

  let currentFrame = 0;
  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const cw = canvas.width, ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw, dh, dx, dy;
    if (cr > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    else { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2; }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  const preloaderFill = document.getElementById("preloaderFill");
  const preloader = document.getElementById("preloader");

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = frameSrc(i);
    img.onload = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / frameCount) * 100);
      preloaderFill.style.width = pct + "%";
      if (i === 0) drawFrame(0);
      if (loadedCount === frameCount) onFramesReady();
    };
    img.onerror = () => { loadedCount++; };
    images[i] = img;
  }

  function onFramesReady() {
    preloader.classList.add("done");
    resizeCanvas();
    initHeroAnimation();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Safety: hide preloader even if some frames fail, after 6s max
  setTimeout(() => { preloader.classList.add("done"); }, 6000);

  function initHeroAnimation() {
    const frameProxy = { frame: 0 };
    gsap.to(frameProxy, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
      onUpdate: () => {
        currentFrame = Math.round(frameProxy.frame);
        drawFrame(currentFrame);
      },
    });

    gsap.to(".hero-title, .hero-tagline", {
      opacity: 1, y: 0, duration: 1.1, ease: "power2.out", stagger: 0.15, delay: 0.2,
    });

    gsap.to(".hero-scroll-hint", {
      opacity: 0,
      scrollTrigger: { trigger: "#hero", start: "top top", end: "+=200", scrub: true },
    });

    gsap.to(".hero-copy", {
      opacity: 0,
      scrollTrigger: { trigger: "#hero", start: "20% top", end: "55% top", scrub: true },
    });
  }
})();
