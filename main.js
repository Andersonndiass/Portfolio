// ── Mobile nav ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ── Skill tabs ───────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('panel-' + btn.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// ── Project accordion ────────────────────────────────
function toggleProject(header) {
  const item = header.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.project-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Project filters ──────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-item').forEach(item => {
      if (filter === 'all') {
        item.classList.remove('hidden');
      } else {
        const tags = item.dataset.tags || '';
        item.classList.toggle('hidden', !tags.includes(filter));
      }
    });
  });
});

// ── Active nav highlight on scroll ──────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.nav-cv)');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
/* TILT */
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 12,
  speed: 400,
  glare: true,
  "max-glare": 0.2
});

/* HACKER EFFECT */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const hacker = document.getElementById("hacker");

if(hacker){
  hacker.addEventListener("mouseover", () => {
    let iteration = 0;
    const original = hacker.innerText;

    const interval = setInterval(() => {
      hacker.innerText = original
        .split("")
        .map((letter, index) => {
          if(index < iteration){
            return original[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if(iteration >= original.length){
        clearInterval(interval);
      }

      iteration += 1/3;
    }, 30);
  });
}

/* TERMINAL */
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

if(input){
  function log(text){
    const line = document.createElement("div");
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
      const cmd = input.value.trim();
      runCommand(cmd);
      input.value = "";
    }
  });

  function runCommand(cmd){
    log("> " + cmd);

    switch(cmd){

      case "help":
        log("commands: help, skills, sudo hack");
        break;

      case "skills":
        log("Python, SQL, Power BI, JavaScript");
        break;

      case "sudo hack":
        document.documentElement.classList.toggle("hacked");
        log("⚡ hacker mode activated");
        break;

      default:
        log("command not found");
    }
  }
}