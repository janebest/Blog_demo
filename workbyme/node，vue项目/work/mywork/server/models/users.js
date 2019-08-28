var mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
var url = require('url')
var { Head } = require('../untils/config')

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    data: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
    userHead: { type: String, default: url.resolve(Head.baseUrl, 'default.jpg') }
})

var UserModel = mongoose.model('user', UserSchema);
UserModel.createIndexes();

var save = (data) => {
    var user = new UserModel(data);
    return user.save().then(() => {
        return true;
    }).catch(() => {
        return false;
    })
}

var findLogin = (data) => {
    return UserModel.findOne(data);
}
var usersList = () => {
    return UserModel.find();
}

var deleteUser = (username) => {
    return UserModel.deleteOne({ username });
}

module.exports = {
    save,
    findLogin,
    usersList,
    deleteUser
}