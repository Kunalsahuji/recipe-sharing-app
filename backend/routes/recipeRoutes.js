const express = require('express');
const router = express.Router();
const {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    addRating,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getRecipes).post(protect, createRecipe);
router
    .route('/:id')
    .get(getRecipeById)
    .put(protect, updateRecipe)
    .delete(protect, deleteRecipe);
router.route('/:id/rate').post(protect, addRating);

module.exports = router;