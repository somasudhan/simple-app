const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/new', ['users']);


router.post('/getFilteredObject', function(req, res, next){

    var filter = req.body;
    //console.log(filter);
    if(!filter.collection || !(filter.query + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db[filter.collection].find(filter.query, function(err, result){
            if(err){
                res.send(err);
            }
            res.json(result);
        });
    }
});


module.exports = router;