topDisplay = document.querySelector("#topDigit");
bottomDisplay = document.querySelector('#bottomDigit');
intButtons = document.querySelectorAll(".calcButton");
funcButtons = document.querySelectorAll(".calcButtonFunc");

let lastDigit = [];
let currentDigit = [];
let operation = ''
let operationNeccesary = false;


function addition (lastArray, currentArray) {
    let returnArray = [];
    returnArray.push(Number(lastArray.join('')) + Number(currentArray.join('')));
    return returnArray;
};

function subtraction (lastArray, currentArray) {
    let returnArray = [];
    returnArray.push(Number(lastArray.join('')) - Number(currentArray.join('')));
    return returnArray;
};

function multiplication (lastArray, currentArray) {
    let returnArray = [];
    returnArray.push(Number(lastArray.join('')) * Number(currentArray.join('')));
    return returnArray;
};

function division (lastArray, currentArray) {
    if (Number(currentArray.join('')) == 0) {
        let returnArray = [];
        returnArray.push('0... -_-');
        return returnArray;
    } else {
        let returnArray = [];
        returnArray.push(Number(lastArray.join('')) / Number(currentArray.join('')));
        return returnArray;
    }
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
    })
})
