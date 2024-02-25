const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  password: String,
  student_id: String,
  faculty: String,
  department: String,

});

const User = mongoose.model("User", userSchema);

module.exports = User;
