let inputBox = document.getElementById('input-box');
let resultDisplay = document.getElementById('result');

// Add a number or symbol to the input box
function appendToInput(value) {
    // Check if the value is "+" and handle it separately
    if (value == "+") {
        // Add the "+" sign to the input box only if it's not already there
        if (inputBox.value && !inputBox.value.includes("+")) {
            inputBox.value += value; // Append "+" to the input box
        }
    } else {
        // For other values (hexadecimal digits), just append to the input box
        inputBox.value += value;
    }
}


// Clear the input box
function clearInput() {
  inputBox.value = "";
  resultDisplay.textContent = "Result: ";
}

// Calculate the result (Hexadecimal addition for simplicity)
function calculateResult() {
  let hexValue = inputBox.value.trim();
  if (hexValue === "") {
    resultDisplay.textContent = "Result: Invalid input";
    return;
  }
  
  try {
    // Convert hex to decimal and add 1 for simplicity
    let decimalValue = parseInt(hexValue, 16);  // Convert to decimal
    if (isNaN(decimalValue)) {
      resultDisplay.textContent = "Result: Invalid Hexadecimal";
      return;
    }
    let result = decimalValue + 1;  // Add 1 for demonstration
    let hexResult = result.toString(16).toUpperCase(); // Convert back to hex
    resultDisplay.textContent = "Result: " + hexResult;
  } catch (error) {
    resultDisplay.textContent = "Result: Error";
  }
}
