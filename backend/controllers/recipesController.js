const Recipe = require('./../models/recipeModel');
const BadRequestError = require('./../errors/badRequest');
const UnauthenticatedError = require('../errors/unauthenticated');
const NotFoundError = require('../errors/notFound');
const checkPremissions = require('../lib/checkPremissions');

exports.createRecipe = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new BadRequestError('Please provide a title for recipe');
  }
  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      recipe,
    },
  });
};
exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({ createdBy: req.user.userId });
  res.status(200).json({
    status: 'success',
    data: {
      totalRecipes: recipes.length,
      recipes,
      numOfPages: 1,
    },
  });
};
exports.updateRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { title } = req.body;

  if (!title) {
    throw new BadRequestError('Please provide a title for recipe');
  }

  const recipe = await Recipe.findOne({ _id: recipeId });
  if (!recipe) {
    throw new NotFoundError(`No recipe found with that ID: ${recipeId}`);
  }

  checkPremissions(req.user, recipe.createdBy);

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedRecipe,
    },
  });
};
exports.deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipe.findOne({ _id: recipeId });
  if (!recipe) {
    throw new NotFoundError(`No recipe found with that ID: ${recipeId}`);
  }

  checkPremissions(req.user, recipe.createdBy);

  await Recipe.findByIdAndDelete(recipeId);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Recipe deleted',
    },
  });
};
exports.showStats = async (req, res) => {
  res.send('show recipes stats');
};
