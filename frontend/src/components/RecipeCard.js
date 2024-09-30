import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="card h-100">
            <img src={recipe.image} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
                    View Recipe
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;