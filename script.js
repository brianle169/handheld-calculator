/* Components */
const buttons = Array.from(
   document.querySelectorAll(
      ".calculation-buttons > .button.numeric, .calculation-buttons > .button.operator"
   )
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
let result = 0.0;

/* DEFAULT VALUES */
const DEFAULT_UPPER_PANEL_VALUE = "";
const DEFAULT_LOWER_PANEL_VALUE = "";
const DEFAULT_USER_INPUT = "";
const DEFAULT_RESULT = 0.0;

/* Functions */

ac.onclick = () => {
   //set upper-panel to default values onclick
   upperPanel.textContent = DEFAULT_UPPER_PANEL_VALUE;
   lowerPanel.textContent = DEFAULT_LOWER_PANEL_VALUE;
   userInput = DEFAULT_USER_INPUT;
   result = DEFAULT_RESULT;
};

c.onclick = () => {
   //same with ac
   upperPanel.textContent = DEFAULT_UPPER_PANEL_VALUE;
   userInput = DEFAULT_USER_INPUT;
};

del.onclick = () => {
   //delete one character
   upperPanel.textContent = upperPanel.textContent.slice(0, -1);
   userInput = userInput.slice(0, -1);
};

evaluate.onclick = () => {
   if (validInput(userInput)) {
      let [num1, ops, num2] = separateInput(userInput);
      if (ops === undefined && num2 === undefined) result = num1;
      else {
         result = operate(num1, ops, num2);
      }
      lowerPanel.textContent = result;
   } else lowerPanel.textContent = "Error";
};

function separateInput(string) {
   let arr = string.split(" ");
   return arr.map((item) => {
      if (arr.indexOf(item) !== 1) return +item; //Convert to number, except operator
      return item;
   });
}

function validInput(string) {
   let arr = string.split(" ");
   if (isNaN(arr[arr.length - 1])) return false; //last eleement is not a number
   if (arr.length > 3) return false;
   return true;
}

function addAllButtonsListener(buttons) {
   buttons.forEach((button) =>
      button.addEventListener("click", () => {
         if (button.classList.contains("operator")) {
            upperPanel.textContent += ` ${button.textContent} `;
            userInput += ` ${button.textContent} `;
            return;
         }
         upperPanel.textContent += button.textContent;
         userInput += button.textContent;

         console.log(userInput);
      })
   );
}
addAllButtonsListener(buttons);

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
