'use strict';
const User = require('../models/pokedecksBackendModels')

exports.getUsers = async(request, result) => {
  try {
      const users = await User.find()
      result.status(200).json(users)
  } catch(error) {
      result.status(500).json({ message: error.message})
  }
}

module.exports.signin = async (req, res) => {
    let user
    const { uid, displayName } = req.body;
    try {
        const isUserAlready = await User.findOne({ uid: uid, displayName: displayName });
        console.log(isUserAlready)
        if (isUserAlready) {
          user = isUserAlready;
          res.status(200).json({ user });
        }
        else {
          console.log(isUserAlready)
          const newuser = new User({ uid, displayName });
          user = await newuser.save()
          res.status(201).json({ user });
        }
        // if(!isUserAlready) {
        //   console.log(isUserAlready)
        //   const newuser = new User({ uid, displayName });
        //   user = await newuser.save()
        // }
        // res.status(200).json({ user });
    } 
    catch (err) {
        res.status(400).json({ err });
        console.log(err)
    }
}
module.exports.deleteUser = async (req, res) => {
    const { uid, displayName } = req.body;

    try {
        res.user = await User.findOne({ uid });
        res.user.remove()
        res.json({ message: `${displayName} was deleted` })
    } 
    catch (err) {
        res.status(400).json({ err });
    }
}

module.exports.patchFavorites = async (req, res) => {
  if (req.body.favorites != null) {
    res.user.favorites = req.body.favorites
  }
  try {
    const user = await res.user.save()
    res.json({user})
  } catch (err) {
    res.status(400).json({ err })
  }
}
module.exports.patchScore = async (req, res) => {
  if (req.body.score != null) {
    res.user.score = req.body.score
  }
  try {
    const user = await res.user.save()
    res.json({user})
  } catch (err) {
    res.status(400).json({ err })
  }
}


module.exports.checkuser = async(req, res, next) => {
  let user
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

