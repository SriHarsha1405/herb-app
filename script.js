const ingredients = [
    {
      name: "Gynostemma",
      emoji: "🌿",
      effect: "Fight Fatigue",
      description: "Gynostemma helps combat fatigue and supports energy metabolism."
    },
    {
      name: "Lion’s Mane",
      emoji: "🧠",
      effect: "Memory",
      description: "Lion’s Mane supports brain function and improves memory."
    },
    {
      name: "Shilajit",
      emoji: "🔥",
      effect: "Power",
      description: "Shilajit boosts strength, stamina, and vitality."
    },
    {
      name: "Cordyceps",
      emoji: "🌾",
      effect: "Energy",
      description: "Cordyceps improve endurance and ATP production."
    },
    {
      name: "Reishi",
      emoji: "🍄",
      effect: "Calm",
      description: "Reishi promotes relaxation, stress reduction, and better sleep."
    },
    {
      name: "Astragalus",
      emoji: "🌿",
      effect: "Immunity",
      description: "Astragalus boosts immune function and overall wellness."
    }
  ];
  
  let selectedForComparison = [];
  
  // Function to render ingredients based on search filter
  function renderIngredients(filteredIngredients) {
    const ingredientList = document.getElementById('ingredientList');
    ingredientList.innerHTML = "";
    filteredIngredients.forEach(ing => {
      const card = document.createElement('div');
      card.className = "card";
      card.innerHTML = `
        <div class="emoji">${ing.emoji}</div>
        <h3>${ing.name}</h3>
        <p>${ing.effect}</p>
        <label>
          <input type="checkbox" class="ingredient-checkbox" data-name="${ing.name}" data-effect="${ing.effect}" data-description="${ing.description}">
          Add to Stack
        </label>
        <label>
          <input type="checkbox" class="compare-checkbox" data-ingredient='${JSON.stringify(ing)}'>
          Compare
        </label>
      `;
      ingredientList.appendChild(card);
    });
  
    // Add event listeners for checkboxes
    document.querySelectorAll('.ingredient-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });
  
    document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', handleCompareCheckboxChange);
    });
  }
  
  // Handle ingredient selection for wellness stack
  function handleCheckboxChange(event) {
    const ingredient = {
      name: event.target.dataset.name,
      effect: event.target.dataset.effect,
      description: event.target.dataset.description
    };
  
    if (event.target.checked) {
      addToWellnessStack(ingredient);
    } else {
      removeFromWellnessStack(ingredient);
    }
  }
  
  // Function to add ingredient to wellness stack
  function addToWellnessStack(ingredient) {
    const stack = document.getElementById('selectedIngredients');
    const stackItem = document.createElement('div');
    stackItem.className = 'stack-item';
    stackItem.innerHTML = `
      <h4>${ingredient.name} ${ingredient.emoji}</h4>
      <p><strong>Effect:</strong> ${ingredient.effect}</p>
      <p><strong>Description:</strong> ${ingredient.description}</p>
    `;
    stack.appendChild(stackItem);
  }
  
  // Function to remove ingredient from wellness stack
  function removeFromWellnessStack(ingredient) {
    const stack = document.getElementById('selectedIngredients');
    const items = stack.querySelectorAll('.stack-item');
    items.forEach(item => {
      if (item.querySelector('h4').textContent.includes(ingredient.name)) {
        stack.removeChild(item);
      }
    });
  }
  
  // Clear the wellness stack
  document.getElementById('clearStack').addEventListener('click', () => {
    document.getElementById('selectedIngredients').innerHTML = '';
    const checkboxes = document.querySelectorAll('.ingredient-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = false);
  });
  
  // Handle compare checkbox selection
  function handleCompareCheckboxChange(event) {
    const ingredient = JSON.parse(event.target.getAttribute('data-ingredient'));
  
    if (event.target.checked) {
      if (selectedForComparison.length < 3) {
        selectedForComparison.push(ingredient);
      }
    } else {
      selectedForComparison = selectedForComparison.filter(item => item.name !== ingredient.name);
    }
  }
  
  // Render comparison results
  function renderComparison() {
    const comparisonResult = document.getElementById('comparisonResult');
    comparisonResult.innerHTML = "";
  
    if (selectedForComparison.length < 2) {
      comparisonResult.innerHTML = "<p>Please select at least 2 ingredients to compare.</p>";
      return;
    }
  
    selectedForComparison.forEach(ing => {
      const card = document.createElement('div');
      card.className = "comparison-card";
      card.innerHTML = `
        <div class="emoji">${ing.emoji}</div>
        <h3>${ing.name}</h3>
        <p><strong>Effect:</strong> ${ing.effect}</p>
        <p><strong>Description:</strong> ${ing.description}</p>
      `;
      comparisonResult.appendChild(card);
    });
  }
  
  // Handle the compare button click
  document.getElementById("compareBtn").addEventListener("click", function () {
    if (selectedForComparison.length < 2) {
      alert("Please select at least 2 ingredients to compare.");
      return;
    }
    renderComparison();
  });
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const filteredIngredients = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery) || ingredient.effect.toLowerCase().includes(searchQuery)
    );
    renderIngredients(filteredIngredients);
  });
  
  // Initial rendering
  renderIngredients(ingredients);

  