/* Components */
const numericButtons = Array.from(
   document.querySelectorAll(".calculation-buttons > .button.numeric")
);
const operatorButtons = Array.from(
   document.querySelectorAll(".calculation-buttons > .button.operator")
);
const decimalButton = document.getElementsByClassName("decimal");
const displayPanel = document.getElementById("display-panel");
const upperPanel = document.getElementById("upper-panel");
const lowerPanel = document.getElementById("lower-panel");
const ac = document.getElementById("clear-all");
const c = document.getElementById("clear-input");
const del = document.getElementById("delete");
const evaluate = document.getElementById("evaluate"); //equals sign

/* Variables */
let input = ["", "", ""];
let result = null;

/* DEFAULT VALUES */
const DEFAULT_UPPER_PANEL_VALUE = "";
const DEFAULT_LOWER_PANEL_VALUE = "";
const DEFAULT_INPUT = ["", "", ""];
const DEFAULT_RESULT = null;

/* Functions */

ac.onclick = () => {
   //set upper-panel to default values onclick
   setUpperDisplay(DEFAULT_UPPER_PANEL_VALUE);
   setResultDisplay(DEFAULT_LOWER_PANEL_VALUE);
   input = ["", "", ""];
   result = DEFAULT_RESULT;
};

c.onclick = () => {
   //same with ac
   setUpperDisplay(DEFAULT_UPPER_PANEL_VALUE);
   input = ["", "", ""];
};

del.onclick = () => {
   let currentDisplay = input.join(" ");
   currentDisplay = currentDisplay.slice(0, -1);
   setUpperDisplay(currentDisplay);
   input = currentDisplay.split(" ");
};

evaluate.onclick = () => {
   calculate();
   input = ["", "", ""];
};

function calculate() {
   if (input[1] === "" && input[2] === "") result = input[0];
   else {
      result = operate(+input[0], input[1], +input[2]);
   }
   setResultDisplay(result);
   return result;
}

function setUpperDisplay(content) {
   upperPanel.textContent = content;
}

function setResultDisplay(content) {
   lowerPanel.textContent = content;
}

function addNumericButtonsListener(buttons) {
   buttons.forEach((button) =>
      button.addEventListener("click", () => {
         //If no operator is chosen
         if (input.length === 1 || input[1] === "") {
            input[0] += button.textContent;
            setUpperDisplay(input[0]);
         } else {
            input[2] += button.textContent;
            setUpperDisplay(input[0] + " " + input[1] + " " + input[2]);
         }
      })
   );
}

function addOperatorButtonsListener(buttons) {
   buttons.forEach((button) =>
      button.addEventListener("click", () => {
         if (!input.includes("")) {
            calculate();
            input[0] = result;
            input[2] = "";
            input[1] = button.textContent;
         } else if (input[0] === "" && result !== null) {
            input[0] = result;
         }
         input[1] = button.textContent;
         setUpperDisplay(input[0] + " " + input[1] + " ");
      })
   );
}

addNumericButtonsListener(numericButtons);
addOperatorButtonsListener(operatorButtons);

function add(num1, num2) {
   return num1 + num2;
}

function subtract(num1, num2) {
   return num1 - num2;
}

function multiply(num1, num2) {
   return num1 * num2;
}

function divide(num1, num2) {
   return num1 / num2;
}

function operate(num1, ops, num2) {
   switch (ops) {
      case "+":
         return add(num1, num2);

      case "-":
         return subtract(num1, num2);

      case "×":
         return multiply(num1, num2);

      case "÷":
         return divide(num1, num2);
   }
}
