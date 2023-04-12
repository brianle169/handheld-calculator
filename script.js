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
const DEFAULT_USER_INPUT = "";
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
   //delete one character
   setUpperDisplay(upperPanel.textContent.slice(0, -1));
   userInput = userInput.slice(0, -1);
};

evaluate.onclick = () => calculate();

function calculate() {
   if (input[1] === undefined && input[2] === undefined) result = input[0];
   else {
      result = operate(+input[0], input[1], +input[2]);
   }
   setResultDisplay(result);
   return result;
}

function separateInput(string) {
   let arr = string.split(" ");
   return arr.map((item) => {
      if (arr.indexOf(item) !== 1) return +item; //Convert to number, except operator
      return item;
   });
}

function validInput(string) {
   let arr = string.split(" ");
   if (arr[arr.length - 1] == 0) return false; //last eleement is not a number
   if (arr.length > 3) return false;
   return true;
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
         if (input[1] === "") {
            input[0] += button.textContent;
            upperPanel.textContent = input[0];
         } else {
            input[2] += button.textContent;
            upperPanel.textContent = input[0] + " " + input[1] + " " + input[2];
         }
         console.log(input);
      })
   );
}

function addOperatorButtonsListener(buttons) {
   buttons.forEach((button) =>
      button.addEventListener("click", () => {
         if (!input.includes("")) {
            input[0] = calculate();
            input[2] = "";
            input[1] = button.textContent;
         }
         input[1] = button.textContent;
         upperPanel.textContent = input[0] + " " + input[1] + " ";
         console.log(input);
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

function modulus(num1, num2) {
   return num1 % num2;
}

function power(num, pow) {
   return Math.pow(num, pow);
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

      case "%":
         return modulus(num1, num2);

      case "^":
         return power(num1, num2);
   }
}
