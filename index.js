import { keyCodes } from './keyCodes.js';

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let oldValue = 0;
let calculating = false;
let operator = '';
let dividedByZero = false;
let hasDecimal = false;

buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

document.addEventListener('keydown', (e) => {
    e.preventDefault();

    const button = document.getElementById(keyCodes[e.code]);

    if (button) {
        button.click();
    }
  });

function handleClick(e) {
    const currentDisplay = display.innerText;
    const element = e.target;

    if (dividedByZero) {
        operator = '';
        oldValue = 0;
        dividedByZero = false;
        display.innerText = element.innerText;
        calculating = false;
        hasDecimal = false;
        return;
    }

    if (element.classList.contains('back')) {
        if (currentDisplay.length === 1) {
            display.innerText = '0';
            return;
        }

        display.innerText = currentDisplay.slice(0, -1);
        return;
    }

    if (element.classList.contains('equal')) {
        const number = Number(currentDisplay);
        const result = operate(oldValue, number, operator);
        updateDisplay(result);
        oldValue = 0;
        calculating = true;
        hasDecimal = false;
        return;

    }

    if (element.classList.contains('number')) {
        if (calculating) {
            display.innerText = element.innerText;
            calculating = false;
            return;
        }

        display.innerText = currentDisplay === '0' 
        ? element.innerText 
        : currentDisplay + element.innerText;
    }

    if (element.classList.contains('dot')) {
        if (hasDecimal || calculating) {
            return;
        }
        display.innerText = currentDisplay + '.';
        hasDecimal = true;
    }

    if (element.classList.contains('clear')) {
        display.innerText = '0';
        operator = '';
        oldValue = 0;
        dividedByZero = false;
        calculating = false;
        hasDecimal = false;
    }

    if (element.classList.contains('operator')) {
        hasDecimal = false;

        if (operator !== '') {

            const number = Number(currentDisplay);
            oldValue = operate(oldValue, number, operator);
            updateDisplay(oldValue);
            operator = element.innerText;
            calculating = true;

        } else {

            calculating = true;
            operator = element.innerText;
            const number = Number(currentDisplay);
            oldValue = operate(oldValue, number, operator);
            updateDisplay(oldValue);

        }
    }

}

function operate(number1, number2, operator) {
    if (operator === '' || number1 === 0) {
        return number2;
    }

    if (operator === '+') {
        return number1 + number2;
    }
    if (operator === '-') {
        if (number1 === 0) {
            return number2;
        }
        return number1 - number2;
    }
    if (operator === 'X') {
        if (number1 === 0) {
            return number2;
        }
        return number1 * number2;
    }
    if (operator === '/') {
        if (number2 === 0) {
            dividedByZero = true;
            return 'END OF THE WORLD!';
        }

        return number1 / number2;
    }
}

function updateDisplay(value) {
    display.innerText = value;
}
