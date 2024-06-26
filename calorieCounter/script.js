// to access an HTML element with a given id name It can be used the getElementById() method.
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

/* even though I set an input element to be a number, JavaScript receives a string value. 
So I needed to write a function to clean the string value and ensure I had a number. */
/*function cleanInputString(str) {
    const strArray = str.split(''); // the split() method splits a string into an array of substrings, and returns the new array.
    let cleanStrArray = [];
    for (let i = 0; i < strArray.length; i++) {
        if (!["+", "-", " "].includes(strArray[i])) { // within this loop is checked if the character in strArray at index i is not a "+", "-", or a space (" "). If it is not, it pushes it to the cleanStrArray.
            cleanStrArray.push(strArray[i]);
        }
    }
}
*/
/* while looping through the string works, creating a new array is inefficient for memory and runtime performance.
Instead, we can use Regular Expressions(referred to as "regex") to match specific characters.*/
function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, ""); // .replace() method which allows you to replace characters in the string with another string.
}

function isInvalidInput(str) {
    // the following regex will match 'e' and 'E'
    const regex = /e/i; // the e in a number input can also be an uppercase E. Regex has a flag for this, however – the i flag, which stands for "insensitive".
}