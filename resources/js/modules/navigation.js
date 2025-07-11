/**
 * =================================================================
 * MODULE: NAVIGATION.JS
 * =================================================================
 * Handles the mobile navigation menu toggle functionality.
 * =================================================================
 */

/**
 * Initializes the mobile navigation toggle behavior.
 */
export function initMobileNav() {
    const navbarToggler = document.getElementById('navbar-toggler');
    const navMenu = document.getElementById('nav-menu');

    if (navbarToggler && navMenu) {
        navbarToggler.addEventListener('click', () => {
            // Toggle the 'is-active' class to show/hide the menu
            navMenu.classList.toggle('is-active');

            // Update the ARIA attribute for accessibility
            const isExpanded = navMenu.classList.contains('is-active');
            navbarToggler.setAttribute('aria-expanded', isExpanded);
        });
    }
}
