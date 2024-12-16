import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [servings, setServings] = useState<string>("");
  const [category, setCategory] = useState<string>("Main Course");
  const [ingredients, setIngredients] = useState<number[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<any[]>([]);
  const [typeId, setTypeId] = useState<number>(0);
  const [typeOptions, setTypeOptions] = useState<any[]>([]);
  const [cuisineId, setCuisineId] = useState<number>(0);
  const [cuisineOptions, setCuisineOptions] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // Получение токена из LocalStorage
  const token = localStorage.getItem("jwtToken");
  const [authorId, setAuthorId] = useState<number | null>(null);

  // Извлечение authorId из токена
  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setAuthorId(decoded.sub); // Предполагаем, что ID юзера хранится в `sub`
    }
  }, [token]);

  // Загрузка опций для ингредиентов, типов и кухни
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ingredientsRes, typesRes, cuisinesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/client/ingredients", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/client/types", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/client/cuisines", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setIngredientOptions(ingredientsRes.data);
        setTypeOptions(typesRes.data);
        setCuisineOptions(cuisinesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load options. Please try again.");
      }
    };

    if (token) fetchData();
  }, [token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleIngredientSelection = (ingredientId: number) => {
    setIngredients((prev) =>
      prev.includes(ingredientId) ? prev.filter((id) => id !== ingredientId) : [...prev, ingredientId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !authorId) {
      setMessage("You must be logged in to add a recipe.");
      return;
    }

    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructions', instructions);
        formData.append('prepTime', prepTime);
        formData.append('cookTime', cookTime);
        formData.append('servings', servings);
        formData.append('category', category);
        formData.append('ingredients', JSON.stringify(ingredients.map(id => ({ id }))));
        formData.append('author', JSON.stringify({ id: authorId }));
        formData.append('type', JSON.stringify({ id: typeId }));
        formData.append('cuisine', JSON.stringify({ id: cuisineId }));
        
        if (image) {
          formData.append('image', image);
        }
  
        const response = await axios.post(
          `http://localhost:8080/api/admin/recipes/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        setMessage("Recipe added successfully!");
        navigate(`/dish/${response.data.id}`);
      } catch (error: any) {
        console.error("Error adding recipe:", error);
        setMessage(
          error.response?.data?.message || "Failed to add recipe. Please check your input."
        );
      }
    };
  

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="image-upload">
          Recipe Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Recipe preview" className="image-preview" />
          )}
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Instructions:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </label>
        <label>
          Prep Time (minutes):
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </label>
        <label>
          Cook Time (minutes):
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </label>
        <label>
          Servings:
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
          </select>
        </label>
        <label>
          Type:
          <select
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            {typeOptions.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Cuisine:
          <select
            value={cuisineId}
            onChange={(e) => setCuisineId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Select Cuisine
            </option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </label>
        <label>
            Ingredients:
            <div className="ingredients-list">
                {ingredientOptions.map((ingredient) => (
                <div key={ingredient.id} className="ingredient-item">
                    <input
                    type="checkbox"
                    checked={ingredients.includes(ingredient.id)}
                    onChange={() => handleIngredientSelection(ingredient.id)}
                    />
                    {ingredient.name}
                </div>
                ))}
            </div>
        </label>
        {message && <p className={message.includes("Failed") ? "error" : ""}>{message}</p>}
        <button type="submit">Add Recipe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRecipe;
