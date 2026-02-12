// main.js – Site-wide JavaScript (FIXED & CLEAN)

document.addEventListener("DOMContentLoaded", () => {
  
      /* ===============================
     PREFERS REDUCED MOTION
  ================================ */
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ===============================
     GAME PAGE BACKGROUND SLIDER (SMOOTH)
  ================================ */

  const gameSlider = document.querySelector(".game-bg-slider");

  if (gameSlider && !prefersReduced) {
    const slides = gameSlider.querySelectorAll(".bg-slide");

    const backgrounds = [
      "game/images-1.jpg",
      "game/images-2.jpg",
      "game/images-3.jpg",
      "game/images-4.jpg",
      "game/images-5.jpg",
      "game/images-6.jpg"
    ];

    let currentIndex = 0;
    let visibleSlide = 0;
    let hiddenSlide = 1;

    // preload images
    backgrounds.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // initial state
    slides[visibleSlide].style.backgroundImage =
      `url(${backgrounds[currentIndex]})`;
    slides[visibleSlide].classList.add("active");

    setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;

      // set next image ONLY on hidden slide
      slides[hiddenSlide].style.backgroundImage =
        `url(${backgrounds[currentIndex]})`;

      // fade transition
      slides[hiddenSlide].classList.add("active");
      slides[visibleSlide].classList.remove("active");

      // swap roles AFTER fade
      [visibleSlide, hiddenSlide] = [hiddenSlide, visibleSlide];

    }, 6500); // smooth timing
  }

  /* ===============================
     THEME TOGGLE
  ================================ */
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") document.body.classList.add("light");

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
      );
    });
  }

  /* ===============================
     SCROLL REVEAL
  ================================ */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(el => observer.observe(el));
  }

  /* ===============================
     CV MODAL
  ================================ */
  const cvModal = document.getElementById("cv-modal");
  const previewCvBtn = document.getElementById("preview-cv-btn");

  if (cvModal && previewCvBtn) {
    const cvCloseBtn = cvModal.querySelector(".modal-close");

    previewCvBtn.addEventListener("click", () => {
      cvModal.style.display = "flex";
      cvModal.setAttribute("aria-hidden", "false");
    });

    cvCloseBtn.addEventListener("click", () => closeCv());
    cvModal.addEventListener("click", e => {
      if (e.target === cvModal) closeCv();
    });

    function closeCv() {
      cvModal.style.display = "none";
      cvModal.setAttribute("aria-hidden", "true");
    }
  }

  /* ===============================
     CERTIFICATE MODAL ✅ FIXED
  ================================ */
  const certModal = document.getElementById("certificateModal");
  const certImage = document.getElementById("certificateImage");
  const certCloseBtn = document.querySelector(".certificate-close");

  if (certModal && certImage && certCloseBtn) {

    document.querySelectorAll(".view-cert-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const src = btn.dataset.src;
        if (!src) return alert("Certificate file not found");

        certImage.src = src;
        certModal.classList.add("active");
        certModal.setAttribute("aria-hidden", "false");
      });
    });

    function closeCert() {
      certModal.classList.remove("active");
      certModal.setAttribute("aria-hidden", "true");
      certImage.src = "";
    }

    certCloseBtn.addEventListener("click", closeCert);
    certModal.addEventListener("click", e => {
      if (e.target === certModal) closeCert();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeCert();
    });
  }


  /* ===============================
     MAGNETIC BUTTONS
  ================================ */
  if (!prefersReduced) {
    document.querySelectorAll(".btn-primary").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
      });
    });
  }

  /* ===============================
     3D PROJECT CARD TILT
  ================================ */
  if (!prefersReduced) {
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const cx = r.width / 2;
        const cy = r.height / 2;

        card.style.transform =
          `rotateX(${(y - cy) / 20}deg) rotateY(${(cx - x) / 20}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
      });
    });
  }

/* ===============================
   MOBILE NAV TOGGLE (CLEAN)
================================ */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("nav-open"); // optional: lock scroll
  });

  // Close menu when clicking link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("nav-open");
    });
  });
}



