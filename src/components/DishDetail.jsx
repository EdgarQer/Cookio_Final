import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DishDetail.css";

import axios from "axios";

export default function DishDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [dish, setDish] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/client/recipes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        setDish(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dish details. Please try again later.");
      }
    };

    fetchDish();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dish-detail">
        <div className="container">
            <h2 className="dish-detail__name">{dish.title}</h2>

            <img
            src={dish.image || "https://via.placeholder.com/150"}
            alt={dish.title}
            className="dish-detail__image"
            />
            <div className="description">
            <h2 className="description__title">Description</h2>
            <p className="description__text">{dish.description}</p>
            </div>


            <div className="ingredients-section">
                <h2 className="ingredients-section__title">Ingredients</h2>
                <ul className="ingredients">
                    {dish.ingredients.map((ingredient, index) => (
                        <li className="ingredients__item" key={index}>
                            {ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>
                    
            <div className="method-section">
                <h2 className="method-section__title">Steps</h2>
                <div className="method">
                    <div className="method__step">{dish.instructions}</div>
                </div>
            </div>

            <div className="back-button-container">
                <button onClick={() => navigate(-1)} className="back-button">
                    Go Back
                </button>
            </div>
        </div>
      
    </div>
  );
}
