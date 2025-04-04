class CyberSecurityKeyboard {
  constructor() {
      this.output = 1; // Output type (1: Decimal, 2: Hex)
      this.displayElement = document.getElementById("display"); // Get the input field
  }

  // Method to evaluate user inputs
  evaluateInput() {
      let expression = this.displayElement.value.trim();
      if (!expression) return;

      try {
          expression = this.conversion(expression); // Convert hex to decimal
          let result = eval(expression); // ⚠️ Be careful with eval (consider safer alternatives)

          if (this.output === 2) {
              result = '0x' + result.toString(16).toUpperCase(); // Convert to hex if needed
          }

          this.displayElement.value = result; // Show result in the input field
      } catch (error) {
          alert("Invalid Expression!");
          this.clearDisplay();
      }
  }

  // Convert hexadecimal numbers (0x...) to decimal
  conversion(expression) {
      return expression.replace(/\b0x[0-9A-Fa-f]+\b/g, match => parseInt(match, 16));
  }

  // Update display
  updateDisplay(value) {
      this.displayElement.value += value; // Append new input to the field
  }

  // Clear display
  clearDisplay() {
      this.displayElement.value = ""; // Clear the input field
  }

  // Handle backspace
  backspace() {
      this.displayElement.value = this.displayElement.value.slice(0, -1);
  }
}

// Create an instance of the class
const keyboard = new CyberSecurityKeyboard();

// Handle button clicks
function handleKeyPress(value) {
  if (value === "=") {
      keyboard.evaluateInput();
  } else if (value === "CLR") {
      keyboard.clearDisplay();
  } else {
      keyboard.updateDisplay(value);
  }
}

// Change output type (Decimal/Hex)
function updateOutputType() {
  const outputTypeDropdown = document.getElementById("output-type");
  keyboard.output = parseInt(outputTypeDropdown.value);
}

// Listen for keydown events
document.addEventListener('keydown', function(event) {
  const key = event.key;

  // Allow numeric, operators, and backspace
  if (/[\d+\-*/().=]/.test(key)) {
      handleKeyPress(key);
  } else if (key === 'Backspace') {
      event.preventDefault();  // Prevent default backspace behavior

      keyboard.backspace();
  } else if (key === 'Enter') {
      keyboard.evaluateInput();
  }
});


function adjustDisplayWidth() {
  let display = document.getElementById("display");
  let textLength = display.value.length;

  // Calculate new width: Expand when text is too long
  if (textLength > 15) {
      display.style.width = "90vw"; // Expand if text exceeds a threshold
  } else {
      display.style.width = "50vw"; // Keep it at half the screen initially
  }
}

// Attach event listener to resize dynamically
document.getElementById("display").addEventListener("input", adjustDisplayWidth);
