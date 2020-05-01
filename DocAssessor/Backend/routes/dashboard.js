var express = require('express');
var router = express.Router();

router.get('/dashboard',function(req,res){
    //res.render(path.join(__dirname,'../view/home.html'));
    res.send("In dashboard");
})
module.exports = router;