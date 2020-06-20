const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true, max: 70, min: 8}
});

module.exports = mongoose.model('User', UserSchema);
