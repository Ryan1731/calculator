// get element
let expressionOutput = document.getElementById("expression-output");
let solutionOutput = document.getElementById("solution-output");
let equalSign = document.getElementById("equal-sign-display");
let allClearBtn = document.getElementById("ac");
let equateBtn = document.getElementById("equate");
let deleteBtn = document.getElementById("delete");

// stage
let stage = {
    expression : "",
    solution : "",
    get firstCharacter() {
        return this.expression.slice(0, 1);
    },
    get lastCharacter() {
        return this.expression.slice(-1);
    },
    replaceLastOperator : function(currentKey) {
        this.expression = `${this.expression.slice(0, this.expression.length-1)}${currentKey}`;
    },
    solutionIsDecimal : function(num) {
        return this.expression % 1 != 0;
    },
}

// add number and operator to output
let keypadArray = document.querySelectorAll(".key");

keypadArray.forEach(function(keypad) {
    keypad.addEventListener("click", () => addToStage(keypad.dataset.key))
});

function addToStage(currentKey) {
    if(stage.expression.length >= 10);
    else if(containsOperator(stage.expression) && containsOperator(currentKey) && stage.lastCharacter === currentKey);
    else if(containsOperator(stage.expression) && containsOperator(currentKey) && stage.lastCharacter !== currentKey && containsOperator(stage.lastCharacter)) {
        stage.replaceLastOperator(currentKey);
        renderExpressionOutput();
    }
    else {
        stage.expression += currentKey;
        renderExpressionOutput();
    }
}

function containsOperator(str) {
    const operators = ["+", "-", "*", "/", "%"];
    for (let i = 0; i < operators.length; i++) {
        if(str.includes(operators[i])) {
            return true;
        }
    }
    return false;
}

// add delete function to delete button
deleteBtn.addEventListener("click", deleteChar);

function deleteChar() {
    console.log('delete character');
    stage.expression = stage.expression.slice(0, stage.expression.length -1);
    renderExpressionOutput();
}

// all clear btn
allClearBtn.addEventListener("click", clearOutput);

function clearOutput() {
    stage.expression = "";
    equalSign.innerText = "";
    solutionOutput.innerText = "";
    expressionOutput.innerText = "0";
    expressionOutput.classList.remove("small");
}

// add calculation function to equate button
equateBtn.addEventListener("click", calculate);

function calculate() {
    try {
        stage.solution = math.evaluate(stage.expression);
        if(stage.solution !== undefined) {
            renderSolutionOutput();
        }
        else if(stage.solutionIsDecimal){
            stage.solution = roundOffDecimal(stage.solution);
        }
    }
    catch(error) {
        syntaxError();
    }
}

let roundOffDecimal = function(num) {
    numStr = num.toString();
    // if the solution is a decimal
    if(stage.solutionIsDecimal()) {
        let [intergerPart, decimalPart] = numStr.split(".");
        if(decimalPart.length > 10) {
            decimalPart.slice(0, -2);
        }
        num = parseFloat(`${intergerPart}.${decimalPart}`);
    }
    return num;
}

function syntaxError() {
    expressionOutput.classList.add("small");
    stage.expression = "SYNTAX ERROR";
    renderExpressionOutput();
    equalSign.innerText = "";
}

// render expression output
function renderExpressionOutput() {
    expressionOutput.innerText = stage.expression;
    if(stage.expression === "") {
        expressionOutput.innerText = "0";
    }
}

// render solution output
function renderSolutionOutput() {
    solutionOutput.innerText = stage.solution;
    equalSign.innerText = "=";
    expressionOutput.classList.add("small");
}




