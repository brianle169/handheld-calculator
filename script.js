/* Components */
const numericButtons = Array.from(
   document.querySelectorAll(".calculation-buttons > .button.numeric")
);
const operatorButtons = Array.from(
   document.querySelectorAll(".calculation-buttons > .button.operator")
);
const displayPanel = document.getElementById("display-panel");
const upperPanel = document.getElementById("upper-panel");
const lowerPanel = document.getElementById("lower-panel");
const ac = document.getElementById("clear-all");
const c = document.getElementById("clear-input");
const del = document.getElementById("delete");
const evaluate = document.getElementById("evaluate"); //equals sign

/* Variables */
let userInput = "";
let input = [, ,];
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
   userInput = DEFAULT_USER_INPUT;
   result = DEFAULT_RESULT;
};

c.onclick = () => {
   //same with ac
   setUpperDisplay(DEFAULT_UPPER_PANEL_VALUE);
   userInput = DEFAULT_USER_INPUT;
};

del.onclick = () => {
   //delete one character
   setUpperDisplay(upperPanel.textContent.slice(0, -1));
   userInput = userInput.slice(0, -1);
};

evaluate.onclick = () => calculate();

function calculate() {
   if (validInput(upperPanel.textContent)) {
      let [num1, ops, num2] = separateInput(userInput);
      if (ops === undefined && num2 === undefined) result = num1;
      else {
         result = operate(num1, ops, num2);
      }
      setResultDisplay(result);
      userInput = result;
   }
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
         upperPanel.textContent += button.textContent;
         userInput += button.textContent;
         console.log(userInput);
      })
   );
}

function addOperatorButtonsListener(buttons) {
   buttons.forEach((button) =>
      button.addEventListener("click", () => {
         calculate();
         setUpperDisplay(userInput); //get result & display upper + lower
         upperPanel.textContent += ` ${button.textContent} `;
         userInput += ` ${button.textContent} `;
         console.log(userInput);
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
