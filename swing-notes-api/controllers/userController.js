const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ status: 400, message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({ status: 400, message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });

    res.status(200).json({ message: 'User created' });
  } catch (err) {
    next({ status: 400, message: 'Signup failed' });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ status: 400, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    const passwordMatch = user && await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return next({ status: 400, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    next({ status: 500, message: 'Login failed' });
  }
};
