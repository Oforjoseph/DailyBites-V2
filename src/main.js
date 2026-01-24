document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 100);
  }

  // Mobile Menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mobileMenu && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mainNav.classList.add("navbar-reduce");
    });
  }

  // Smooth scroll
  document.querySelectorAll(".js-scroll").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target || !mainNav) return;

      e.preventDefault();
      const targetPosition = target.offsetTop - mainNav.offsetHeight + 5;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      if (mobileMenu) mobileMenu.classList.add("hidden");
    });
  });

  // Navbar + back to top
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (!mainNav) return;

    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      mainNav.classList.add("navbar-reduce");
      mainNav.classList.remove("navbar-trans");
    } else {
      mainNav.classList.add("navbar-trans");
      mainNav.classList.remove("navbar-reduce");
    }

    if (backToTop) backToTop.style.display = scrollY > 100 ? "flex" : "none";
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Typed.js
  const typedEl = document.getElementById("typed-text");
  if (typedEl) {
    new Typed("#typed-text", {
      strings: ["Fresh Foods", "To Your Doorstep", "All Round Nsukka"],
      typeSpeed: 80,
      backSpeed: 30,
      backDelay: 1100,
      loop: true,
    });
  }

  // Counter animation
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 15);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 15);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          animateCounter(entry.target);
          entry.target.classList.add("counted");
        }
      });
    },
    { threshold: 0.5 },
  );

  document
    .querySelectorAll(".counter")
    .forEach((el) => counterObserver.observe(el));

  // Testimonial slider
  const slider = document.getElementById("testimonial-slider");
  if (slider) {
    let currentTestimonial = 0;
    const testimonials = [
      {
        img: "img/REVIEW.webp",
        name: "Chukwuemeka",
        text: "I recently relocated to a new environment and I had trouble eating due to poorly prepared meals. Until I found Daily Bites. Now I eat what I like, when I like, and where I like. God bless Daily Bites.",
      },
      {
        img: "img/REVIEW2.webp",
        name: "Amaka",
        text: "It’s a great service, especially for someone who doesn’t want to go far to eat well.",
      },
    ];

    function showTestimonial(index) {
      const t = testimonials[index];
      slider.innerHTML = `
        <div class="testimonial-slide
          h-[260px] md:h-[300px]
          flex flex-col justify-center items-center
          text-center text-white p-4 md:p-8
          overflow-hidden">

          <img src="${t.img}" alt="${t.name}" class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-3 shadow-lg border-2 border-white" />
          <span class="text-lg md:text-xl font-bold mb-2">${t.name}</span>
          <p class="text-base md:text-lg leading-relaxed italic mb-3 line-clamp-4 md:line-clamp-5">
            "${t.text}"
          </p>
          <i class="fa fa-quote-right text-2xl md:text-3xl" style="color: var(--color-primary);"></i>
        </div>
      `;
    }
    function comingsoon() {
      alert(" Coming soon!");
    }

    showTestimonial(currentTestimonial);
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 4000);
  }
});
