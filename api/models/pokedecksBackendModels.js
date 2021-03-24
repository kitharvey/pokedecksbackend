const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    displayName: {
        type: String,
    },
    favorites: {
      type: [Number],
    },
    score: {
      type: Number,
      default: 0
    }
});






userSchema.statics.login = async function(uid, displayName) {
  const user = await this.findOne({ uid });
  if (user) {
      return user;
  }
  else {
    const newUser = await User.create({ uid, displayName });
    return newUser;
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;
