// Basic math operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : "Error"; }

// Handle operations
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        default: return null;
    }
}

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
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
}

function backspace() {
    if (display.textContent.length === 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else if (!(number === '.' && display.textContent.includes('.'))) {
        display.textContent += number;
    }
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondOperand = display.textContent;
    const result = operate(currentOperator, firstOperand, secondOperand);
    display.textContent = result === "Error" ? "Cannot divide by 0" : Math.round(result * 10000) / 10000;
    firstOperand = result;
    currentOperator = null;
}
