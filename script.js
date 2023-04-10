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

function operate(ops, num1, num2) {
   switch (ops) {
      case "+":
         add(num1, num2);
         break;
      case "-":
         subtract(num1, num2);
         break;
      case "*":
         multiply(num1, num2);
         break;
      case "/":
         divide(num1, num2);
         break;
      case "%":
         modulus(num1, num2);
         break;
      case "^":
         power(num1, num2);
         break;
   }
}

function processDivInjectedByLiveServer() {
   //    const htmlBody = document.querySelector("body");
   const divByLiveServer = document.querySelector("div");
   divByLiveServer.remove();
}
