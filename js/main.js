/**
 * main.js — Shared across all pages
 * Handles: header behavior (sticky, scroll hide/show), mobile nav,
 * search overlay, footer newsletter, scroll reveals.
 */
(function () {
  'use strict';

  // ----- Header scroll behavior -----
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const searchBtn = document.querySelector('[data-search-toggle]');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-overlay__close');
  const newsletterForm = document.querySelector('.footer__newsletter-form');

  let lastScroll = 0;
  let headerTicking = false;

  if (header) {
    window.addEventListener('scroll', () => {
      if (!headerTicking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll > 100 && currentScroll > lastScroll) {
            header.classList.add('header--hidden');
          } else {
            header.classList.remove('header--hidden');
          }
          header.classList.toggle('header--scrolled', currentScroll > 0);
          lastScroll = currentScroll;
          headerTicking = false;
        });
        headerTicking = true;
      }
    });
  }

  // ----- Mobile Nav -----
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('mobile-nav--open');
      hamburger.classList.toggle('hamburger--active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('mobile-nav--open');
        hamburger.classList.remove('hamburger--active');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Search Overlay (basic open/close only — no product search) -----
  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('search-overlay--open');
    searchOverlay.querySelector('.search-overlay__input')?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('search-overlay--open');
    document.body.style.overflow = '';
  }

  searchBtn?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay?.classList.contains('search-overlay--open')) {
      closeSearch();
    }
  });

  // ----- Footer Newsletter -----
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const email = input?.value.trim();
    if (!email) return;
    // TODO: Connect real form endpoint (e.g. Web3Forms, Mailchimp)
    OTOKA.showToast('Thanks for subscribing!');
    input.value = '';
  });

  // ----- Scroll Reveal -----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // ----- Highlight active nav link -----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === '/')) {
      link.classList.add('nav__link--active');
    }
  });
})();
