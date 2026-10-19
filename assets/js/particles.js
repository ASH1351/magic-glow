/**
 * MAGIC GLOW - Hero Canvas Particle System
 * Features:
 * - 4-pointed golden sparkle stars matching the logo
 * - Floating micro-gold flakes & ambient golden light orbs
 * - Mouse proximity glow & gentle repulsion
 * - Automatic pause when out of viewport (IntersectionObserver)
 * - Respects prefers-reduced-motion
 */

class GoldParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 24 : 65;
    this.mouse = { x: -1000, y: -1000, radius: 120 };
    this.animId = null;
    this.isVisible = true;

    // Check prefers-reduced-motion
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse tracker
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Viewport observer
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animId) {
            this.animate();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(this.canvas);
    }

    this.createParticles();
    if (!this.reducedMotion) {
      this.animate();
    } else {
      this.renderStatic();
    }
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = this.canvas.parentElement ? this.canvas.parentElement.offsetWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.offsetHeight : window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.particleCount = window.innerWidth < 768 ? 20 : 60;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.newParticle());
    }
  }

  newParticle() {
    const isStar = Math.random() > 0.6;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: isStar ? (Math.random() * 4 + 2) : (Math.random() * 2.2 + 0.8),
      type: isStar ? 'star' : 'orb',
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: -Math.random() * 0.5 - 0.15, // float upward
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulse: Math.random() * Math.PI,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: Math.random() > 0.3 ? '#D4AF37' : '#FFE27A' // Gold primary vs bright highlight
    };
  }

  drawStar(x, y, radius, opacity, rotation, color) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.beginPath();

    const points = 4;
    const innerRadius = radius * 0.28;
    for (let i = 0; i < points * 2; i++) {
      const r = (i % 2 === 0) ? radius : innerRadius;
      const angle = (i * Math.PI) / points;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.closePath();

    // Star gold gradient fill
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.shadowBlur = radius * 2.5;
    this.ctx.shadowColor = '#FFD700';
    this.ctx.fill();

    this.ctx.restore();
  }

  drawOrb(x, y, radius, opacity, color) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.shadowBlur = radius * 3;
    this.ctx.shadowColor = '#D4AF37';
    this.ctx.fill();
    this.ctx.restore();
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move particle
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;
      p.rotation += p.rotSpeed;

      // Mouse interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force * 2;
        p.y -= Math.sin(angle) * force * 2;
        p.opacity = Math.min(1, p.opacity + 0.1);
      }

      // Screen wrap
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const currentOpacity = Math.max(0.1, p.opacity * (0.6 + 0.4 * Math.sin(p.pulse)));

      if (p.type === 'star') {
        this.drawStar(p.x, p.y, p.size, currentOpacity, p.rotation, p.color);
      } else {
        this.drawOrb(p.x, p.y, p.size, currentOpacity, p.color);
      }
    }
  }

  renderStatic() {
    this.render();
  }

  animate() {
    if (!this.isVisible || this.reducedMotion) {
      this.animId = null;
      return;
    }
    this.update();
    this.render();
    this.animId = requestAnimationFrame(() => this.animate());
  }
}

// Global initialization helper
window.initGoldParticles = function(canvasId = 'goldParticleCanvas') {
  return new GoldParticleEngine(canvasId);
};
