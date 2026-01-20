  // Preloader
    window.addEventListener('load', function() {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 500);
        }, 100);
      }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');

    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      if (!mainNav.classList.contains('navbar-reduce')) {
        mainNav.classList.add('navbar-reduce');
      }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.js-scroll').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navHeight = mainNav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight + 5;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            // Close mobile menu
            mobileMenu.classList.add('hidden');
          }
        }
      });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        mainNav.classList.add('navbar-reduce');
        mainNav.classList.remove('navbar-trans');
      } else {
        mainNav.classList.add('navbar-trans');
        mainNav.classList.remove('navbar-reduce');
      }

      // Back to top button
      const backToTop = document.getElementById('backToTop');
      if (currentScroll > 100) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });

    // Back to top click
    document.getElementById('backToTop').addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Typed.js for hero text
    if (document.getElementById('typed-text')) {
      new Typed('#typed-text', {
        strings: ['Fresh Foods', 'To Your Doorstep', 'All Round Nsukka'],
        typeSpeed: 80,
        backSpeed: 30,
        backDelay: 1100,
        loop: true
      });
    }

    // Counter animation
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 15);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 15);
    }

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
      counterObserver.observe(counter);
    });

    // Testimonial slider (simple auto-rotate)
    let currentTestimonial = 0;
    const testimonials = [
      {
        img: 'img/REVIEW.webp',
        name: 'Chukwuemeka',
        text: 'I recently relocated to a new environment and i have been having trouble eating due to the poorly prepared meals, Until i stumbled upon daily bites now i eat what i like when i like and where i like God bless daily bites'
      },
      {
        img: 'img/REVIEW2.webp',
        name: 'Amaka',
        text: 'Its a great service especially for someone who doesnt want to go far to eat well'
      }
    ];

    function showTestimonial(index) {
      const slider = document.getElementById('testimonial-slider');
      const testimonial = testimonials[index];
      slider.innerHTML = `
        <div class="testimonial-slide text-center text-white p-8">
          <img src="${testimonial.img}" alt="${testimonial.name}" class="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg">
          <span class="block text-xl font-bold mb-4">${testimonial.name}</span>
          <p class="text-lg leading-relaxed mb-4">
            ${testimonial.text}
          </p>
          <i class="fa fa-quote-right text-3xl" style="color: var(--color-primary);"></i>
        </div>
      `;
    }

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 4000);

    // Paystack Payment
    /* function payWithPaystack() {
      let handler = PaystackPop.setup({
        key: '', // Add your Paystack public key here
        email: 'customer@example.com',
        amount: 5000 * 100, // 5000 Naira
        currency: "NGN",
        callback: function(response){
          alert('Payment successful! Reference: ' + response.reference);
        },
        onClose: function(){
          alert('Payment window closed.');
        }
      });
      handler.openIframe();
    }
   */