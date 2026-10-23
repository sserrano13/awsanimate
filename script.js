// ===== Fondo de partículas animadas =====
(function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles;
  const mouse = { x: null, y: null, r: 120 };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.6,
    }));
  }

  function accent() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--accent").trim() || "#7c5cff";
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const color = accent();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Repulsión suave con el ratón
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.r) {
          const force = (mouse.r - dist) / mouse.r;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6;
      ctx.fill();

      // Líneas entre partículas cercanas
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - d / 120) * 0.15;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });

  resize();
  if (!reduceMotion) draw();
})();

// ===== Reveal al hacer scroll =====
(function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

// ===== Barra de progreso + nav al hacer scroll =====
(function initScroll() {
  const bar = document.getElementById("scrollProgress");
  const nav = document.getElementById("nav");
  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
    if (nav) nav.classList.toggle("nav--scrolled", scrollTop > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ===== Contador animado de stats =====
(function initCounters() {
  const nums = document.querySelectorAll(".stat__num");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
})();

// ===== Toggle de tema =====
(function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light") { root.setAttribute("data-theme", "light"); if (toggle) toggle.textContent = "☀️"; }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        toggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        toggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
      }
    });
  }
})();
