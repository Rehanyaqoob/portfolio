var mongoose  = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    phoneNumber: String,
    isValidated: Boolean,
    password: String,
    title: String,
    description: String,
    firstLine: String,
    profilePicId: String,
    resumeId: String,
    address: String,

    skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    experiences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Experience'}]
});


var skillSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    percent: Number,
    userId: String//{type: mongoose.Types.ObjectId, ref: 'User'}
});

// var addressSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     country: String,
//     city: String,
//     state: String,
//     street: String,
//     longitude: Number,
//     latitude:  Number,
//     userId: String//{type: mongoose.Types.ObjectId, ref: 'User'}
// });

var projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imageId: String,
    codeUrl: String,
    userId: String//{type: mongoose.Types.ObjectId, ref: 'User'}
});

var experienceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    designation: String,
    imageId: String,
    startDate: Date,
    endDate: Date,
    userId: String//{type: mongoose.Types.ObjectId, ref: 'User'}
});


var User = mongoose.model('User', userSchema);
//var Address = mongoose.model('Address', addressSchema);
var Experience = mongoose.model('Experience', experienceSchema);
var Project = mongoose.model('Project', projectSchema);
var Skill = mongoose.model('Skill', skillSchema);

module.exports.User = User;
//module.exports.Address = Address;
module.exports.Project = Project;
module.exports.Experience = Experience;
module.exports.Skill = Skill;