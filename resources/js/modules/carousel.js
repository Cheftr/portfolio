/**
 * =================================================================
 * MODULE: CAROUSEL.JS
 * =================================================================
 * Creates an accessible carousel for project detail pages.
 * Supports keyboard navigation, touch gestures, and ARIA attributes.
 * This refactored version works correctly with flexbox layouts.
 * =================================================================
 */

const setupCarousel = (carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    // Explicitly select only the slide elements to avoid any other nodes.
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const nextButton = carousel.querySelector('.carousel-btn--right');
    const prevButton = carousel.querySelector('.carousel-btn--left');
    const dotsNav = carousel.querySelector('.carousel-nav');

    if (slides.length <= 1) {
        if (nextButton) nextButton.style.display = 'none';
        if (prevButton) prevButton.style.display = 'none';
        if (dotsNav) dotsNav.style.display = 'none';
        return;
    }

    // The `setSlidePosition` function is no longer needed, as CSS flexbox
    // handles the horizontal layout of slides automatically.

    // Create navigation dots.
    let dots = [];
    if (dotsNav) {
        dotsNav.innerHTML = ''; // Clear existing dots to prevent duplicates on hot reloads
        slides.forEach((_, index) => {
            const button = document.createElement('button');
            button.classList.add('carousel-indicator');
            button.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) button.classList.add('current-slide');
            dotsNav.appendChild(button);
        });
        dots = Array.from(dotsNav.children);
    }

    // --- Helper Functions ---

    /**
     * Moves the track to show the target slide.
     * @param {HTMLElement} targetSlide The slide to move to.
     */
    const moveToSlide = (targetSlide) => {
        if (!targetSlide) return;

        // Use the slide's `offsetLeft`. This gives its actual rendered position
        // within the track, automatically accounting for any gaps from whitespace.
        track.style.transform = 'translateX(-' + targetSlide.offsetLeft + 'px)';

        const currentSlide = track.querySelector('.current-slide');
        currentSlide?.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

        // Pause all videos when changing slides to be polite.
        track.querySelectorAll('video').forEach(video => video.pause());
    };

    /**
     * Updates the navigation dots to highlight the current one.
     * @param {number} targetIndex The index of the slide to highlight.
     */
    const updateDots = (targetIndex) => {
        if (!dotsNav) return;
        const currentDot = dotsNav.querySelector('.current-slide');
        currentDot?.classList.remove('current-slide');
        if (dots[targetIndex]) {
            dots[targetIndex].classList.add('current-slide');
        }
    };

    /**
     * Shows or hides the previous/next buttons based on the current slide.
     * @param {number} targetIndex The index of the current slide.
     */
    const updateButtons = (targetIndex) => {
        if (!prevButton || !nextButton) return;
        prevButton.hidden = targetIndex === 0;
        nextButton.hidden = targetIndex === slides.length - 1;
    };

    // --- Event Listeners ---

    nextButton?.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        // Find the index of the current slide in our clean `slides` array.
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const nextSlide = slides[currentIndex + 1];

        if (nextSlide) {
            const nextIndex = currentIndex + 1;
            moveToSlide(nextSlide);
            updateDots(nextIndex);
            updateButtons(nextIndex);
        }
    });

    prevButton?.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const prevSlide = slides[currentIndex - 1];
        
        if (prevSlide) {
            const prevIndex = currentIndex - 1;
            moveToSlide(prevSlide);
            updateDots(prevIndex);
            updateButtons(prevIndex);
        }
    });

    dotsNav?.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(targetSlide);
        updateDots(targetIndex);
        updateButtons(targetIndex);
    });

    // --- Initial State ---
    const initialSlide = slides.length > 0 ? slides[0] : null;
    if (initialSlide) {
        initialSlide.classList.add('current-slide');
    }
    updateButtons(0);
};

/**
 * Finds all carousel containers on the page and initializes them.
 */
export function initCarousel() {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(setupCarousel);
}
