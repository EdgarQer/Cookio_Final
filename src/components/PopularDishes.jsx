//import React from 'react';
import DishTile from './DishTile';
import './PopularDishes.css';
import SpaghettiCarbonara from '../assets/carbonara.jpg';
import ChickenTikkaMasala from '../assets/Chicken-Tikka-Masala.jpg';
import AssortedSushiPlatter from '../assets/Assorted-Sushi-Platter.jpg';
import MargheritaPizza from '../assets/margherita_pizza.jpg';
import CarpeseSalad from "../assets/caprese_salad.jpg";
const dishes = [
    {
        id: '26',
        image: SpaghettiCarbonara,
        name: 'Spaghetti Carbonara',
        description:
          'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. Rich and creamy without using cream!',
        time: '30 mins',
        ingredients: [
          '200g spaghetti',
          '100g pancetta',
          '2 large eggs',
          '50g Pecorino cheese',
          '50g Parmesan',
          'Black pepper',
          'Salt'
        ],
        steps: [
            'Cook spaghetti in salted boiling water until al dente.',
            'Fry pancetta until crispy.',
            'Beat eggs in a bowl, then mix in grated Pecorino and Parmesan.',
            'Drain spaghetti and combine with pancetta and its fat.',
            'Remove from heat and quickly mix in the egg and cheese mixture.',
            'Season with black pepper and serve immediately.',
          ],
    },
    {
        id: '27',
      image: MargheritaPizza,
      name: 'Margherita Pizza',
      description:
        'A traditional pizza topped with tomatoes, mozzarella, and basil.',
      time: '45 mins',
      ingredients: [
        'Tomato',
        'Wheat Flour',
        'Cheddar Cheese',
        'Olive Oil',
        'Cream',
      ],
      steps: [
        'Marinate chicken in yogurt and tikka masala paste for at least 1 hour.',
        'Grill or broil the marinated chicken until cooked through.',
        'Heat oil in a pan and sauté onions until translucent.',
        'Add garlic and ginger, cook for another minute.',
        'Pour in canned tomatoes and simmer for 10 minutes.',
        'Stir in cream and cooked chicken, simmer for 15 minutes.',
        'Season with salt and garnish with fresh cilantro before serving.',
      ],
    },
    {
        id: '28',
        image: CarpeseSalad,
        name: 'Caprese Salad',
        description:
          'A fresh and simple Italian salad with tomatoes, mozzarella, and basil..',
        time: '15 mins',
        ingredients: [
          'Pepper',
          'Olive Oil',
          'Mozzarellar',
          'Tomato',
          'Salt',
          'Lime',
        ],
        steps: [
            'Rinse sushi rice until water runs clear, then cook with water.',
            'Mix rice vinegar, sugar, and salt, then fold into cooked rice. Let it cool.',
            'Slice fresh fish and vegetables into thin strips.',
            'Place a nori sheet on a bamboo mat, spread rice evenly, leaving a small margin.',
            'Add fish and vegetables in a line, then roll tightly using the mat.',
            'Slice the roll into bite-sized pieces.',
            'Arrange nigiri and sashimi on a platter, garnish with pickled ginger and wasabi.',
          ],
    },
];

export default function PopularDishes() {
    return (
        <section className="popular-dishes">
            <div className="container">
                <h2 className="popular-dishes__title">Popular Dishes</h2>
                <div className="popular-dishes__tiles">
                    {dishes.map((dish) => (
                        <DishTile
                            key={dish.id}
                            id={dish.id}
                            image={dish.image}
                            name={dish.name}
                            description={dish.description}
                            time={dish.time}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}