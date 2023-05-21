const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "password cannot be blank"],
  },
});

//add method to the user model, not specific instance
//return user or false if invalid
userSchema.statics.findAndValidate = async function (username, password) {
  //this refer to user
  const foundUser = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};
//middleware to run function before save
userSchema.pre("save", async function (next) {
  //this is the particular instance of User
  //we don't want to rehash, only want to rehash when modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
