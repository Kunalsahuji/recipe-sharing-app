const Recipe = require('../models/Recipe')
// Get all recipes
exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).populate('user', 'name');
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get single recipe
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'name');
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a recipe
exports.createRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, image } = req.body;

    try {
        const recipe = new Recipe({
            user: req.user._id,
            title,
            description,
            ingredients,
            instructions,
            image,
        });

        const createdRecipe = await recipe.save();
        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Invalid recipe data' });
    }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, image } = req.body;

    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            if (recipe.user.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }

            recipe.title = title;
            recipe.description = description;
            recipe.ingredients = ingredients;
            recipe.instructions = instructions;
            recipe.image = image;

            const updatedRecipe = await recipe.save();
            res.json(updatedRecipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid recipe data' });
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            if (recipe.user.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }

            await recipe.remove();
            res.json({ message: 'Recipe removed' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add rating to recipe
exports.addRating = async (req, res) => {
    const { rating } = req.body;

    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            const alreadyRated = recipe.ratings.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyRated) {
                res.status(400).json({ message: 'Recipe already rated' });
            } else {
                const newRating = {
                    user: req.user._id,
                    rating: Number(rating),
                };

                recipe.ratings.push(newRating);
                await recipe.save();
                res.status(201).json({ message: 'Rating added' });
            }
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};