// main.js – FINAL CLEAN WORKING VERSION

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     PREFERS REDUCED MOTION
  =============================== */
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ===============================
     MOBILE NAVIGATION (FIXED)
  =============================== */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active"); // ✅ use ACTIVE not open
      document.body.classList.toggle("nav-open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* ===============================
     THEME TOGGLE
  =============================== */
  const themeBtn = document.getElementById("theme-btn");

  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme") || "dark";

    if (savedTheme === "light") {
      document.body.classList.add("light");
    }

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
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ===============================
     MAGNETIC BUTTONS
  =============================== */
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
  =============================== */
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

});
