/**
 * =================================================================
 * MODULE: THEME.JS
 * =================================================================
 * Handles the light/dark mode theme switcher functionality.
 * It reads from/writes to localStorage to persist the user's choice.
 * =================================================================
 */

/**
 * Initializes the theme switcher component.
 */
export function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Exit if the toggle button isn't on the page

    const themeIcon = themeToggle.querySelector('.theme-toggle-icon');

    /**
     * Applies a given theme to the document and updates the icon.
     * @param {string} theme - The theme to apply ('light' or 'dark').
     */
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    // Set initial theme on page load from localStorage or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);

    // Add click event listener to the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}
