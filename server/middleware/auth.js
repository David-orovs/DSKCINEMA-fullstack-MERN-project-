const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    
    // headers to make it more general and headers are defined in app,js  
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    console.log(decodedToken)

    req.user = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log(err)
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
