/**
 * Calculates the sum of two numbers.
 * 
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two input numbers.
 */
function calculateSum(a, b) {
    return a + b;
}

/**
 * Checks if a string is a palindrome (reads the same forward and backward).
 * This function ignores case and removes non-alphanumeric characters.
 * 
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 */
function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Compare the string with its reverse
    const reversedStr = cleanStr.split('').reverse().join('');
    
    return cleanStr === reversedStr;
}

/**
 * Formats a Date object into 'YYYY-MM-DD' format.
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string in 'YYYY-MM-DD' format.
 */
function formatDate(date) {
    const year = date.getFullYear();
    
    // getMonth() returns 0-11, so add 1 for correct month
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    
    return `${year}-${month}-${day}`;
}