const User = require("../models/user");
const { check, validationResult } = require("express-validator");

// Validation and print output on console for signUp
// signUp() function hit the query
exports.signUp = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()[0].msg});
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({err: "NOT able to save this user in Database"});
    }
    res.json({
      name: user.full_name,
      email: user.email,
      id: user._id
    });
  });
};

// getsignUp() function for get all users from database..
exports.getsignUp =
   (req, res) => 
  {
    User.find().exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(user);
    });
  };

// Validation and print output on console for signIn
// signIn() function hit the query
exports.signIn = (req, res) => {
 
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({error: "USER Email does not Exists"});
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({error: "Email and Password does not match!!!"});
    }

    const { _id, full_name, email } = user;
    return res.json({  user: { _id, full_name, email } });
  });
};
