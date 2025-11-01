// نظام البورتفوليو المتكامل
class CyberPortfolio {
  constructor() {
    this.music = document.getElementById("bg-music");
    this.isPlaying = false;
    this.isInitialized = false;
    this.init();
  }

  async init() {
    if (this.isInitialized) return;

    this.createFloatingShapes();
    this.createParticles();
    this.initCustomCursor();
    this.initTypingEffect();
    this.initCounters();
    this.initScrollAnimations();
    this.initMusicSystem();
    this.initInteractiveElements();
    this.bindEvents();

    this.isInitialized = true;
  }

  // إنشاء الأشكال العائمة
  createFloatingShapes() {
    const container = document.querySelector(".floating-shapes");
    const shapes = ["circle", "triangle", "square", "hexagon"];
    const colors = ["#00f3ff", "#8B5CEB", "#ff00ff", "#00ff41", "#ffd300"];

    for (let i = 0; i < 15; i++) {
      const shape = document.createElement("div");
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      shape.className = `floating-shape ${shapeType}`;
      shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 40 + 10}px;
                height: ${Math.random() * 40 + 10}px;
                background: ${color};
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                animation: floatShape ${
                  Math.random() * 20 + 10
                }s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;

      container.appendChild(shape);
    }

    // إضافة الأنيميشن للأشكال
    const style = document.createElement("style");
    style.textContent = `
            .floating-shape.circle { border-radius: 50%; }
            .floating-shape.triangle { 
                width: 0; height: 0;
                background: transparent !important;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 30px solid;
            }
            .floating-shape.square { transform: rotate(45deg); }
            .floating-shape.hexagon {
                background: transparent !important;
                position: relative;
                width: 30px;
                height: 17.32px;
                margin: 8.66px 0;
            }
            .floating-shape.hexagon:before,
            .floating-shape.hexagon:after {
                content: "";
                position: absolute;
                width: 0;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
            }
            .floating-shape.hexagon:before {
                bottom: 100%;
                border-bottom: 8.66px solid;
            }
            .floating-shape.hexagon:after {
                top: 100%;
                border-top: 8.66px solid;
            }

            @keyframes floatShape {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${
      Math.random() * 100 - 50
    }px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${
      Math.random() * 100 - 50
    }px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${
      Math.random() * 100 - 50
    }px) rotate(270deg);
                }
            }
        `;
    document.head.appendChild(style);
  }

  // إنشاء الجسيمات
  createParticles() {
    const containers = [".particles-field", ".footer-particles"];

    containers.forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        const size = Math.random() * 3 + 1;
        const colors = ["#00f3ff", "#8B5CEB", "#ff00ff"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: ${Math.random() * 0.6 + 0.2};
                    animation: particleFloat ${
                      Math.random() * 10 + 5
                    }s ease-in-out infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;

        container.appendChild(particle);
      }
    });

    const style = document.createElement("style");
    style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: ${Math.random() * 0.6 + 0.2};
                }
                50% {
                    transform: translate(${Math.random() * 50 - 25}px, ${
      Math.random() * 50 - 25
    }px);
                    opacity: ${Math.random() * 0.8 + 0.2};
                }
            }
        `;
    document.head.appendChild(style);
  }

  // المؤشر المخصص
  initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const trail = document.querySelector(".cursor-trail");

    let mouseX = 0,
      mouseY = 0;
    let trailX = 0,
      trailY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // تحديث المؤشر الرئيسي
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";

      // إنشاء أثر جديد
      const newTrail = trail.cloneNode(true);
      newTrail.style.left = mouseX + "px";
      newTrail.style.top = mouseY + "px";
      document.body.appendChild(newTrail);

      // إزالة الأثر بعد الأنيميشن
      setTimeout(() => {
        newTrail.remove();
      }, 600);
    });

    // تأثيرات النقر
    document.addEventListener("click", (e) => {
      this.createClickEffect(e.clientX, e.clientY);
    });

    // تأثيرات التمرير فوق العناصر التفاعلية
    const interactiveElements = document.querySelectorAll(
      "a, button, .nav-link, .project-card, .skill-orb, .contact-node"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
        cursor.style.background = "#ff00ff";
      });

      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.background = "#00f3ff";
      });
    });
  }

  // تأثير النقر
  createClickEffect(x, y) {
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid #00f3ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: clickRipple 0.6s ease-out forwards;
        `;

    document.body.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 600);
  }

  // تأثير الكتابة
  initTypingEffect() {
    const texts = [
      "Full-Stack Developer",
      "UI/UX Architect",
      "Digital Innovator",
      "Code Alchemist",
      "Tech Visionary",
      "Problem Solver",
    ];

    const typedTextElement = document.querySelector(".typed-text");
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    // بدء الكتابة بعد تأخير
    setTimeout(type, 1000);
  }

  // العدادات
  initCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const graphs = document.querySelectorAll(".stat-graph");
    const progressBars = document.querySelectorAll(".level-progress");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-count"));
            this.animateCounter(counter, target);

            // تحريك الرسوم البيانية
            graphs.forEach((graph) => {
              const value = graph.getAttribute("data-value");
              graph.style.setProperty("--value", `${value}%`);
            });

            // تحريك أشرطة التقدم
            progressBars.forEach((bar) => {
              const level = bar.getAttribute("data-level");
              bar.style.setProperty("--level", `${level}%`);
            });

            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // تأثيرات التمرير
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      ".skill-orb, .project-card, .contact-node"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all 0.6s ease";
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      observer.observe(el);
    });
  }

  // نظام الموسيقى
  initMusicSystem() {
    const musicToggle = document.querySelector(".music-toggle");
    const volumeControl = document.createElement("input");
    volumeControl.type = "range";
    volumeControl.min = "0";
    volumeControl.max = "100";
    volumeControl.value = "50";
    volumeControl.className = "volume-control";

    musicToggle.appendChild(volumeControl);

    // تحميل الموسيقى تلقائياً بعد تفاعل المستخدم
    document.addEventListener(
      "click",
      () => {
        if (!this.isPlaying) {
          this.music.play().catch((e) => {
            console.log("Audio playback failed:", e);
          });
          this.isPlaying = true;
          musicToggle.querySelector("i").className = "fas fa-pause";
        }
      },
      { once: true }
    );

    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMusic();
    });

    volumeControl.addEventListener("input", (e) => {
      this.music.volume = e.target.value / 100;
    });
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.music.pause();
      document.querySelector(".music-toggle i").className = "fas fa-play";
    } else {
      this.music.play().catch((e) => {
        console.log("Audio playback failed:", e);
      });
      document.querySelector(".music-toggle i").className = "fas fa-pause";
    }
    this.isPlaying = !this.isPlaying;
  }

  // العناصر التفاعلية
  initInteractiveElements() {
    // تأثيرات الأزرار
    const buttons = document.querySelectorAll(".cyber-btn, .action-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.05)";
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // تأثيرات البطاقات
    const cards = document.querySelectorAll(".project-card, .skill-orb");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)";
      });
    });
  }

  // ربط الأحداث
  bindEvents() {
    // التنقل السلس
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // تحديث الشريط العلوي عند التمرير
    window.addEventListener("scroll", () => {
      this.updateActiveNavLink();
    });

    // منع السلوك الافتراضي لبعض العناصر
    document.querySelectorAll(".contact-node").forEach((node) => {
      node.addEventListener("click", (e) => {
        e.preventDefault();
        this.showContactModal(node);
      });
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  showContactModal(node) {
    const platform = node.getAttribute("data-platform");
    const messages = {
      discord: "Join my Discord server for collaborations!",
      github: "Check out my GitHub repositories!",
      linkedin: "Connect with me on LinkedIn!",
      email: "Send me an email at amine.dev@example.com",
    };

    // إنشاء نافذة منبثقة
    const modal = document.createElement("div");
    modal.className = "contact-modal";
    modal.innerHTML = `
            <div class="modal-content">
                <h3>${node.querySelector("h4").textContent}</h3>
                <p>${messages[platform]}</p>
                <button class="modal-close">Close</button>
            </div>
        `;

    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;

    modal.querySelector(".modal-content").style.cssText = `
            background: var(--dark-space);
            border: 2px solid var(--neon-cyan);
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;

    modal.querySelector(".modal-close").style.cssText = `
            background: var(--neon-cyan);
            color: black;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 1rem;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
        `;

    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.remove();
    });

    document.body.appendChild(modal);
  }
}

// وظائف مساعدة عالمية
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// تهيئة البورتفوليو عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new CyberPortfolio();

  // إضافة أنيميشن النقر
  const style = document.createElement("style");
  style.textContent = `
        @keyframes clickRipple {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
        
        @keyframes underlineFlow {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .volume-control {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .music-toggle:hover .volume-control {
            opacity: 1;
        }
        
        .contact-modal {
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
  document.head.appendChild(style);
});

// تأثيرات تحميل الصفحة
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.5s ease";
});

// إضافة بعض الأنيميشن الإضافية
const additionalStyles = `
    .cyber-btn .btn-particles::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%);
        animation: btnParticles 2s ease-in-out infinite;
    }
    
    @keyframes btnParticles {
        0%, 100% { opacity: 0; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.2); }
    }
    
    .project-card .project-glow {
        animation: projectGlow 3s ease-in-out infinite;
    }
    
    @keyframes projectGlow {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.1; }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
