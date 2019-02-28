var express = require('express');
var router = express.Router();
const User = require('../../models/user');

router.post('/test', (req, res)=>{
    res.json({
        success: true
    })
})

router.post('/createUser', function (req, res) {
    if(!req.body.username || !req.body.password || !req.body.role){
        return res.json({
            success: false,
            msg: "empty filed"
        })
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })
    user.save((err, user) => {
        if (err) {
            return res.json({
                success: false,
                msg: "something wrong in user creation\n" + err.message
            })
        }
        res.json({
            success: true,
            user
        })
    })
})

router.post('/getAllUsers', (req, res)=>{
    User.find({}, (err, users)=>{
        if(err){
            return res.json({
                success: false,
                msg: "something wrong in user creation\n" + err.message
            })
        }
        res.json({
            success: true,
            users
        })
    })
})

module.exports = router;
