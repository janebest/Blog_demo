var UserModel = require('../models/users')

var index = async (req, res, next) => {
    res.send({
        msg: '管理员权限',
        status: 0
    })
}

var usersList = async (req, res, next) => {
    var result = await UserModel.usersList();
    if (result) {
        res.send({
            msg: '所有用户信息',
            status: 0,
            data: {
                usersList: result
            }
        })
    } else {
        res.send({
            msg: '用户信息无法获取',
            status: -1
        })
    }
}

var deleteUser = async (req, res, next) => {
    var { username } = req.body;
    var result = await UserModel.deleteUser(username);
    if (result) {
        res.send({
            msg: '删除成功',
            status: 0
        })
    } else {
        res.send({
            msg: '删除失败',
            status: -1
        })
    }
}


module.exports = {
    index,
    usersList,
    deleteUser
}