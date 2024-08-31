// Example JavaScript for a Recipe Sharing and Meal Planning Website

// Mock data for recipes (in a real application, this would come from a database)
const recipes = [
    {
        id: 1,
        title: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
        image: '11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg',
        ingredients: ['Spaghetti', 'Eggs', 'Cheese', 'Pancetta', 'Pepper'],
        instructions: 'Boil pasta, cook pancetta, mix with eggs and cheese, combine.',
    },
    {
        id: 2,
        title: 'Vegan Buddha Bowl',
        description: 'A wholesome bowl of quinoa, roasted vegetables, and a tahini dressing.',
        image: 'veganbuddhabowl-2.jpg',
        ingredients: ['Quinoa', 'Sweet Potato', 'Chickpeas', 'Kale', 'Tahini'],
        instructions: 'Roast vegetables, cook quinoa, prepare dressing, combine all ingredients.',
    },
    {
        id: 3,
        title: 'Chicken Curry',
        description: 'A flavorful curry with tender chicken, coconut milk, and spices.',
        image: 'Thai-Chicken-Red-Curry_square-4532.jpg',
        ingredients: ['Chicken', 'Coconut Milk', 'Tomatoes', 'Onion', 'Curry Powder'],
        instructions: 'Cook chicken, add spices, simmer with coconut milk and tomatoes.',
    }
];

// Function to display recipes
function displayRecipes() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content
    const recipeSection = document.createElement('section');
    recipeSection.id = 'recipes';
    recipeSection.innerHTML = `<h2>Latest Recipes</h2>`;

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
        `;
        recipeSection.appendChild(recipeCard);
    });

    app.appendChild(recipeSection);
}

// Function to display a single recipe
function viewRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    const app = document.getElementById('app');
    app.innerHTML = `
        <section id="recipe-details">
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>Ingredients:</h3>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <h3>Instructions:</h3>
            <p>${recipe.instructions}</p>
            <button onclick="displayRecipes()">Back to Recipes</button>
        </section>
    `;
}

// Function to handle meal planning
function displayMealPlanning() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section id="meal-planning">
            <h2>Meal Planning Tools</h2>
            <p>Select recipes to add to your meal plan:</p>
            <ul id="meal-plan-recipes">
                ${recipes.map(recipe => `<li><input type="checkbox" id="recipe-${recipe.id}" name="recipe" value="${recipe.id}"> ${recipe.title}</li>`).join('')}
            </ul>
            <button onclick="generateGroceryList()">Generate Grocery List</button>
            <div id="grocery-list"></div>
        </section>
    `;
}

// Function to generate a grocery list
function generateGroceryList() {
    const selectedRecipes = Array.from(document.querySelectorAll('input[name="recipe"]:checked')).map(input => parseInt(input.value));
    const ingredients = selectedRecipes.flatMap(recipeId => recipes.find(r => r.id === recipeId).ingredients);
    const uniqueIngredients = [...new Set(ingredients)];

    const groceryListDiv = document.getElementById('grocery-list');
    groceryListDiv.innerHTML = `
        <h3>Grocery List:</h3>
        <ul>${uniqueIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
    `;
}

// Function to initialize the app
function initApp() {
    displayRecipes(); // Display the recipes by default
}

// Initialize the app on page load
window.onload = initApp;
