import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailsPage = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const response = await fetch(`/api/recipes / ${id}`);
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            console.error('Error fetching recipe:', error);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="img-fluid mb-4" />
            <p>{recipe.description}</p>
            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetailsPage;