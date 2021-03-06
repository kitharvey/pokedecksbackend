const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    displayName: {
        type: String,
    },
    favorites: [{
      id: Number,
      name: String,
      types: [String],
    }],
    score: {
      type: Number,
      default: 0
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User;
