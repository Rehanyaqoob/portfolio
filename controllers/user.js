const express = require('express');
const router = express.Router();
const LoginSession  = require('../model/loginSession');
const User  = require('../model/user');
const mongoose = require('mongoose');
const util = require('./../utils/utils');


router.get('/', function(req, res, next){

    res.json({ success: true });

});

router.get('/createSession', function(req, res, next){

    const loginSession = new LoginSession({
        _id: mongoose.Types.ObjectId(),
        token: "req.body.token",
        newField:"data"
    });

    loginSession.save().then( result => console.log(result)).catch(err => console.log(err));

    res.json({ success: true , message: 'login session get api is working'});

});

router.post('/login', function(req, res, next){

    res.json({ success: true , message: 'login get api is working'});

});

router.post('/signup', function(req, res, next){
User.User.find()
    //User.User.find({userName: req.body.userName, email: req.body.email, phoneNumber: req.body.phoneNumber})
    User.User.find({$or:[{userName: req.body.userName},{email: req.body.email},{phoneNumber: req.body.phoneNumber}]})
    .exec()
    .then(user => {

        if(user.length > 0){

            var message = '';
            if(user[0].userName == req.body.userName)
                message = 'user name already exist.';
            else if(user[0].email == req.body.email)
                message = 'email already exist.';
            else if(user[0].phoneNumber == req.body.phoneNumber)
                message = 'phone number already exist.';
            else
                message = 'user  already exist.';

            return res.json({message: message});
        }

        user = new User.User({
            _id: new mongoose.Types.ObjectId(),
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,    
            password: util.encrpt(req.body.password),
            title: req.body.title,
            description: req.body.description,
            firstLine: req.body.firstLine,
            profilePicId: req.body.profilePicId,
            resumeId: req.body.resumeId,
    
        });
        
        user.save().then(() => res.json({ success: true })).catch(() => res.json({messsage: ''}));

    }).catch(err => console.log(err));
    
});

router.post('/updateUser', function(req, res, next){
    User.User.find()
        User.User.find({email: req.body.email})
        .exec()
        .then(user => {
    
            if(user.length == 0){
                return res.json({message: 'user not exist'});
            }

            if(req.body.firstName)
                user.firstName = req.body.firstName;

            if(req.body.lastName)
                user.lastName = req.body.lastName;

            if(req.body.address)
                user.address = req.body.address;

            if(req.body.firstLine)
                user.firstLine = req.body.firstLine;

            if(req.body.description)
                user.description = req.body.description;

            if(req.body.firstLine)
                user.firstName = req.body.firstLine;

            if(req.body.title)
            user.title = req.body.title;

            if(req.body.profilePicId)
            user.profilePicId = req.body.profilePicId;

            if(req.body.resumeId)
            user.resumeId = req.body.resumeId;
            
            User.User.updateOne({email: req.body.email}, user, (err, user) => {

                if(err)
                return res.json(err);

                return res.status(200).json({success: true});
            });

        }).catch(err => console.log(err));
        
    });

    
router.post('/addskill', function(req, res, next){
    
    User.Skill.find({name: req.body.name }, (err, skill) => {
        if(err)
            return res.json(err);

        if(skill)
            return res.json({message: 'skill already exist.'});
 
        skill = new User.Skill({
            _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
            percent: req.body.percent,
            userId: req.body.userId,
        });

        skill.save().then( result => console.log(result)).catch(err => console.log(err));
        res.json({ success: true });
    });
});

router.delete('/deleteskill', function(req, res, next){
 
    User.Skill.find({name: req.body.name }, (err, skill) => {
        if(err)
            return res.json(err);

        if(skill){
            skill.remove().then( result => console.log(result)).catch(err => console.log(err));
        }
        res.json({ success: true });
    });
    
});

module.exports = router;