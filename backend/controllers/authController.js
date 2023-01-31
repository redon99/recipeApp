const User = require('./../models/userModel');

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = await User.create({ firstName, lastName, email, password });
  const token = newUser.createJWT();
  res.status(201).json({
    status: 'success',
    data: {
      newUser: {
        firstName,
        lastName,
        email,
      },
      token,
    },
  });
};
exports.login = async (req, res) => {
  res.send('login user');
};
exports.updateUser = async (req, res) => {
  res.send('update user');
};
