import React from 'react';
import { Link } from 'react-router-dom';
import './DishTile.css';
import BakingRecipes from '../assets/heart-icon.svg';
import Clock from '../assets/clock-icon.svg';
// eslint-disable-next-line react/prop-types
const DishTile = ({ id, image, name, description, time }) => {
    return (
        <Link to={`/dish/${id}`} className="dish-tile">
            <img src={image} alt={name} className="dish-tile__image" />
            <div className="dish-tile__content">
                <div className="dish-tile__header">
                    <h3 className="dish-tile__name">{name}</h3>
                    <img
                        src={BakingRecipes}
                        alt="Heart Icon"
                        className="dish-tile__heart-icon"
                        onClick={(e) => {
                            e.preventDefault(); // Prevents navigation
                            console.log(`${name} added to favorites.`);
                        }}
                    />
                </div>
                <p className="dish-tile__description">{description}</p>
                <div className="dish-tile__footer">
                    <div className="dish-tile__time">
                        <img src={Clock} alt="Clock Icon" className="dish-tile__clock-icon" />
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DishTile;
