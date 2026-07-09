/**
 * accordion.js — Reusable accordion toggle logic
 * Usage: .accordion > .accordion__trigger + .accordion__content
 */
(function () {
  'use strict';

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.accordion__trigger');
    if (!trigger) return;

    const accordion = trigger.closest('.accordion');
    const content = accordion.querySelector('.accordion__content');
    const isOpen = accordion.classList.contains('accordion--open');

    // Close all others in same group (optional)
    const group = accordion.closest('[data-accordion-group]');
    if (group) {
      group.querySelectorAll('.accordion--open').forEach(a => {
        if (a !== accordion) closeAccordion(a);
      });
    }

    if (isOpen) {
      closeAccordion(accordion);
    } else {
      openAccordion(accordion);
    }
  });

  function openAccordion(accordion) {
    const content = accordion.querySelector('.accordion__content');
    accordion.classList.add('accordion--open');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  function closeAccordion(accordion) {
    const content = accordion.querySelector('.accordion__content');
    content.style.maxHeight = content.style.maxHeight; // trigger reflow
    content.style.maxHeight = '0';
    accordion.classList.remove('accordion--open');
  }
})();
