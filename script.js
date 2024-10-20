const display = document.getElementById("result");
let currentInput = ""; 
let previousInput = ""; 
let operation = null; 
let resetDisplay = false; 


function updateDisplay() {
    display.textContent = currentInput || "0";
}


function handleNumberClick(value) {
    if (resetDisplay) {
        currentInput = value; 
        resetDisplay = false; 
    } else {
        currentInput += value; 
    }
    updateDisplay();
}

function handleOperatorClick(operator) {
    if (previousInput === "") {
        previousInput = currentInput; 
    } else if (operation) {
        calculate(); 
        previousInput = currentInput; 
    }
    operation = operator;
    currentInput += operator; 
    resetDisplay = false; 
    updateDisplay();
}


function calculate() {
    if (!operation) return; 

  
    const expression = currentInput.split(operation);
    const prev = parseFloat(expression[0]);
    const curr = parseFloat(expression[1]);

    if (isNaN(prev) || isNaN(curr)) return; 

    let result;
    switch (operation) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "×":
            result = prev * curr;
            break;
        case "÷":
            result = prev / curr;
            break;
        case "%":
            result = (prev * curr)/100;
            break;
        default:
            return;
    }

   
    if (String(result).length > 11) {
        result = result.toPrecision(11); 
    }

    currentInput = String(result); 
    operation = null; 
    previousInput = ""; 
    resetDisplay = true; 
    updateDisplay();
}



function clearAll() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateDisplay();
}


function clearEntry() {
    currentInput = currentInput.slice(0, -1); 
    if (currentInput === "") {
        currentInput = ""; 
    }
    updateDisplay();
}


document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => handleNumberClick(button.textContent));
});

document.getElementById("add").addEventListener("click", () => handleOperatorClick("+"));
document.getElementById("subtract").addEventListener("click", () => handleOperatorClick("-"));
document.getElementById("multiply").addEventListener("click", () => handleOperatorClick("×"));
document.getElementById("divide").addEventListener("click", () => handleOperatorClick("÷"));
document.getElementById("percentage").addEventListener("click", () => handleOperatorClick("%"));
document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clearAll").addEventListener("click", clearAll);
document.getElementById("clearEntry").addEventListener("click", clearEntry);
document.getElementById("decimal").addEventListener("click", () => handleNumberClick("."));
