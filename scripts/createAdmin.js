require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assignment3";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const exists = await User.findOne({ email: 'admin@example.com' });
    if (exists) {
      console.log('Admin already exists');
      process.exit();
    }
    const hash = await bcrypt.hash('admin123', 10);
    await User.create({
      name:   'Admin',
      email:  'admin@example.com',
      password: hash,
      role:   'admin',
    });
    console.log('Admin user created (email: admin@example.com, password: admin123)');
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
})();
