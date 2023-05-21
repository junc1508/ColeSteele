const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//only require email here
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//this is going to pass in username and password
//and makes sure that they are unique
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
