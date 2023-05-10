document.addEventListener('DOMContentLoaded', () => {
    // Retrieve HTML elements
    const personTableBody = document.getElementById('person-table-body');
    const addPersonForm = document.getElementById('add-person-form');
    const resetButton = document.getElementById('reset-button');
    const mealRateText = document.getElementById('meal-rate-text');
  
    // Initialize variables
    let persons = [];
  
    // Event listener for adding a person
    addPersonForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const personName = document.getElementById('person-name').value;
      const personMeal = parseFloat(document.getElementById('person-meal').value);
      const personDeposit = parseFloat(document.getElementById('person-deposit').value);
  
      const person = {
        name: personName,
        meal: personMeal,
        deposit: personDeposit,
        cost: 0,
        refundLoan: 0,
      };
  
      persons.push(person);
      updatePersonTable();
      calculateMealRate();
      addPersonForm.reset();
    });
  
    // Event listener for resetting all data
    resetButton.addEventListener('click', () => {
      persons = [];
      updatePersonTable();
      calculateMealRate();
    });
  
    // Update the person table with the latest data
    function updatePersonTable() {
      personTableBody.innerHTML = '';
      persons.forEach((person, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${person.name}</td>
          <td>${person.meal}</td>
          <td>${person.deposit}</td>
          <td>${person.cost}</td>
          <td>${person.refundLoan}</td>
          <td><button onclick="window.removePerson(${index})">Remove</button></td>
        `;
        personTableBody.appendChild(row);
      });
    }
  
    // Remove a person from the table
    window.removePerson = function(index) {
      persons.splice(index, 1);
      updatePersonTable();
      calculateMealRate();
    };
  
    // Calculate and display the meal rate, cost, and refund/loan
    function calculateMealRate() {
      const totalMeal = getTotalMeal();
      const totalDeposit = getTotalDeposit();
      const mealRate = totalMeal === 0 ? 0 : (totalDeposit / totalMeal).toFixed(2);
      mealRateText.textContent = `Meal rate: ${mealRate} TK/meal \n Total Meal: ${totalMeal} \n Total Cost: ${totalDeposit} TK`;
  
      persons.forEach((person) => {
        const personCost = (person.meal * mealRate).toFixed(2);
        const refundLoan = person.deposit - personCost;
        person.cost = personCost;
        person.refundLoan = refundLoan.toFixed(2);
      });
  
      updatePersonTable();
    }
  
    // Calculate the total meal for all persons
    function getTotalMeal() {
      let totalMeal = 0;
      persons.forEach((person) => {
        totalMeal += person.meal;
      });
      return totalMeal;
    }
  
    // Calculate the total deposit for all persons
    function getTotalDeposit() {
      let totalDeposit = 0;
      persons.forEach((person) => {
        totalDeposit += person.deposit;
      });
      return totalDeposit;
    }
  });
  