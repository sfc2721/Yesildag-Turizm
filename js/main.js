/*
   Yeşildağ Turizm - Luxury Transportation Service
   Interactive Front-End Controller
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- STICKY HEADER ---
  const headerWrapper = document.querySelector('.header-wrapper');
  if (headerWrapper) {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        headerWrapper.classList.add('sticky');
      } else {
        headerWrapper.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
  }

  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // --- HERO SLIDER ---
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow-prev');
  const nextBtn = document.querySelector('.slider-arrow-next');

  if (slides.length > 0 && dotsContainer && prevBtn && nextBtn) {
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000;

    // Create Dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .slider-dot');

    const updateDots = () => {
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      currentSlide = index;
      updateDots();
    };

    const nextSlide = () => {
      let next = currentSlide + 1;
      if (next >= slides.length) next = 0;
      showSlide(next);
    };

    const prevSlide = () => {
      let prev = currentSlide - 1;
      if (prev < 0) prev = slides.length - 1;
      showSlide(prev);
    };

    const goToSlide = (index) => {
      showSlide(index);
      resetInterval();
    };

    const startInterval = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    startInterval();
  }

  // --- VEHICLE FLEET FILTER ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  if (filterBtns.length > 0 && fleetCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        fleetCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- TESTIMONIALS SLIDER ---
  const testimonials = document.querySelectorAll('.testimonial-slide');
  const testDotsContainer = document.querySelector('.testimonials-dots');

  if (testimonials.length > 0 && testDotsContainer) {
    let currentTestimonial = 0;
    let testInterval;

    // Create Testimonial Dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToTestimonial(index));
      testDotsContainer.appendChild(dot);
    });

    const testDots = testDotsContainer.querySelectorAll('.slider-dot');

    const showTestimonial = (index) => {
      testimonials.forEach(t => t.classList.remove('active'));
      testDots.forEach(d => d.classList.remove('active'));

      testimonials[index].classList.add('active');
      testDots[index].classList.add('active');
      currentTestimonial = index;
    };

    const nextTestimonial = () => {
      let next = currentTestimonial + 1;
      if (next >= testimonials.length) next = 0;
      showTestimonial(next);
    };

    const goToTestimonial = (index) => {
      showTestimonial(index);
      clearInterval(testInterval);
      testInterval = setInterval(nextTestimonial, 5000);
    };

    testInterval = setInterval(nextTestimonial, 5000);
  }

  // --- STAT COUNTER ANIMATION ---
  const counters = document.querySelectorAll('.experience-years[data-target]');
  const speed = 200; // The lower the slower

  if (counters.length > 0) {
    const runCounters = () => {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target + '+';
          }
        };
        updateCount();
      });
    };

    // Intersection Observer to run counters when section is visible
    let countTriggered = false;
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countTriggered) {
          runCounters();
          countTriggered = true;
        }
      });
    }, observerOptions);

    const experienceBadge = document.querySelector('.experience-badge');
    if (experienceBadge) {
      observer.observe(experienceBadge);
    }
  }

  // --- BACK TO TOP BUTTON ---
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- BOOKING FORM SUBMISSION ---
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get values
      const nameEl = document.getElementById('fullName');
      const phoneEl = document.getElementById('phone');
      const serviceEl = document.getElementById('serviceType');
      
      const name = nameEl ? nameEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      const service = serviceEl ? serviceEl.value : '';

      if (!name || !phone) {
        showFeedbackModal('Lütfen adınızı ve telefon numaranızı giriniz.', false);
        return;
      }

      // Simulate sending request
      showFeedbackModal(`Sayın ${name}, talebiniz başarıyla alınmıştır. İlgili departmanımız en kısa sürede sizinle iletişime geçecektir.`, true);
      bookingForm.reset();
    });
  }

  // --- NEWSLETTER FORM SUBMISSION ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      if (email) {
        showFeedbackModal('Bültenimize kaydınız başarıyla gerçekleştirilmiştir. Teşekkür ederiz.', true);
        emailInput.value = '';
      }
    });
  }

  // --- MODAL FEEDBACK CREATION ---
  const showFeedbackModal = (message, isSuccess) => {
    // Create modal elements
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(5, 18, 14, 0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.4s ease';

    const dialog = document.createElement('div');
    dialog.style.backgroundColor = '#11141A';
    dialog.style.border = `1px solid ${isSuccess ? '#39B54A' : '#FF4B4B'}`;
    dialog.style.padding = '40px 30px';
    dialog.style.borderRadius = '8px';
    dialog.style.maxWidth = '450px';
    dialog.style.width = '90%';
    dialog.style.textAlign = 'center';
    dialog.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
    dialog.style.transform = 'scale(0.8)';
    dialog.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

    const iconBox = document.createElement('div');
    iconBox.style.width = '70px';
    iconBox.style.height = '70px';
    iconBox.style.borderRadius = '50%';
    iconBox.style.backgroundColor = isSuccess ? 'rgba(57, 181, 74, 0.1)' : 'rgba(255, 75, 75, 0.1)';
    iconBox.style.color = isSuccess ? '#39B54A' : '#FF4B4B';
    iconBox.style.display = 'flex';
    iconBox.style.alignItems = 'center';
    iconBox.style.justifyContent = 'center';
    iconBox.style.fontSize = '2rem';
    iconBox.style.margin = '0 auto 20px auto';
    iconBox.innerHTML = isSuccess ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';

    const title = document.createElement('h3');
    title.style.fontFamily = "'Playfair Display', serif";
    title.style.fontSize = '1.6rem';
    title.style.color = '#FFFFFF';
    title.style.marginBottom = '15px';
    title.innerText = isSuccess ? 'İşlem Başarılı' : 'Hata';

    const desc = document.createElement('p');
    desc.style.fontFamily = "'Outfit', sans-serif";
    desc.style.fontSize = '0.95rem';
    desc.style.color = '#D8DBD9';
    desc.style.lineHeight = '1.6';
    desc.style.marginBottom = '30px';
    desc.innerText = message;

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn', 'btn-primary');
    closeBtn.style.padding = '12px 30px';
    closeBtn.style.fontSize = '0.8rem';
    closeBtn.style.border = 'none';
    closeBtn.innerText = 'KAPAT';
    closeBtn.addEventListener('click', () => {
      modal.style.opacity = '0';
      dialog.style.transform = 'scale(0.8)';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 400);
    });

    dialog.appendChild(iconBox);
    dialog.appendChild(title);
    dialog.appendChild(desc);
    dialog.appendChild(closeBtn);
    modal.appendChild(dialog);
    document.body.appendChild(modal);

    // Trigger transitions
    setTimeout(() => {
      modal.style.opacity = '1';
      dialog.style.transform = 'scale(1)';
    }, 50);
  };

  // --- FLOATING CONTACT DRAWER ---
  const contactBtn = document.querySelector('.floating-contact-btn');
  const drawer = document.querySelector('.contact-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const overlay = document.querySelector('.drawer-overlay');

  if (contactBtn && drawer && drawerClose && overlay) {
    const openDrawer = () => {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable page scrolling
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Enable page scrolling
    };

    contactBtn.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }

  // --- MAKE SERVICE CARDS CLICKABLE ---
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    const link = card.querySelector('.service-card-link');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // Navigate to the link's destination directly
        if (e.target !== link && !link.contains(e.target)) {
          window.location.href = link.href;
        }
      });
    }
  });
});
