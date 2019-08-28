var UserModel = require('../models/users')


var login = async (req, res, next) => {
    var {
        username,
        password
    } = req.body;
    var result = await UserModel.findLogin({
        username,
        password
    });
    if (result) {
        req.session.username = username;
        req.session.isAdmin = result.isAdmin;
        res.send({
            msg: '登陆成功',
            status: 0
        });
    } else {
        res.send({
            msg: '登陆失败',
            status: -1
        });
    }
};
var register = async (req, res, next) => {

    var {
        username,
        password,
    } = req.body;
    var result = await UserModel.save({
        username,
        password
    });
    if (result) {
        res.send({
            msg: '注册成功',
            status: 0
        });
    } else {
        res.send({
            msg: '注册失败',
            status: -2
        });
    }
};
var loginout = async (req, res, next) => {
    req.session.username = '';
    res.send({
        msg: '退出成功',
        status: 0
    })
};
var getUser = async (req, res, next) => {
    if (req.session.username) {
        res.send({
            msg: '获取用户信息成功',
            status: 0,
            data: {
                username: req.session.username,
                isAdmin: req.session.isAdmin
            }
        })
    } else {
        res.send({
            msg: '获取用户信息失败',
            status: -1
        })
    }
};
module.exports = {
    login,
    register,
    loginout,
    getUser,

}