const rfr = require('rfr');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/portfolio');

const LoginSessionSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    token: String,
    time: Date,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var LoginSession = mongoose.model('LoginSession', LoginSessionSchema);
module.exports = LoginSession;

