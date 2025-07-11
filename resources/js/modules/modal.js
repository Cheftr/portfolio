/**
 * =================================================================
 * MODULE: MODAL.JS
 * =================================================================
 * Provides accessible modal dialog functionality.
 * It handles opening, closing, focus trapping, and dynamic content.
 * This single module replaces the inline scripts on both the
 * credentials and projects pages.
 * =================================================================
 */

let previouslyFocusedElement;

/**
 * Opens a modal dialog.
 * @param {HTMLElement} modal - The modal element to open.
 * @param {HTMLElement} [triggerButton] - The button that triggered the modal, used for dynamic content.
 */
const openModal = (modal, triggerButton) => {
    if (!modal) return;

    // For the 'ideaModal', inject content from the trigger button's data attributes
    if (modal.id === 'ideaModal' && triggerButton) {
        const title = triggerButton.dataset.title || 'Idea Details';
        const description = triggerButton.dataset.description || 'No description provided.';
        modal.querySelector('#ideaModalLabel').textContent = title;
        modal.querySelector('#ideaModalBody').textContent = description;
    }

    // Save the element that was focused before the modal opened
    previouslyFocusedElement = document.activeElement;

    // Show the modal
    modal.classList.add('is-open');

    // Trap focus inside the modal
    trapFocus(modal);
};

/**
 * Closes a modal dialog.
 * @param {HTMLElement} modal - The modal element to close.
 */
const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    // Restore focus to the element that opened the modal
    previouslyFocusedElement?.focus();
};

/**
 * Traps keyboard focus within the modal for accessibility.
 * @param {HTMLElement} modal - The modal element to trap focus in.
 */
const trapFocus = (modal) => {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Focus the first element when the modal opens
    firstFocusableElement?.focus();

    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
};

/**
 * Initializes all modal triggers and listeners on the page.
 */
export function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modals = document.querySelectorAll('.modal');

    // Add click listeners to all modal trigger buttons
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-trigger');
            const modal = document.getElementById(modalId);
            openModal(modal, trigger);
        });
    });

    // Add listeners for closing modals
    modals.forEach(modal => {
        // Close button inside the modal
        const closeButtons = modal.querySelectorAll('.modal-close');
        closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal(modal)));

        // Clicking on the modal overlay (background)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Add listener for the 'Escape' key to close any open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.is-open');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });
}
