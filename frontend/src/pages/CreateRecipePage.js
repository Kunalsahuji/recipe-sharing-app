import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

const CreateRecipePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (recipeData) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                const data = await response.json();
                navigate(`/recipe/${data._id}`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error creating recipe');
            }
        } catch (error) {
            console.error('Error creating recipe:', error);
            setError(error.message || 'An unexpected error occurred while creating the recipe');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Create New Recipe</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <RecipeForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
};

export default CreateRecipePage;