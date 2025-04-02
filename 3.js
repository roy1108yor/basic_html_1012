/**
 * Generates a random number between the specified minimum and maximum values.
 * 
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random number between min and max (inclusive).
 */
function randomNumber(min, max) {
    // Make sure min and max are numbers
    min = Number(min);
    max = Number(max);
    
    // Make sure min is less than max
    if (min > max) {
        [min, max] = [max, min]; // Swap values if min is greater than max
    }
    
    // Calculate random number between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 * 
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {boolean} [immediate=false] - Whether to invoke the function on the leading edge instead of trailing.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    
    return function executedFunction(...args) {
        const context = this;
        
        // Function to be executed after delay
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        // If immediate is true and not already in timeout period, execute now
        const callNow = immediate && !timeout;
        
        // Clear the timeout and setup a new one
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        // If immediate execution is needed, call function now
        if (callNow) func.apply(context, args);
    };
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per every specified wait milliseconds.
 * 
 * @param {Function} func - The function to throttle.
 * @param {number} wait - The number of milliseconds to throttle invocations to.
 * @returns {Function} The throttled function.
 */
function throttle(func, wait) {
    let lastCall = 0;
    let timeout = null;
    
    return function executedFunction(...args) {
        const context = this;
        const now = Date.now();
        const timeSinceLastCall = now - lastCall;
        
        // If enough time has passed since last call, execute immediately
        if (timeSinceLastCall >= wait) {
            // Clear any pending timeout
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            
            lastCall = now;
            return func.apply(context, args);
        } else {
            // Otherwise, set up a timeout to execute after remaining time
            if (!timeout) {
                timeout = setTimeout(() => {
                    lastCall = Date.now();
                    timeout = null;
                    func.apply(context, args);
                }, wait - timeSinceLastCall);
            }
        }
    };
}

/**
 * Creates a deep copy of an object or array.
 * This function handles nested objects, arrays, dates, and primitive types.
 * 
 * @param {*} obj - The object to clone.
 * @returns {*} A deep copy of the provided object.
 */
function deepClone(obj) {
    // Handle null, undefined, and primitive types
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    // Handle Array objects
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    // Handle Object objects
    const clonedObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    
    return clonedObj;
}