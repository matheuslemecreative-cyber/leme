/* Leme — interações. Edite as configurações abaixo antes de publicar. */
'use strict';

/* CONFIGURAÇÕES DA LEME */

const CONFIG = {
  whatsapp: '5514988378102',
  email: ''
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#header');
  const menuToggle = document.querySelector('#menuToggle');
  const mobileMenu = document.querySelector('#mobileMenu');
  const progress = document.querySelector('#progress');
  const whatsappLink = document.querySelector('#whatsappLink');
  const emailLink = document.querySelector('#emailLink');
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();


/* ==========================================
   LEME — MENU MOBILE PREMIUM
========================================== */

function closeMenu({ restoreFocus = false } = {}) {
  if (!header || !menuToggle || !mobileMenu) return;

  const wasOpen = header.classList.contains('menu-active');

  header.classList.remove('menu-active');
  document.body.classList.remove('menu-open');

  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');

  mobileMenu.inert = true;

  if (restoreFocus && wasOpen) {
    menuToggle.focus();
  }
}

function openMenu() {
  if (!header || !menuToggle || !mobileMenu) return;

  header.classList.add('menu-active');
  document.body.classList.add('menu-open');

  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Fechar menu');

  mobileMenu.inert = false;
}

/* ABRIR E FECHAR PELO HAMBÚRGUER */
menuToggle?.addEventListener('click', () => {
  const isOpen = header?.classList.contains('menu-active');

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

/* FECHAR AO CLICAR EM UM LINK */
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

/* FECHAR COM A TECLA ESC */
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu({ restoreFocus: true });
  }
});

/* MANTER O FOCO DENTRO DO MENU ABERTO */
document.addEventListener('keydown', event => {
  if (
    event.key !== 'Tab' ||
    !header?.classList.contains('menu-active') ||
    !mobileMenu ||
    !menuToggle
  ) {
    return;
  }

  const focusable = [
    menuToggle,
    ...mobileMenu.querySelectorAll('a[href]')
  ];

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* FECHAR AO VOLTAR PARA A VERSÃO DESKTOP */
window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});

/* GARANTIR QUE O MENU COMECE FECHADO */
closeMenu();


  let ticking = false;
  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`;
    header?.classList.toggle('scrolled', window.scrollY > 18);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; }
  }, { passive: true });
  updateScroll();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const message = encodeURIComponent('Olá! Conheci o site da Leme e gostaria de conversar sobre um projeto.');
  if (whatsappLink) {
    if (/^\d{12,15}$/.test(CONFIG.whatsapp)) {
      whatsappLink.href = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
    } else {
      whatsappLink.removeAttribute('target');
      whatsappLink.href = '#contato';
      whatsappLink.addEventListener('click', e => {
        e.preventDefault();
        alert('Antes de publicar, configure seu número de WhatsApp no início do arquivo script.js.');
      });
    }
  }
  if (emailLink) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.email)) {
      emailLink.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Projeto com a Leme')}`;
    } else {
      emailLink.href = '#contato';
      emailLink.addEventListener('click', e => {
        e.preventDefault();
        alert('Antes de publicar, configure seu e-mail comercial no início do arquivo script.js.');
      });
    }
  }
});


/* =====================================
   FAQ - UMA PERGUNTA ABERTA POR VEZ
===================================== */

const faqItems = document.querySelectorAll(
  '.faq-list details'
);

faqItems.forEach((item) => {

  item.addEventListener('toggle', () => {

    if (item.open) {

      faqItems.forEach((otherItem) => {

        if (otherItem !== item) {
          otherItem.open = false;
        }

      });

    }

  });

});

/* ==========================================
   LEME — LUZ ROXA SEGUINDO MOUSE E TOQUE
========================================== */

(() => {
  const glow = document.getElementById("lemeCursorGlow");

  if (!glow) return;

  let hideTimer;

  function moveGlow(x, y) {
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = "1";
  }

  // PC — acompanha o mouse instantaneamente
  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      moveGlow(event.clientX, event.clientY);
    }
  }, { passive: true });

  // CELULAR — acompanha o dedo ao tocar e arrastar
  document.addEventListener("touchstart", (event) => {
    clearTimeout(hideTimer);

    const touch = event.touches[0];

    if (touch) {
      moveGlow(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];

    if (touch) {
      moveGlow(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  // CELULAR — desaparece suavemente depois do toque
  function hideTouchGlow() {
    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
      glow.style.opacity = "0";
    }, 350);
  }

  document.addEventListener("touchend", hideTouchGlow, { passive: true });
  document.addEventListener("touchcancel", hideTouchGlow, { passive: true });

  // PC — desaparece quando o mouse sai da janela
  document.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) {
      glow.style.opacity = "0";
    }
  });
})();


/* ================================================
   LEME — ANIMAÇÕES PREMIUM
   Adicionar no FINAL do script.js
================================================ */

(() => {
  function iniciarAnimacoesLeme() {

    // Respeitar configurações de acessibilidade
    const reduzirMovimento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduzirMovimento) return;

    const isTouch = window.matchMedia(
      '(hover: none), (pointer: coarse)'
    ).matches;

    /* ==========================================
       1. ESTILOS DAS ANIMAÇÕES
    ========================================== */

    const style = document.createElement('style');

    style.textContent = `
      /* ENTRADAS AO ROLAR */
      .leme-animar {
        opacity: 0;
        transform: translate3d(0, 34px, 0);
        transition:
          opacity .8s cubic-bezier(.22, 1, .36, 1),
          transform .8s cubic-bezier(.22, 1, .36, 1);
        transition-delay: var(--leme-delay, 0ms);
      }

      .leme-animar.leme-visivel {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /* IMAGENS */
      .leme-image-zoom {
        overflow: hidden;
      }

      .leme-image-zoom img {
        transition: transform .8s cubic-bezier(.22,1,.36,1);
      }

      @media (hover: hover) {
        .leme-image-zoom:hover img {
          transform: scale(1.045);
        }
      }

      /* BOTÕES */
      .leme-botao-animado {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        transition:
          transform .25s ease,
          box-shadow .3s ease,
          filter .3s ease;
      }

      @media (hover: hover) {
        .leme-botao-animado:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(100, 21, 223, .17);
        }
      }

      .leme-botao-animado:active {
        transform: scale(.97);
      }

      .leme-botao-animado::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
          110deg,
          transparent 20%,
          rgba(255,255,255,.16) 48%,
          transparent 75%
        );
        transform: translateX(-130%);
        transition: transform .65s ease;
        pointer-events: none;
      }

      @media (hover: hover) {
        .leme-botao-animado:hover::after {
          transform: translateX(130%);
        }
      }

      /* CARDS */
      .leme-card-animado {
        transition:
          transform .35s cubic-bezier(.22,1,.36,1),
          box-shadow .35s ease;
        transform-style: preserve-3d;
      }

      @media (hover: hover) {
        .leme-card-animado:hover {
          box-shadow: 0 18px 45px rgba(45, 15, 85, .12);
        }
      }

      /* CLIQUE / TOQUE */
      .leme-ripple {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        background: rgba(175, 115, 255, .25);
        transform: scale(0);
        animation: lemeRipple .65s ease-out forwards;
        z-index: 2;
      }

      @keyframes lemeRipple {
        to {
          transform: scale(3);
          opacity: 0;
        }
      }

      /* TEXTO DO HERO */
      .leme-palavra {
        display: inline-block;
        opacity: 0;
        transform: translateY(18px);
        animation: lemePalavra .65s ease forwards;
        animation-delay: var(--palavra-delay, 0ms);
      }

      @keyframes lemePalavra {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* SUBLINHADO NOS LINKS */
      .desktop-nav a {
        position: relative;
      }

      .desktop-nav a::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -7px;
        width: 100%;
        height: 2px;
        background: #b889ff;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .3s ease;
      }

      @media (hover: hover) {
        .desktop-nav a:hover::after {
          transform: scaleX(1);
        }
      }

      /* FAQ */
      .faq-list details {
        transition:
          background .3s ease,
          border-color .3s ease,
          box-shadow .3s ease;
      }

      .faq-list details[open] {
        box-shadow: 0 10px 30px rgba(100,21,223,.07);
      }

      .faq-list details[open] summary {
        transition: color .3s ease;
      }

      /* MENU MOBILE */
      .mobile-menu a {
        transition:
          transform .3s ease,
          opacity .3s ease,
          color .3s ease;
      }

      .mobile-menu a:active {
        transform: scale(.97);
      }

      /* EVITAR EFEITOS PESADOS NO CELULAR */
      @media (hover: none), (pointer: coarse) {
        .leme-card-animado {
          transform-style: flat;
        }

        .leme-botao-animado:hover {
          transform: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .leme-animar {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    /* ==========================================
       2. ENTRADA DE ELEMENTOS AO ROLAR
    ========================================== */

    const seletoresEntrada = [
      '.section-top',
      '.section-kicker',
      '.intro-body',
      '.service-card',
      '.showcase-item',
      '.method-step',
      '.faq-list details',
      '.statement-inner',
      '.footer',
      '.sobre-leme-imagem'
    ];

    const elementos = [
      ...document.querySelectorAll(
        seletoresEntrada.join(',')
      )
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('leme-visivel');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -25px 0px'
      }
    );

    elementos.forEach((el, index) => {
      // Evitar conflito com a animação .reveal existente
      if (el.classList.contains('reveal')) return;

      el.classList.add('leme-animar');

      el.style.setProperty(
        '--leme-delay',
        `${(index % 4) * 75}ms`
      );

      observer.observe(el);
    });

    /* ==========================================
       3. CARDS COM EFEITO 3D SUAVE
    ========================================== */

    const cards = document.querySelectorAll(
      '.service-card, .showcase-item'
    );

    cards.forEach(card => {
      card.classList.add('leme-card-animado');

      if (isTouch) return;

      let frame = null;

      card.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - .5) * 4;
        const rotateX = (.5 - y) * 4;

        if (frame) cancelAnimationFrame(frame);

        frame = requestAnimationFrame(() => {
          card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });
      });

      card.addEventListener('pointerleave', () => {
        if (frame) cancelAnimationFrame(frame);
        card.style.transform = '';
      });
    });

    /* ==========================================
       4. ZOOM SUAVE NAS IMAGENS
    ========================================== */

    document.querySelectorAll(
      '.showcase-art, .service-visual, .sobre-leme-imagem'
    ).forEach(el => {
      el.classList.add('leme-image-zoom');
    });

    /* ==========================================
       5. ANIMAÇÕES NOS BOTÕES
    ========================================== */

    const botoes = document.querySelectorAll(`
      .btn,
      .header-contact-btn,
      .header-social-btn,
      .mobile-contact-btn,
      .mobile-social-btn,
      .service-white-btn,
      .showcase-button,
      .process-whatsapp-btn,
      .hero-whatsapp-btn,
      .leme-cta-white,
      .btn-jeito-leme
    `);

    botoes.forEach(botao => {
      botao.classList.add('leme-botao-animado');

      botao.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        const rect = botao.getBoundingClientRect();

        const tamanho = Math.max(rect.width, rect.height);

        const ripple = document.createElement('span');
        ripple.className = 'leme-ripple';

        ripple.style.width = `${tamanho}px`;
        ripple.style.height = `${tamanho}px`;

        ripple.style.left =
          `${event.clientX - rect.left - tamanho / 2}px`;

        ripple.style.top =
          `${event.clientY - rect.top - tamanho / 2}px`;

        botao.appendChild(ripple);

        ripple.addEventListener(
          'animationend',
          () => ripple.remove(),
          { once: true }
        );
      });
    });

    /* ==========================================
       6. PALAVRAS ANIMADAS NO TÍTULO PRINCIPAL
    ========================================== */

    const titulo = document.querySelector('.hero h1');

    if (titulo) {
      const nodes = [...titulo.childNodes];
      let contador = 0;

      nodes.forEach(node => {
        // Preservar spans e demais elementos originais
        if (node.nodeType !== Node.TEXT_NODE) return;

        const texto = node.textContent;

        if (!texto.trim()) return;

        const fragment = document.createDocumentFragment();

        const partes = texto.split(/(\s+)/);

        partes.forEach(parte => {
          if (!parte.trim()) {
            fragment.appendChild(
              document.createTextNode(parte)
            );
            return;
          }

          const span = document.createElement('span');
          span.className = 'leme-palavra';
          span.textContent = parte;

          span.style.setProperty(
            '--palavra-delay',
            `${contador * 95}ms`
          );

          contador++;

          fragment.appendChild(span);
        });

        node.replaceWith(fragment);
      });
    }

    /* ==========================================
       7. MOVIMENTO SUAVE NA IMAGEM DO HERO
    ========================================== */

    const heroImagem = document.querySelector(
      '.hero-custom-image'
    );

    if (heroImagem && !isTouch) {
      const hero = document.querySelector('.hero');

      let raf = null;

      hero?.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;

        const rect = hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - .5;

        const y =
          (event.clientY - rect.top) / rect.height - .5;

        if (raf) cancelAnimationFrame(raf);

        raf = requestAnimationFrame(() => {
          heroImagem.style.transform =
            `translate3d(${x * 9}px, ${y * 9}px, 0)`;
        });
      });

      hero?.addEventListener('pointerleave', () => {
        if (raf) cancelAnimationFrame(raf);
        heroImagem.style.transform = '';
      });
    }

    /* ==========================================
       8. ANIMAÇÃO DE ENTRADA NO HEADER
    ========================================== */

    const header = document.querySelector('.header');

    if (header) {
      header.animate(
        [
          {
            opacity: 0,
            transform: 'translateY(-18px)'
          },
          {
            opacity: 1,
            transform: 'translateY(0)'
          }
        ],
        {
          duration: 700,
          easing: 'cubic-bezier(.22,1,.36,1)',
          fill: 'none'
        }
      );
    }

    /* ==========================================
       9. ENTRADA DOS BOTÕES DO HERO
    ========================================== */

    document.querySelectorAll(
      '.hero-actions > *'
    ).forEach((el, index) => {
      el.animate(
        [
          {
            opacity: 0,
            transform: 'translateY(15px)'
          },
          {
            opacity: 1,
            transform: 'translateY(0)'
          }
        ],
        {
          duration: 650,
          delay: 350 + index * 120,
          easing: 'ease-out',
          fill: 'backwards'
        }
      );
    });

  }

  // Funciona mesmo com o script carregado depois do HTML
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      iniciarAnimacoesLeme,
      { once: true }
    );
  } else {
    iniciarAnimacoesLeme();
  }
})();
