// lib/dailyrecipes.js
export async function getTopRecipes() {
  const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
  const recipes = new Map();
  const maxAttempts = 15;
  let attempts = 0;

  console.log("Starting to fetch 5 unique recipes...");

  while (recipes.size < 5 && attempts < maxAttempts) {
    try {
      // Add a unique timestamp to bust any caching
      const uniqueUrl = `${API_URL}?t=${Date.now()}`;
      const response = await fetch(uniqueUrl, {
        cache: 'no-store', // Still disable Next.js caching
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const meal = data.meals[0];

      if (!recipes.has(meal.idMeal)) {
        recipes.set(meal.idMeal, meal);
        console.log(`Added recipe ${recipes.size}: ${meal.strMeal} (ID: ${meal.idMeal})`);
      } else {
        console.log(`Duplicate skipped: ${meal.strMeal} (ID: ${meal.idMeal})`);
      }

      attempts++;
    } catch (error) {
      console.error(`Attempt ${attempts + 1} failed:`, error.message);
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay between retries
    }
  }

  const recipeArray = Array.from(recipes.values());
  console.log(`Final count: ${recipeArray.length} unique recipes`, recipeArray.map(r => r.strMeal));

  if (recipeArray.length < 5) {
    console.warn(`Only fetched ${recipeArray.length} unique recipes after ${attempts} attempts`);
  }

  return recipeArray;
}