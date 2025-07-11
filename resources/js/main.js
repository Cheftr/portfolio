/**
 * =================================================================
 * MAIN.JS
 * =================================================================
 * This is the main entry point for all JavaScript on the site.
 * It uses a modular approach, importing functionality from the
 * /modules/ directory.
 *
 * It detects which components are needed on the current page
 * and initializes them, avoiding unnecessary code execution.
 * =================================================================
 */

import { initThemeSwitcher } from './modules/theme.js';
import { initMobileNav } from './modules/navigation.js';
import { initFeedbackLoader } from './modules/feedbackLoader.js';
import { initModals } from './modules/modal.js';
import { initProjectFilter } from './modules/projectFilter.js';
import { initCarousel } from './modules/carousel.js';

/**
 * Executes scripts when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Global Scripts ---
    // These run on every page.
    initThemeSwitcher();
    initMobileNav();

    // --- Page-Specific Initializers ---
    // These check for the existence of a specific element before
    // running the corresponding script.

    // Initializes the feedback rotator on the homepage.
    if (document.getElementById('feedback-container')) {
        initFeedbackLoader();
    }

    // Initializes all carousels on project detail pages.
    if (document.querySelector('.carousel-container')) {
        initCarousel();
    }

    // Initializes modal functionality for credentials and project ideas.
    if (document.querySelector('[data-modal-trigger]')) {
        initModals();
    }

    // Initializes the project filtering functionality on the projects page.
    if (document.getElementById('project-filter-buttons')) {
        initProjectFilter();
    }

});
