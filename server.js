const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = require('./model/user')
const Artict = require('./model/artict')
const cookieParser = require('cookie-parser')
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local');

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


const app = express();
app.use(morgan('dev'))
const fs = require('fs')

const port = 3000
app.set('view engine', 'ejs');
app.use(express.static('public'))

//ورود و ثبت نام

app.use(session({
    secret: '$@r@',
    resave: true, //az akharin faaliatesh time expaer ro bezane
    saveUninitialized: true,
    cookie: {
        maxAge: 3000000

    }

}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({
    'extended': 'false'
}));
app.use(bodyParser.json());



passport.use('local-login', new localStrategy(
    function (username, password, done) {

        User.findOne({
            userName: username
        }, function (err, user) {

            if (err) {
                console.log('eror');
                return done(err)
            }

            if (!user) {
                console.log('not admin')
                return done(null, false, {})
            }

            if (user.password !== password) {
                console.log('pass not corect')
                return done(null, false, {})
            }


            return done(null, user)
        })
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
        //   return res.send('you cant log in');
        res.redirect('/');
    }
}



app.post('/authentication', passport.authenticate('local-login', {
    failureRedirect: '/coming-soon'
}), function (req, res) {
    console.log(req.body);
    res.redirect('/index');

});

app.get('/coming-soon', function (req, res) {
    res.send('comming soon')
})




app.post('/create-user', function (req, res) {
    let user = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        userName: req.body.username,
        password: req.body.password

    })
  
    user.save(function (err, user) {
        if (err) {
            return console.log('*******************************')
        }

       

        res.redirect('/index');
    })
})

app.listen(2100)


app.post('/add-articel', function (req, res) {
    let artict = new Artict({
        title: req.body.title,
        description: req.body.description,
        writer: req.body.writer,
        date: req.body.date,
        another: req.body.another
    })
    artict.save(function (err, user) {
        if (err) {
            return console.log(err)
        }

        //res.json(user);
        res.redirect('/index');

    });
});


//   app.get('/show-full-ejs',function(username,password,done)
//   {

//     let user = new User();

//     User.find({userName=username},function(err,user){

//         if(err)
//         res.send(err)
//   console.log(user);

//           res.render('1.ejs', {
//               user
//           })

//     });//eshare be colection 
//   });




app.get('/index', function (req, res) {
    res.render('index.ejs', {
        contents
    })
})

app.get('/add', function (req, res) {
    res.render('add.ejs', {

    })
})




app.get('/blog', function (req, res) {
    res.render('blog-single.ejs', {

    })
})






//مقاله


app.get('/index', function (req, res) {

    artict.find({}, function (err, contents) {
        if (err)
            res.send(err);
        res.render('index.ejs', {
            contents
        })
    })
});




app.get('/', function (req, res) {
    res.render('contact.ejs', {

    })
})
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/saeed', function (req, res) {
    res.sendFile(__dirname + '/view/saeed.html')


})

app.get('/sina', function (req, res) {
    res.sendFile(__dirname + '/view/sina.html')


})

app.get('/sorosh', function (req, res) {
    res.sendFile(__dirname + '/view/sorosh.html')


})

app.get('/sama', function (req, res) {
    res.sendFile(__dirname + '/view/sama.html')


})