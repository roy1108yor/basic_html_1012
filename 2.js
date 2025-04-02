/**
 * Hides an element by its ID.
 * 
 * @param {string} elementId - The ID of the element to hide.
 * @returns {HTMLElement|null} The element that was hidden, or null if not found.
 */
function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
        return element;
    }
    return null;
}

/**
 * Shows an element by its ID.
 * 
 * @param {string} elementId - The ID of the element to show.
 * @param {string} [displayValue='block'] - The display style value to use (default: 'block').
 * @returns {HTMLElement|null} The element that was shown, or null if not found.
 */
function showElement(elementId, displayValue = 'block') {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = displayValue;
        return element;
    }
    return null;
}

/**
 * Toggles a CSS class on the specified element.
 * 
 * @param {HTMLElement|string} element - The element or element ID to toggle the class on.
 * @param {string} className - The CSS class name to toggle.
 * @returns {boolean} True if the class was added, false if it was removed.
 */
function toggleClass(element, className) {
    // If a string was provided, get the element by ID
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }

    // If element is not found or not valid, return false
    if (!element || !element.classList) {
        return false;
    }

    // Toggle the class and return whether it was added or removed
    const wasAdded = element.classList.toggle(className);
    return wasAdded;
}

/**
 * Creates a new HTML element with the specified text content.
 * 
 * @param {string} tagName - The type of element to create (e.g., 'div', 'p', 'span').
 * @param {string} textContent - The text content to add to the element.
 * @param {Object} [attributes] - Optional object containing attributes to set on the element.
 * @returns {HTMLElement} The newly created element.
 */
function createElementWithText(tagName, textContent, attributes) {
    const element = document.createElement(tagName);
    
    // Set the text content
    element.textContent = textContent;
    
    // If attributes are provided, set them on the element
    if (attributes && typeof attributes === 'object') {
        for (const [key, value] of Object.entries(attributes)) {
            // Handle class and id separately for convenience
            if (key === 'class') {
                element.className = value;
            } else if (key === 'id') {
                element.id = value;
            } else {
                element.setAttribute(key, value);
            }
        }
    }
    
    return element;
}