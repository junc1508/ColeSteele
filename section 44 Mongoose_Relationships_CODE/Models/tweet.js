//one to bajillion example

const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("ERROR!");
    console.log(err);
  });

//parent schema
const userSchema = new Schema({
  username: String,
  age: Number,
});

//child schemwa
const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   //   const user = new User({ username: "chickenfan99", age: 61 });
//   const user = await User.findOne({ username: "chickenfan99" });
//   const tweet2 = new Tweet({ text: "bock bock bock", likes: 10 });
//   tweet2.user = user;
//   tweet2.save();
// };
// makeTweets();

const findTweet = async () => {
  const t = await Tweet.findOne({}).populate("user", "username");
  console.log(t);
};
findTweet();
