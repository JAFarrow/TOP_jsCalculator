topDisplay = document.querySelector("#topDigit");
bottomDisplay = document.querySelector('#bottomDigit');
intButtons = document.querySelectorAll(".calcButton");
funcButtons = document.querySelectorAll(".calcButtonFunc");
enterButton = document.querySelector('#calcEquals');
backspaceButton = document.querySelector('#calcBack');
clearButton = document.querySelector('#calcClear')

let lastDigit = [];
let currentDigit = [];
let operation = ''
let operationNeccesary = false;


function addition (lastArray, currentArray) {
    let returnArray = [];
    let n = Number(lastArray.join('')) + Number(currentArray.join(''));
    if (n - Math.floor(n) !== 0) {
        returnArray.push(n.toFixed(2));
    } else {
        returnArray.push(n);
    }
    return returnArray;
};

function subtraction (lastArray, currentArray) {
    let returnArray = [];
    let n = Number(lastArray.join('')) - Number(currentArray.join(''));
    if (n - Math.floor(n) !== 0) {
        returnArray.push(n.toFixed(2));
    } else {
        returnArray.push(n);
    }
    return returnArray;
};

function multiplication (lastArray, currentArray) {
    let returnArray = [];
    let n = Number(lastArray.join('')) * Number(currentArray.join(''));
    if (n - Math.floor(n) !== 0) {
        returnArray.push(n.toFixed(2));
    } else {
        returnArray.push(n);
    }
    return returnArray;
};

function division (lastArray, currentArray) {
    let returnArray = [];
    let n = Number(lastArray.join('')) / Number(currentArray.join(''));
    if (n - Math.floor(n) !== 0) {
        returnArray.push(n.toFixed(2));
    } else {
        returnArray.push(n);
    }
    return returnArray;
};

function evaluate (lastArray, currentArray) {
    if (operation == '+') {
        return addition(lastArray, currentArray)
    } else if (operation == '-') {
        return subtraction(lastArray, currentArray)
    } else if (operation == '*') {
        return multiplication(lastArray, currentArray)
    } else if (operation == '/') {
        return division(lastArray, currentArray)
    }
};

function updateBottomDisplay (val) {
    bottomDisplay.innerText = val;
}
function updateTopDisplay (val) {
    topDisplay.innerText = val;
}

intButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentDigit.push(button.value);
        updateBottomDisplay(currentDigit.join(''))
    })
});

funcButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (currentDigit.join('') == '') {
            alert("Please input a number before attempting to run an operation.")
        } else {
            if (operation == '/' && Number(currentDigit.join('')) == 0) {
                alert('Division by zero is currently unsupported. Functionality to be introduced by the devloper in 2099.')
            } else {
                if (operationNeccesary == false) {
                    operation = button.value;
                    operationNeccesary = true;
                    lastDigit = currentDigit;
                    currentDigit = [];
                    updateTopDisplay(`${lastDigit.join('')} ${operation}`);
                    updateBottomDisplay(currentDigit.join(''));
                } else if (operationNeccesary == true) {
                    let output = evaluate(lastDigit, currentDigit);
                    lastDigit = output;
                    currentDigit = [];
                    operation = button.value;
                    updateTopDisplay(`${lastDigit.join('')} ${operation}`);
                    updateBottomDisplay(currentDigit.join(''))
                }
            }
        }
    })
});

enterButton.addEventListener('click', () => {
    if (currentDigit.join('') == '') {
            alert("Please input a number before attempting to run an operation.")
        } else {
            if (operation == '/' && Number(currentDigit.join('')) == 0) {
                alert('Division by zero is currently unsupported. Functionality to be introduced by the devloper in 2099.')
            } else {
                updateTopDisplay(`${lastDigit.join('')} ${operation} ${currentDigit.join('')} =`)
                let output = evaluate(lastDigit, currentDigit);
                lastDigit = output;
                currentDigit = [0];
                updateBottomDisplay(output.join(''))
            }
        }
});

backspaceButton.addEventListener('click', () => {
    currentDigit.pop();
    updateBottomDisplay(currentDigit.join(''));
});

clearButton.addEventListener('click', () => {
    lastDigit = [];
    currentDigit = [];
    operation = '';
    operationNeccesary = false;
    updateTopDisplay(lastDigit.join(''));
    updateBottomDisplay(currentDigit.join(''));
});