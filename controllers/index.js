const express = require('express');
const router = express.Router();


router.get('/', function(req, res){

    res.json({success: true, message: 'index get api is working'});

});

module.exports = router;


