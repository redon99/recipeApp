const UnauthenticatedError = require('../errors/unauthenticated');

const checkPremissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthenticatedError('Not authorized to access this route!');
};

module.exports = checkPremissions;
