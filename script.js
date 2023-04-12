/* Components */
const numericButtons = Array.from(
   document.querySelectorAll(".calculation-buttons > .button.numeric")
);
const operatorButtons = Array.from(
   document.querySelectorAll(".calculation-buttons > .button.operator")
);
const decimal = document.querySelector(
   "#calculation-buttons > button.button.numeric.decimal"
);
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
   decimal.disabled = false;
};

c.onclick = () => {
   //same with ac
   setUpperDisplay(DEFAULT_UPPER_PANEL_VALUE);
   input = ["", "", ""];
   decimal.disabled = false;
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
   decimal.disabled = false;
};

function calculate() {
   if (input[1] === "" && input[2] === "") result = input[0];
   else {
      result = operate(+input[0], input[1], +input[2]);
   }
   setResultDisplay(result);
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
            if (input[0].includes(".")) {
               decimal.disabled = true;
            }
            input[0] += button.textContent;
            setUpperDisplay(input[0]);
         } else {
            if (input[2].includes(".")) {
               decimal.disabled = true;
            }
            input[2] += button.textContent;
            setUpperDisplay(input[0] + " " + input[1] + " " + input[2]);
         }
      })
   );
}

function addOperatorButtonsListener(buttons) {
   buttons.forEach((button) =>
      button.addEventListener("click", () => {
         decimal.disabled = false;
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
   if (num1 % 1 != 0 || num2 % 1 != 0) {
      return (10 * num1 + 10 * num2) / 10;
   }
   return num1 + num2;
}

function subtract(num1, num2) {
   if (num1 % 1 != 0 || num2 % 1 != 0) {
      return (10 * num1 - 10 * num2) / 10;
   }
   return num1 - num2;
}

function multiply(num1, num2) {
   if (num1 % 1 != 0 || num2 % 1 != 0) {
      return (10 * num1 * (10 * num2)) / 100;
   }
   return num1 * num2;
}

function divide(num1, num2) {
   if (num1 % 1 != 0 || num2 % 1 != 0) {
      return (10 * num1) / (10 * num2);
   }
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
