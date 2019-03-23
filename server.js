const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv/config');

const app = new express(); 


// static files
console.log(path.join(__dirname, 'public'))
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'html');

//routes
var index = require('./controllers/index');
var user = require('./controllers/user');

//db config
// mongoose.connect('mongodb://localhost:27017/portfolio')
// .then(() => console.log('connected to db'))
// .catch(err => console.log(err));


//app.use('/', index);
app.use('/user', user);
app.get('/', function(req, res){
    res.sendFile('main.html', { root: __dirname + "/views" } );
});

app.post('/sendemail', function (req, res) {
    

    let message = 'Name : ' + req.body.name + '\r\n' + 'Email Id : ' + req.body.email + '\r\n' + 'Message : ' + req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rehan.rahi233.rr@gmail.com',
          pass: 'ilike233.rr'
        }
      });
      
      var mailOptions = {
        from: 'rehan.rahi233.rr@gmail.com',
        to: 'engr.rehan786@hotmail.com',
        subject: 'Email notification from your portfolio App',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.status(200).json({ success: true });
});


var port = process.env.PORT | 3000;
app.listen(port, function(){
    console.log('Server is started on port ' + port);
});

