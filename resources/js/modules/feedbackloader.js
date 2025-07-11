/**
 * =================================================================
 * MODULE: FEEDBACKLOADER.JS
 * =================================================================
 * Handles fetching and displaying rotating feedback items,
 * presumably for the homepage.
 * =================================================================
 */

let feedbacks = [];
let currentIndex = 0;
let feedbackContainer;

/**
 * Fetches feedback data from a JSON file.
 */
async function fetchFeedbacks() {
    try {
        // The path is relative to the HTML file, not this JS file.
        const response = await fetch('./resources/data/feedback.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        feedbacks = await response.json();
        if (feedbacks.length > 0) {
            displayFeedback(); // Initial display
            setInterval(displayFeedback, 6000); // Rotate every 6 seconds
        } else {
            feedbackContainer.innerHTML = '<p class="feedback-text show">No feedback available.</p>';
        }
    } catch (error) {
        console.error("Could not fetch feedbacks:", error);
        feedbackContainer.innerHTML = '<p class="feedback-text show">Could not load feedback.</p>';
    }
}

/**
 * Displays the next feedback item with a fade transition.
 */
function displayFeedback() {
    if (feedbacks.length === 0) return;

    const existingFeedback = feedbackContainer.querySelector('.feedback-text');

    // 1. Fade out the current feedback item
    if (existingFeedback) {
        existingFeedback.classList.remove('show');
    }

    // 2. After the fade-out, replace content and fade in the new item
    setTimeout(() => {
        feedbackContainer.innerHTML = ''; // Clear container

        const feedbackElement = document.createElement('blockquote');
        feedbackElement.classList.add('feedback-text');
        feedbackElement.textContent = `"${feedbacks[currentIndex]}"`;
        feedbackContainer.appendChild(feedbackElement);

        // Force a reflow to ensure the transition is applied
        void feedbackElement.offsetWidth;
        feedbackElement.classList.add('show');

        // Update index for the next rotation
        currentIndex = (currentIndex + 1) % feedbacks.length;
    }, 800); // Match this delay to your CSS transition duration
}

/**
 * Initializes the feedback loader component.
 */
export function initFeedbackLoader() {
    feedbackContainer = document.getElementById('feedback-container');
    if (feedbackContainer) {
        fetchFeedbacks();
    }
}
