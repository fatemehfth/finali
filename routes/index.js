var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local')
const auth = require('../tools/authentication.js');
const ac = require('../tools/ac.js');
const tools = require('../tools/general');
const User = require('../models/user');
const admin = require('./api/admin');
const user = require('./api/user');
const dashboard = require('./dashboard/dashboard');
const path = require('path');
const mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/Final_Project_1', function(err, res){
    if(err){ console.log('Failed to connect to ' + db); }  
    else{ console.log('Connected to ' + db); } 
});

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/panel*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../panel/build/')});
});

router.post('/createAdmin', function (req, res) {
  const user = new User({
    username: "admin",
    password: "admin",
    role: "admin"
  })
  user.save((err, user) =>{
    if(err){
      return res.json({
        success: false,
        msg: "something wrong in admin creation\n"+err.message
      })
    }
    res.json({
      success: true,
      user
    })
  })
})


router.get('/login', (req, res)=>{
  res.render('login')
})


router.post('/login', passport.authenticate('local-login'), (req, res) => {
    console.log(req.body);
    res.json({
      msg: "you are logged in"
    });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.json({
    msg: "you are logged out"
  });
});




router.use('/api/admin', auth.isLogedIn, ac.roleBaseAccess(['admin']),admin);
router.use('/api/user', auth.isLogedIn, ac.roleBaseAccess(['admin', 'user']), user);
//#######################################################################################
passport.use('local-login', new LocalStrategy(function (username, password, done) {

  User.findOne({ username: username }, function (err, user) {
      if (err) {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>err');
          return done(err);
      }

      if (!user) {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!user');
          return done(null, false, {})
      }

      if (user.password !== password) {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>pass');
          return done(null, false, {})
      }

      console.log('+++++++++++++++++++++++++++++user');
      return done(null, user)
  });
}));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
});


function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      return res.send('نمیتونی بیای');
  }
}

//**
router.post('/signup', (req, res)=>{
  console.log(req.body)
  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      msg: "empty filed"
    })
  }
  let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      sex: req.body.sex,
      phone: req.body.phone,
    })
  user.save((err, user)=>{
    if (err) {
      console.log(err.message )
      return res.json({
        success: false,
        msg: "something wrong in user sign up\n" + err.message       
      })
    }
    console.log("222222222222222")
    res.json({
      success: true,
      user
    })
  })
})


// router.post('/signin', (req, res)=>{
//   console.log(req.body)
//   if (!req.body.username || !req.body.password) {
//     return res.json({
//       success: false,
//       msg: "empty filed"
//     })
//   }
// })

// router.get('/signin', (req, res)=>{
//   res.render('signin')
// })


router.post('/signin', passport.authenticate('local-login', {
  failureRedirect: '/coming-soon'
}), function (req, res) {
  console.log(req.body);
  res.redirect('/dashboard')
});

router.get('/coming-soon', function (req, res) {
  res.send('comming soon')
})

router.get('/dashboard', isLogedIn, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  
  // res.send('dashboard')
});











module.exports = router;
