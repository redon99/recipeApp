const express = require('express');
const router = express.Router();

const recipesController = require('./../controllers/recipesController');

router
  .route('/')
  .get(recipesController.getAllRecipes)
  .post(recipesController.createRecipe);

router.route('/stats').get(recipesController.showStats);

router
  .route('/:id')
  .patch(recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

module.exports = router;
