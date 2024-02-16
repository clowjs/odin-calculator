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

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp")        playerSpriteX += 10
    else if (e.code === "ArrowDown") playerSpriteX -= 10
  
    document.getElementById('test').innerHTML = 'playerSpriteX = ' + playerSpriteX;
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

const keyCodes = {
    "Backspace": "button-back",
    "Enter": "button-equal",
    "Digit0": "button-zero",
    "Digit1": "button-one",
    "Digit2": "button-two",
    "Digit3": "button-three",
    "Digit4": "button-four",
    "Digit5": "button-five",
    "Digit6": "button-six",
    "Digit7": "button-seven",
    "Digit8": "button-eight",
    "Digit9": "button-nine",
    "Numpad0": "button-zero",
    "Numpad1": "button-one",
    "Numpad2": "button-two",
    "Numpad3": "button-three",
    "Numpad4": "button-four",
    "Numpad5": "button-five",
    "Numpad6": "button-six",
    "Numpad7": "button-seven",
    "Numpad8": "button-eight",
    "Numpad9": "button-nine",
    "NumpadMultiply": "button-multiply",
    "NumpadAdd": "button-add",
    "NumpadSubtract": "button-subtract",
    "NumpadDivide": "button-divide",
    "NumpadDecimal": "button-dot",
    "Equal": "button-equal",
    "Minus": "button-subtract",
    "Period": "button-dot",
    "Slash": "button-divide",
}
