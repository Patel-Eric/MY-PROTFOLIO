// Typed.js
new Typed(".typing", {
  strings: [
    "Hi, I'm Eric Patel",
    "Web Developer | CSE Student | AI Explorer | Car Enthusiast | Digital Creator | Video Editor"
  ],
  typeSpeed: 50,
  backSpeed: 25,
  startDelay: 500,
  backDelay: 1500,
  loop: true
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const toggle = document.getElementById("dark-toggle");
  toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// === MOUSE INTERACTION EFFECT (Canvas) ===
let mouseMoved = false;

const pointer = {
  x: 0.5 * window.innerWidth,
  y: 0.5 * window.innerHeight,
};

const params = {
  pointsNumber: 40,
  widthFactor: 0.3,
  mouseThreshold: 0.6,
  spring: 0.4,
  friction: 0.5,
};

function updateMousePosition(eX, eY) {
  pointer.x = eX;
  pointer.y = eY;
}

window.addEventListener("mousemove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.clientX, e.clientY);
});

function setupCanvas() {
  const canvas = document.getElementById("mouse-effect");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const points = [];
  for (let i = 0; i < params.pointsNumber; i++) {
    points.push({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    });
  }

  function update(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach((p, i) => {
      const prev = i === 0 ? pointer : points[i - 1];
      const dx = (prev.x - p.x) * params.spring;
      const dy = (prev.y - p.y) * params.spring;

      p.dx += dx;
      p.dy += dy;
      p.dx *= params.friction;
      p.dy *= params.friction;
      p.x += p.dx;
      p.y += p.dy;
    });

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.strokeStyle = "#00ffe1";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    requestAnimationFrame(update);
  }

  update(0);
}

setupCanvas();
window.addEventListener("resize", setupCanvas);
