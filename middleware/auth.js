const jwt = require('jsonwebtoken');
const config = require('config');

// verify jwt token from user
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (token) {
    jwt.verify(token, config.get('AUTH_KEY'), (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Token is not valid.' });
      }
      req.userId = decoded.user._id;
      next();
    });
  } else {
    res.status(401).json({ msg: 'No token was received.' });
  }
};
