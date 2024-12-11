function calculateBMI() {
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const gender = document.getElementById('gender').value;
  
    // Validation
    if (age < 1 || weight < 1 || height < 1) {
      alert("Please enter valid values for age, weight, and height.");
      return;
    }
  
    // BMI Calculation
    const bmi = weight / ((height / 100) * (height / 100));
    const interpretation = interpretBMI(bmi);
  
    document.getElementById('result').innerHTML = bmi.toFixed(2);
    document.getElementById('interpretation').innerHTML = interpretation;
  
  // Set timeout to ask user for next steps
  setTimeout(() => {
    const userChoice = confirm("Do you want to restart the BMI calculation?");
    if (userChoice) {
      // Refresh the page
      location.reload();
    } else {
      // Ask if the user wants to close the page
      const closePage = confirm("Do you want to close this page?");
      if (closePage) {
        window.close();
      }
    }
  }, 3000); // 5 seconds delay
  }
  
  function interpretBMI(bmi) {
    let category;
  
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
  
    return `${category}`;
  }
  