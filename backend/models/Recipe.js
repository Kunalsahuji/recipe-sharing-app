const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: [
            {
                type: String,
                required: true,
            },
        ],
        instructions: [
            {
                type: String,
                required: true,
            },
        ],
        image: {
            type: String,
        },
        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Recipe', recipeSchema);