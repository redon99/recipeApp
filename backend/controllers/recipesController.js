const Recipe = require('./../models/recipeModel');
const BadRequestError = require('./../errors/badRequest');
const UnauthenticatedError = require('../errors/unauthenticated');

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
  res.send('get all recipes');
};
exports.updateRecipe = async (req, res) => {
  res.send('update recipe');
};
exports.deleteRecipe = async (req, res) => {
  res.send('delete recipe');
};
exports.showStats = async (req, res) => {
  res.send('show recipes stats');
};
