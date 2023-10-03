const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require('../middleware/auth');

router.post("/", (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password || !isAdmin) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      isAdmin,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                },
              });
            }
          );
        });
      });
    });
  });
});

router.get('/', async (req, res) => {
  User.find().then(item => res.json(item));
})

// Follow a user
router.put('/follow/:userId', auth, async (req, res) => {
  const loggedInUserId = req.user.id;
  const userIdToFollow = req.params.userId;

  try {
    const loggedInUser = await User.findByIdAndUpdate(
      loggedInUserId,
      { $addToSet: { following: userIdToFollow }, isFollowing: true },
      { new: true }
    );

    res.json({ msg: "User followed successfully", user: loggedInUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Unfollow a user
router.put('/unfollow/:userId', auth, async (req, res) => {
  const loggedInUserId = req.user.id;
  const userIdToUnfollow = req.params.userId;

  try {
    const loggedInUser = await User.findByIdAndUpdate(
      loggedInUserId,
      { $pull: { following: userIdToUnfollow }, isFollowing: false },
      { new: true }
    );

    res.json({ msg: "User unfollowed successfully", user: loggedInUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});


module.exports = router;
