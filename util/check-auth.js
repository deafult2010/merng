const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const config = require('config');
const SECRET_KEY = config.get('SECRET_KEY');

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    } else {
      throw new Error("Authentication token must be 'Bearer [token]");
    }
  } else {
    throw new Error('Authorization header must be provided');
  }
};
