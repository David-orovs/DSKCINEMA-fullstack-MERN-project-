const express = require("express");
const User = require('../models/User');
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


// router.get("/auth", (req, res) => {
//   res.status(200).json({
//       _id: req.user._id,
//       email: req.user.email,
//       name: req.user.name,
//       lastname: req.user.lastname,
//       role: req.user.role,
      
//   });
// });


router
  .route('/register')
  .get((req, res,) => {
      User.find()
         .then(user => res.json(user))
         .catch(err => res.status(400).json('Error: ' + err));
  })
  .post(async(req, res, next) =>{const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { name, email, password } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    if (password.length < 6) {
      const error = new HttpError(
        'password is too short.',
        422
      );
      return next(error);
    }
      
             
          
  
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
      // just use 12 for strength
    } catch (err) {
      const error = new HttpError(
        'Could not create user, please try again.',
        500
      );
      return next(error);
    }
  
    const createdUser = new User({
             
      name,
      email,
      password: hashedPassword,
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    let token;
    try {
      token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email },
        'supersecret_dont_share',
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    res
      .status(201)
      .json({ userId: createdUser.id, email: createdUser.email, token: token });
  
});
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
   .then(res.send("user deleted"))
   .catch(err => console.log(err))

});
router.route('/login').post(async(req, res, next) => {
  const { email, password } = req.body
     let existingUser;

  try  {
     existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
    existingUser.token = token
    await existingUser.save()
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
})


router.get("/logout",auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
          success: true
      });
  });
});

module.exports = router;