import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Latest Recipes</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="col">
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;