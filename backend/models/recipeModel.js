const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A recipe must have a title'],
    minlength: [1, 'A recipe title must have more than 1 character'],
    maxlength: [40, 'A recipe title must have less than 40 characters'],
    trim: true,
  },
  prepTime: {
    type: Number,
    min: 1,
    required: [true, 'A recipe must have a preperation time'],
  },
  servings: {
    type: Number,
    min: 1,
    required: [true, 'A recipe must have a servings amount'],
  },
  cuisine: {
    type: String,
    enum: ['italian', 'greek', 'japanese', 'american', 'mexican', 'other'],
    default: 'other',
  },
  ingredients: [String],
  imgURL: {
    type: String,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide author'],
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);
