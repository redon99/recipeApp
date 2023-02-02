const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('./../errors/unauthenticated');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid authentication!');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Invalid authentication!');
  }
};

module.exports = auth;
