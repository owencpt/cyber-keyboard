class CyberSecurityKeyboard {
  constructor() {
      this.userInputs = [];  // Stores all user inputs
      this.currentInput = "";  // Temporary string to accumulate input until operator is pressed
      this.arithmeticOperations = [];  // Stores arithmetic operations
      this.output = 1;
      this.input = 1;
  }

  // Method to handle input
  captureInput(userInput) {
      this.userInputs.push(userInput);
      this.updateDisplay();
  }

  // Method to evaluate user inputs
  evaluateInput() {
      if (this.userInputs.length === 0) return;

      try {
          // Convert array to string and evaluate expression
          let expression = this.userInputs.join("");
          expression = this.conversion(expression);
          alert(expression)
          let result = eval(expression);  // ⚠️ Be careful with eval (safer alternatives below)

          if (this.output === 2){
            result = '0x' + result.toString(16).toUpperCase();
          }

          this.userInputs = [result]; // Store result in userInputs
          this.updateDisplay();

          
      } catch (error) {
          alert("Invalid Expression!");
          this.clearDisplay();
      }
  }

  conversion(expression){
      return expression.replace(/\b0x[0-9A-Fa-f]+\b/g, (match) => {
        return parseInt(match, 16); // Convert hex to decimal
    });

  }

  // Method to update the display in the HTML
  updateDisplay() {
    const displayElement = document.getElementById("display");

    // If userInputs is empty or just contains a space, show placeholder text
    if (this.userInputs.length === 0 || this.userInputs.join("") === " ") {
        displayElement.innerText = "Enter your input...";
    } else {
        // Join user inputs into a string
        let displayText = this.userInputs.join("");

        // Set the modified string as the inner HTML of the display
        displayElement.innerHTML = displayText;
    }
}

  // Method to clear display 
  clearDisplay() {
      this.userInputs = ["\u00A0"]; // Non-breaking space to prevent collapse
      this.updateDisplay();
  }

  backspace() {
    this.userInputs.pop();
    this.updateDisplay();
}
}

// Create an instance of the class
const keyboard = new CyberSecurityKeyboard();

// Function to handle button clicks (used in onclick)
function handleKeyPress(value) {

  if (value === "=") {
      keyboard.evaluateInput();
      return;
  } else if (value === "CLR") {
      keyboard.clearDisplay();
      return;
  }

  keyboard.captureInput(value);
}

function updateOutputType() {
  const outputTypeDropdown = document.getElementById("output-type");
  keyboard.output = parseInt(outputTypeDropdown.value); 
}


// Listen for keydown events to handle keyboard input
document.addEventListener('keydown', function(event) {
  let key = event.key.toUpperCase(); // Convert to uppercase for uniformity
  
  // Define valid keys for the keyboard (including digits and A-F for hex)
  const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '+', '=', 'CLR'];

  // If the key pressed is valid, simulate a button press
  if (validKeys.includes(key)) {
      handleKeyPress(key);
  }

  // Handle Backspace key
  if (key === 'BACKSPACE') {
    keyboard.backspace();
}
});