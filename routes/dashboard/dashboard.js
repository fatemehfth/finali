var express = require('express');
var router = express.Router();
const User = require('../../models/user');

function isAdmin(req, res, next) {
    if (req.user.role === 'admin'){
        next()
    } else{
     return res.send(403)
    }
}

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Dashboard'
    });
});

router.post('/users', (req,res)=>{
    User.find({}, null, (err, users)=>{
        if(err)
            res.send(err)
        
        res.json(users)
    })
})

router.get('/users', isAdmin, (req, res) => {
        User.find({}, null, (err, users) => {
            if (err)
                res.send(err)

            res.json(users)
        })
    
})


module.exports = router;
