var express = require('express');
var router = express.Router();
const User = require('../../models/user');



router.post('/whoAmI', (req, res)=>{
    User.findById(req.user._id, (err, user)=>{
        if(err){
            return res.json({
                success: false,
                msg: "something wrong in get user info\n" + err.message
            })
        }
        res.json({
            success: true,
            user
        })
    })
})

module.exports = router;
