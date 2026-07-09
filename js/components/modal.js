/**
 * modal.js — Reusable modal open/close logic
 * Usage: Add data-modal-open="modal-id" to triggers, data-modal-close to close buttons.
 */
(function () {
  'use strict';

  document.addEventListener('click', (e) => {
    // Open
    const openTrigger = e.target.closest('[data-modal-open]');
    if (openTrigger) {
      e.preventDefault();
      const id = openTrigger.dataset.modalOpen;
      const modal = document.getElementById(id);
      if (modal) open(modal);
    }

    // Close
    const closeTrigger = e.target.closest('[data-modal-close]');
    if (closeTrigger) {
      const modal = closeTrigger.closest('.modal-overlay');
      if (modal) close(modal);
    }

    // Close on overlay click
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('modal-overlay--open')) {
      close(e.target);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-overlay--open');
      if (openModal) close(openModal);
    }
  });

  function open(modal) {
    modal.classList.add('modal-overlay--open');
    document.body.style.overflow = 'hidden';
  }

  function close(modal) {
    modal.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
  }

  // Expose on OTOKA
  OTOKA.modal = { open, close };
})();
