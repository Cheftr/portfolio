/**
 * =================================================================
 * MODULE: PROJECTFILTER.JS
 * =================================================================
 * Handles the filtering logic for the project cards on the
 * projects page.
 * =================================================================
 */

/**
 * Initializes the project filtering functionality.
 */
export function initProjectFilter() {
    const filterContainer = document.getElementById('project-filter-buttons');
    const projectCards = document.querySelectorAll('#projectsContainer .project-card');

    if (!filterContainer || projectCards.length === 0) return;

    filterContainer.addEventListener('click', (e) => {
        // Ensure a button was clicked
        const targetButton = e.target.closest('button');
        if (!targetButton) return;

        const filter = targetButton.getAttribute('data-filter');

        // Update active state on buttons
        filterContainer.querySelector('.active').classList.remove('active');
        targetButton.classList.add('active');

        // Show/hide project cards based on the selected filter
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
