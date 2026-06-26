/**
 * Jorge Coronel - Landing Page Interactive Logic
 * Pure Vanilla JS, high-performance, mobile-first compatible.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // CONFIGURATION
  // ==========================================================================
  // Custom phone number format for WhatsApp redirection
  const WHATSAPP_PHONE = '51936563709'; // Configurable WhatsApp contact number
  
  // ==========================================================================
  // WHATSAPP DYNAMIC MESSAGE REDIRECTION SYSTEM (CRO / CRO OPTIMIZATION)
  // ==========================================================================
  function initWhatsAppRedirection() {
    const waTriggers = document.querySelectorAll('.js-wa-trigger');
    
    waTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        
        const origin = trigger.getAttribute('data-origin') || 'general';
        const plan = trigger.getAttribute('data-plan') || '';
        const device = trigger.getAttribute('data-device') || '';
        const benefit = trigger.getAttribute('data-benefit') || '';
        
        let message = '';
        
        switch (origin) {
          case 'nav-desktop':
          case 'nav-mobile':
            message = 'Hola Jorge, me gustaría recibir asesoría sobre la portabilidad y planes móviles WOM.';
            break;
          case 'hero-primary':
            message = 'Hola Jorge, quiero portarme a WOM y ahorrar con sus planes exclusivos. ¿Me podrías guiar?';
            break;
          case 'plan-450gb':
          case 'plan-libres':
          case 'plan-libres-plus':
          case 'plan-fijo':
          case 'plan-adicional':
            message = `Hola Jorge, me interesa contratar el ${plan}. ¿Cuáles son los requisitos para la portabilidad?`;
            break;
          case 'multiline-calc':
            message = 'Hola Jorge, quiero cotizar una combinación de planes Multilínea para mi familia. ¿Qué descuento adicional me correspondería?';
            break;
          case 'device':
          case 'device-sub':
            message = `Hola Jorge, me interesa consultar el stock y factibilidad comercial para el equipo ${device} con cuota inicial $0.`;
            break;
          case 'benefit-select':
            message = `Hola Jorge, quiero realizar mi portabilidad y seleccionar el beneficio de 6 meses gratis de: "${benefit}".`;
            break;
          case 'floating-button':
            message = 'Hola Jorge, necesito asesoría rápida para realizar mi portabilidad a WOM. ¡Gracias!';
            break;
          case 'final-cta':
            message = 'Hola Jorge, estoy listo para cambiarme a WOM y congelar mi tarifa de oferta por 12 meses. Iniciemos el proceso.';
            break;
          default:
            message = 'Hola Jorge, me interesa recibir información sobre los servicios de portabilidad WOM.';
        }
        
        // Encode and redirect
        const encodedText = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedText}`;
        
        // Open in new tab/app window
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      });
    });
  }

  // ==========================================================================
  // MOBILE MENU INTERACTIVITY
  // ==========================================================================
  function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (!hamburgerBtn || !navMenu) return;
    
    function toggleMenu() {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scrolling when menu is fullscreen active
      if (!isExpanded) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    }
    
    hamburgerBtn.addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // ==========================================================================
  // PLAN 3 (GB LIBRES+) OPTIONS SWITCHER
  // ==========================================================================
  function initPlanSwitcher() {
    const switcherBtns = document.querySelectorAll('.plan-option-switcher .switcher-btn');
    const priceVal = document.getElementById('price-val-plus');
    const planCtaBtn = document.getElementById('btn-plan-plus');
    
    if (!priceVal || !planCtaBtn) return;
    
    switcherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active visual state
        switcherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const price = btn.getAttribute('data-price');
        const discount = btn.getAttribute('data-discount');
        
        // Update UI
        priceVal.textContent = price;
        planCtaBtn.setAttribute('data-plan', `Plan GB Libres+ (${discount}% OFF - $${price})`);
      });
    });
  }

  // ==========================================================================
  // PLAN 1 (450 GB) OPTIONS SWITCHER
  // ==========================================================================
  function initPlan450Switcher() {
    const switcherBtns = document.querySelectorAll('.plan-option-switcher .switcher-btn-450');
    const priceVal = document.getElementById('price-val-450');
    const priceNote = document.getElementById('price-note-450');
    const planCtaBtn = document.querySelector('[data-origin="plan-450gb"]');
    
    if (!priceVal || !priceNote || !planCtaBtn) return;
    
    switcherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active visual state
        switcherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const price = btn.getAttribute('data-price');
        const note = btn.getAttribute('data-note');
        const discount = btn.getAttribute('data-discount');
        
        // Update UI
        priceVal.textContent = price;
        priceNote.textContent = note;
        planCtaBtn.setAttribute('data-plan', `Plan WOM 450 GB (${discount} - $${price})`);
      });
    });
  }

  // ==========================================================================
  // MULTILINE TAB SWITCHING
  // ==========================================================================
  function initMultilineTabs() {
    const tabButtons = document.querySelectorAll('.tab-headers .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-contents .tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTabId = button.getAttribute('data-tab');
        
        // Update tab buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update tab panes
        tabPanes.forEach(pane => {
          if (pane.id === targetTabId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // ==========================================================================
  // DEVICES CATALOG ACCORDION
  // ==========================================================================
  function initDevicesAccordion() {
    const trigger = document.getElementById('accordionTrigger');
    const content = document.getElementById('accordionContent');
    
    if (!trigger || !content) return;
    
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !isExpanded);
      
      if (isExpanded) {
        // Collapse
        content.style.maxHeight = '0px';
        setTimeout(() => {
          content.hidden = true;
        }, 400);
      } else {
        // Expand
        content.hidden = false;
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // Recalculate if inside viewport or scroll into view
        setTimeout(() => {
          // Keep scrolling clean
          trigger.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    });
    
    // Adjust height on window resize if accordion is open
    window.addEventListener('resize', () => {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }

  // ==========================================================================
  // ENTERTAINMENT BENEFITS INTERACTIVE WIDGET
  // ==========================================================================
  function initEntertainmentSelector() {
    const entCards = document.querySelectorAll('.ent-card');
    const selectedTextName = document.getElementById('selectedBenefitName');
    const activeBanner = document.getElementById('activeBenefitBanner');
    const waBenefitBtn = document.getElementById('wa-benefit-btn');
    
    if (!selectedTextName || !activeBanner || !waBenefitBtn) return;
    
    // Initialize state
    let selectedBenefit = '';
    
    entCards.forEach(card => {
      card.addEventListener('click', () => {
        // Clear previous selections
        entCards.forEach(c => c.classList.remove('selected'));
        
        const benefitName = card.getAttribute('data-benefit');
        
        // Select new
        card.classList.add('selected');
        selectedBenefit = benefitName;
        
        // Update UI Banner text and display button datasets
        selectedTextName.textContent = selectedBenefit;
        waBenefitBtn.setAttribute('data-benefit', selectedBenefit);
        waBenefitBtn.setAttribute('data-plan', `Plan con Beneficio (${selectedBenefit})`);
      });
    });
  }

  // ==========================================================================
  // SCROLL ANIMATION (INTERSECTION OBSERVER)
  // ==========================================================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.js-scroll-animate');
    
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      animatedElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('animated'));
    }
  }

  // ==========================================================================
  // PREMIUM INERTIAL SMOOTH SCROLL (LENIS)
  // ==========================================================================
  function initSmoothScroll() {
    // Only initialize Lenis if it loaded correctly from CDN
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false, // Maintain native smooth touch scrolling on mobile
      touchMultiplier: 2,
      infinite: false,
    });

    // Run animation frames
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Bind all anchor clicks to Lenis smooth scrollTo method
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    navAnchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          lenis.scrollTo(targetElement, {
            offset: -80, // Sticky header height offset
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      });
    });

    // Share lenis globally in case other scripts need it
    window.lenis = lenis;
  }

  // ==========================================================================
  // STICKY HEADER SCROLL CLASS
  // ==========================================================================
  function initHeaderScroll() {
    const header = document.querySelector('.navbar-header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.padding = '0px';
        header.style.background = 'rgba(5, 5, 5, 0.9)';
      } else {
        header.style.padding = '';
        header.style.background = 'rgba(5, 5, 5, 0.75)';
      }
    });
  }

  // ==========================================================================
  // INITIALIZE ALL
  // ==========================================================================
  initSmoothScroll();
  initHeaderScroll();
  initMobileMenu();
  initPlanSwitcher();
  initPlan450Switcher();
  initMultilineTabs();
  initDevicesAccordion();
  initEntertainmentSelector();
  initScrollAnimations();
  
  // Run WhatsApp dynamic links binder last
  initWhatsAppRedirection();
});
