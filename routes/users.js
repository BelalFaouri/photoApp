var express = require('express');
var router = express.Router();
var User = require('../db/models/user')
const jwt = require('jsonwebtoken');
const secret = 'authsecret'
const withAuth = require('./middleware');

/* GET users listing. */
router.get('/', withAuth, function(req, res, next) {
  res.send('access granted')
});

router.post('/register',function(req,res){
  const {email, username, password} = req.body;
  console.log('data recieved',email,username);

  const user = new User({ username, email, password });
 user.save(function(err) {
   if (err) {
     // console.log(err);
     res.status(500)
       .send("Error registering new user please try again.");
   } else {
     res.sendStatus(200);
   }
 });
})

router.post('/authenticate', function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)

    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect usesrname or password'
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
