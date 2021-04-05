const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection Opened!");
  })
  .catch(err => {
    console.log("Mongo Connection Error Occurred!")
    console.log(err)
  });

const userSchema = new Schema({
  username: String,
  age: Number
})

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//   // const user = new User({ username: 'chickenfan99', age: 61 });
//   const user = await User.findOne({ username: 'chickenfan99' })
//   const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noise', likes: 1239 });
//   tweet2.user = user;
//   user.save();
//   tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
  const t = await Tweet.find()
    .populate('user', 'username')
  console.log(t)
}

findTweet();