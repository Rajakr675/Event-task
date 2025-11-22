const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    // fetch user from DB (optional)
    const user = await User.where({ id: decoded.id }).fetch({ require: false });
    if (!user) return res.status(401).json({ message: 'Invalid token user' });

    req.user = user.toJSON();
    next();
  } catch (err) {
    console.error('Auth middleware error', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
