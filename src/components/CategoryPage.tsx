import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryPage.css";
import DishTile from "./DishTile";
import { Dish } from "./Dish";

const token = localStorage.getItem("jwtToken");

const staticCategories = [
  "Main Course",
  "Appetizer",
  "Soup",
  "Dessert",
  "Salad",
  "Breakfast",
  "Snack",
  "Beverage",
  "Sauce",
  "Side Dish",
];

function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Any");
  const [selectedType, setSelectedType] = useState<string>("Any");
  const [selectedIngredients, setSelectedIngredients] = useState<string>("Any");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("Any");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cuisines, setCuisines] = useState<{ id: number; name: string }[]>([]);
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [ingredients, setIngredients] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const recipesResponse = await axios.get<Dish[]>("http://localhost:8080/api/client/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDishes(recipesResponse.data);

        const cuisineResponse = await axios.get("http://localhost:8080/api/client/cuisines", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCuisines(cuisineResponse.data);

        const typeResponse = await axios.get("http://localhost:8080/api/client/types", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTypes(typeResponse.data);

        const ingredientsResponse = await axios.get("http://localhost:8080/api/client/ingredients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIngredients(ingredientsResponse.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to fetch initial data. Please try again later.");
      }
    };

    fetchInitialData();
  }, []);

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setter(e.target.value);
  };

  const fetchFilteredDishes = async () => {
    try {
      let allDishes: Dish[] = [];

      if (
        selectedCategory === "Any" &&
        selectedType === "Any" &&
        selectedIngredients === "Any" &&
        selectedCuisine === "Any"
      ) {
        const response = await axios.get<Dish[]>("http://localhost:8080/api/client/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDishes(response.data);
        return;
      }

      if (selectedCategory !== "Any") {
        const categoryResponse = await axios.get<Dish[]>(
          `http://localhost:8080/api/client/recipes/search/category?category=${selectedCategory}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        allDishes = categoryResponse.data;
      }

      if (selectedType !== "Any") {
        const typeResponse = await axios.get<Dish[]>(
          `http://localhost:8080/api/client/recipes/search/type/${selectedType}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        allDishes = allDishes.length > 0
          ? allDishes.filter((dish) =>
              typeResponse.data.some((typeDish) => typeDish.id === dish.id)
            )
          : typeResponse.data;
      }

      if (selectedCuisine !== "Any") {
        const cuisineResponse = await axios.get<Dish[]>(
          `http://localhost:8080/api/client/recipes/search/cuisine/${selectedCuisine}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        allDishes = allDishes.length > 0
          ? allDishes.filter((dish) =>
              cuisineResponse.data.some((cuisineDish) => cuisineDish.id === dish.id)
            )
          : cuisineResponse.data;
      }

      if (selectedIngredients !== "Any") {
        const ingredientsResponse = await axios.get<Dish[]>(
          `http://localhost:8080/api/client/recipes/search/ingredients/${selectedIngredients}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        allDishes = allDishes.length > 0
          ? allDishes.filter((dish) =>
              ingredientsResponse.data.some((ingredientDish) => ingredientDish.id === dish.id)
            )
          : ingredientsResponse.data;
      }

      setDishes(allDishes);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again later.");
    }
  };

  return (
    <div className="category-page">
      <h1 className="category-title">A diverse list of categories just for you</h1>
      <div className="filters">
        <select
          value={selectedCategory}
          onChange={handleFilterChange(setSelectedCategory)}
        >
          <option value="Any">Any</option>
          {staticCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
        <select
          value={selectedIngredients}
          onChange={handleFilterChange(setSelectedIngredients)}
        >
          <option value="Any">Any</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
        <select
          value={selectedCuisine}
          onChange={handleFilterChange(setSelectedCuisine)}
        >
          <option value="Any">Any</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine.id} value={cuisine.id}>
              {cuisine.name}
            </option>
          ))}
        </select>
        <button className="filter-button" onClick={fetchFilteredDishes}>
          Select a recipe
        </button>
      </div>
      <div className="recipe-list">
        {error && <p className="error-message">{error}</p>}
        {dishes.length === 0 && !error && (
          <p className="no-recipes-message">No recipes found matching your filters.</p>
        )}
        {dishes.map((dish) => (
          <DishTile
            key={dish.id}
            id={dish.id}
            image={dish.image}
            name={dish.title}
            description={dish.description}
            time={`${dish.prepTime + dish.cookTime} mins`}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
