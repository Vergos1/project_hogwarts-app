document.addEventListener("DOMContentLoaded", (e) => {
  window.addEventListener('scroll', e => {
    document.documentElement.style.setProperty('--scroll', `${this.scrollY}px`) // Update method
  })
  // scroll y variable
  const canvas = document.getElementById('sparkCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); // Викликаємо функцію відразу для встановлення початкових розмірів

  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 5 - 3;
      this.gravity = 0.01;
      if (Math.random() < 0.5) {
        const opacity = Math.random() * 0.5 + 0.5;
        this.color = 'rgba(255, 69, 0,' + opacity + ')';
      } else {
        const opacity = Math.random() * 0.3 + 0.2;
        this.color = 'rgba(202, 164, 114,' + opacity + ')';
      }
    }

    update() {
      this.speedY += this.gravity;
      this.x += this.speedX;
      this.y -= this.speedY;
      if (this.size > 0.1) this.size -= 0.01;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function handleParticles() {
    particles.push(new Particle());
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].size <= 0.2 || particles[i].y <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищення канвасу для прозорості
    handleParticles();
    requestAnimationFrame(animate);
  }

  animate();
  // canvas animate
})

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
  smooth: 1.6,
  effects: true,
  smoothTouch: 0.1,
})

