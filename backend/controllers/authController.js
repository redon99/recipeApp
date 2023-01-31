const User = require('./../models/userModel');
const BadRequestError = require('./../errors/badRequest');
const UnauthenticatedError = require('../errors/unauthenticated');

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({ firstName, lastName, email, password });
  const token = user.createJWT();
  res.status(201).json({
    status: 'success',
    data: {
      user: {
        firstName,
        lastName,
        email,
      },
      token,
    },
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials!');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials!');
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};
exports.updateUser = async (req, res) => {
  res.send('update user');
};
