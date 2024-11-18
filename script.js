// Basic math operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : "Error"; }
function percentage(a) { return a / 100; }

// Handle operations
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        case '%': return percentage(a);
        default: return null;
    }
}

let currentDisplay = "0";
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'clear') {
            clear();
        } else if (button.id === 'backspace') {
            backspace();
        } else if (button.id === 'equals') {
            evaluate();
        } else if (button.classList.contains('operator')) {
            setOperator(button.dataset.value);
        } else {
            appendNumber(button.dataset.value);
        }
    });
});

function clear() {
    display.textContent = '0';
    currentDisplay = "0";
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
}

function backspace() {
    if (currentDisplay.length === 1) {
        currentDisplay = "0";
    } else {
        currentDisplay = currentDisplay.slice(0, -1);
    }
    updateDisplay();
}

function appendNumber(number) {
    if (currentDisplay === '0' || shouldResetDisplay) {
        currentDisplay = number;
        shouldResetDisplay = false;
    } else if (!(number === '.' && currentDisplay.includes('.'))) {
        currentDisplay += number;
    }
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = currentDisplay;
    currentOperator = operator;
    currentDisplay += ` ${operator} `;
    shouldResetDisplay = false;
    updateDisplay();
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    const parts = currentDisplay.split(` ${currentOperator} `);
    if (parts.length < 2) return; // Ignore if only one part

    secondOperand = parts[1];
    let result = operate(currentOperator, firstOperand, secondOperand);
    if (result === "Error") {
        currentDisplay = "Cannot divide by 0";
    } else {
        currentDisplay = Math.round(result * 10000) / 10000 + '';
    }
    updateDisplay();
    firstOperand = result;
    currentOperator = null;
}

function updateDisplay() {
    display.textContent = currentDisplay;
}
