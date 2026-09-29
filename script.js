 const currentValueElement = document.getElementById("currentValue");
 const previousValueElement = document.getElementById("previousValue");

 let currentValue = "";
 let previousValue = "";
 let operator = null;

 function updateDisplay(){
      currentValueElement.textContent = currentValue || "0";
      previousValueElement.textContent = previousValue && operator ? `${previousValue} ${operator}` : "";
 }

//  NUmber
function addNumber(number){
      if(number === "0" && currentValue === "0"){
            return;
      }
      currentValue += number;
      updateDisplay();
}

// Decimal
function addDecimal(){
      if(currentValue.includes(".")){
            return;
      }
      currentValue = currentValue == "" ? "0." : currentValue + ".";
      updateDisplay();
}

// Operator
function chooseOperator(selectedOperator){
      if(currentValue === ""){
            return;
      }
      if(previousValue !== ""){
            calculate();
      }

      previousValue = currentValue;
      currentValue = "";
      operator = selectedOperator;
      updateDisplay();
}

// Calculate
function calculate(){
      if(previousValue === "" ||currentValue === "" || operator === null){
            return;
      }
      const firstNumber = parseFloat(previousValue);
      const secondNumber = parseFloat(currentValue);
      let result;

      switch(operator){
            case "+":
                  result = firstNumber + secondNumber;
                  break;

            case "-":
                  result = firstNumber - secondNumber;
                  break;

            case "*":
                  result = firstNumber * secondNumber;
                  break;

            case "/":
                  if(secondNumber ===0){
                        currentValue = "Error";
                        previousValue = "";
                        operator = null;
                        updateDisplay();
                        return;
                  }
                  result = firstNumber / secondNumber;
                  break;
      }

      currentValue = Number(result.toFixed(10)).toString();

      previousValue = "";
      operator = null;
      updateDisplay();
}

// Clear
function clearCalculator(){
      currentValue = "";
      previousValue = "";
      operator = null;
      updateDisplay();
}

// Positive /Negative
function changeSign(){
      if(currentValue === ""){
            return;
      }
      currentValue = currentValue.startsWith("-") ? currentValue.slice(1) : "-" + currentValue;
      updateDisplay();
}

// Percentage
function Percentage(){
      if(currentValue === ""){
            return;
      }
      currentValue = (parseFloat(currentValue) / 100).toString();
      updateDisplay();
}

// Buttons Working....
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

numberButtons.forEach(button => {
      button.addEventListener("click", () => {
            addNumber(button.dataset.number);
      });
});

operatorButtons.forEach(button => {
      button.addEventListener("click", () => {
            chooseOperator(button.dataset.operator);
      });
});

actionButtons.forEach(button => {
      button.addEventListener("click", () => {
            const action = button.dataset.action;
            if(action === "clear"){
                  clearCalculator();
            }
            else if(action === "decimal"){
                  addDecimal();
            }
            else if(action === "calculate"){
                  calculate();
            }
            else if(action === "sign"){
                  changeSign();
            }
            else if(action === "percent"){
                  Percentage();
            }
      });
}) ;