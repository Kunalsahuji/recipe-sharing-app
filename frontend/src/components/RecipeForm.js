import React, { useState } from 'react';

const RecipeForm = ({ onSubmit, initialValues = {} }) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [ingredients, setIngredients] = useState(initialValues.ingredients || ['']);
    const [instructions, setInstructions] = useState(initialValues.instructions || ['']);
    const [image, setImage] = useState(initialValues.image || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, ingredients, instructions, image });
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const addInstruction = () => {
        setInstructions([...instructions, '']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Ingredients</label>
                {ingredients.map((ingredient, index) => (
                    <input
                        key={index}
                        type="text"
                        className="form-control mb-2"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        required
                    />
                ))}
                <button type="button" className="btn btn-secondary" onClick={addIngredient}>
                    Add Ingredient
                </button>
            </div>
            <div className="mb-3">
                <label className="form-label">Instructions</label>
                {instructions.map((instruction, index) => (
                    <textarea
                        key={index}
                        className="form-control mb-2"
                        value={instruction}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        required
                    ></textarea>
                ))}
                <button type="button" className="btn btn-secondary" onClick={addInstruction}>
                    Add Instruction
                </button>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Image URL
                </label>
                <input
                    type="url"
                    className="form-control"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit Recipe
            </button>
        </form>
    );
};

export default RecipeForm;