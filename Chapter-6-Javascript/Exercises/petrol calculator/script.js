document.getElementById('calculate-btn').addEventListener('click', function() {
    // Get input values
    const costPerLiter = parseFloat(document.getElementById('cost-per-liter').value);
    const litersPurchased = parseFloat(document.getElementById('liters-purchased').value);
  
    // Calculate total cost
    const totalCost = costPerLiter * litersPurchased;
  
    // Display total cost
    document.getElementById('total-cost').textContent = `Total Cost: $${totalCost.toFixed(2)}`;
  });
  