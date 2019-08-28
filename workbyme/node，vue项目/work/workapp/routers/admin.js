var express = require('express');
var User = require('../models/User')
var Category = require('../models/Category')
var Content = require('../models/Content')

var router = express.Router();
//管理员
router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send('对不起，你不是管理员');
        return;
    }
    next();
})
//首页
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    })
})
//分页，用户管理
router.get('/user', function (req, res) {
    var page = Number(req.query.page || 1);
    var limit = 4;
    var pages = 0;
    User.count().then(function (count) {
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;

        User.find().sort({ _id: 1 }).limit(limit).skip(skip).then(function (users) {
            res.render('admin/userindex', {
                userInfo: req.userInfo,
                users: users,
                count: count,
                page: page,

            })
        })
    })

})
//用户删除
// router.get('/user/delete', function (req, res) {
//     var id = req.query.id || '';
//     User.remove({
//         _id: id
//     }).then(function () {
//         res.render('admin/success', {
//             userInfo: req.userInfo,
//             message: '删除成功',
//             url: '/admin'
//         });
//     });

// });
//分类分页，分类首页
router.get('/category', function (req, res) {
    var page = Number(req.query.page || 1);
    var limit = 4;
    var pages = 0;
    Category.count().then(function (count) {
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Category.find().limit(limit).skip(skip).then(function (categories) {
            res.render('admin/categoryindex', {
                userInfo: req.userInfo,
                categories: categories,
                count: count,
                page: page,

            })
        })
    })

})
router.get('/category', function (req, res) {
    res.render('admin/categoryindex', {
        userInfo: res.userInfo
    })
})
//分类的添加
router.get('/category/add', function (req, res) {
    res.render('admin/categoryadd', {
        userInfo: res.userInfo
    })
})
//分类的保存
router.post('/category/add', function (req, res) {
    var name = req.body.name || "";
    if (name == "") {
        res.render('admin/error', {
            userInfo: res.userInfo,
            message: "名称不能为空！"
        })
        return;
    }
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类已经存在"
            })
            return Promise.reject();
        } else {
            return new Category({
                name: name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "分类保存成功",
            url: "/admin/category"
        })
    })
})
//分类修改
router.get('/category/edit', function (req, res) {
    var id = req.query.id || '';
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            res.render('admin/categoryedit', {
                userInfo: req.userInfo,
                category: category
            });
        }
    })
});
//分类的修改保存
router.post('/category/edit', function (req, res) {
    var id = req.query.id || '';
    var name = req.body.name || "";
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject()
            } else {
                Category.findOne({
                    id: { $ne: id },
                    name: name
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中存在同名分类',
            });
            return Promise.reject()
        } else {
            return Category.update({
                _id: id
            }, {
                    name: name
                });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    })

})
//分类删除
router.get('/category/delete', function (req, res) {
    var id = req.query.id || '';
    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    });

});
//内容首页
router.get('/content', function (req, res) {
    Content.find().populate(['category', 'user']).sort({
        addTime: -1
    }).then(function (contents) {
        res.render('admin/contentindex', {
            userInfo: req.userInfo,
            contents: contents,

        })
    })
});
//内容添加页面
router.get('/content/add', function (req, res) {
    Category.find().then(function (categories) {
        res.render('admin/contentadd', {
            userInfo: req.userInfo,
            categories: categories
        })
    })
})
//内容保存
router.post('/content/add', function (req, res) {
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }
    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    });


})

//内容修改
router.get('/content/edit', function (req, res) {
    var id = req.query.id || '';
    var categories = [];
    Category.find().then(function (rs) {
        categories = rs;
        return Content.findOne({
            _id: id
        })
    }).then(function (content) {

        if (!content) {
            req.render('admin/error', {
                userInfo: req.userInfo,
                message: "指定内容不存在"
            });
            return Promise.reject();
        } else {
            res.render('admin/contentedit', {
                userInfo: req.userInfo,
                categories: categories,
                content: content,
            });
        }
    })

});
//内容修改保存
router.post('/content/edit', function (req, res) {
    var id = req.query.id || '';
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }
    Content.update({
        _id: id
    }, {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        }).then(function () {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '内容保存成功',
                url: '/admin/content/edit?id=' + id
            })
        });
})
//内容删除
router.get('/content/delete', function (req, res) {
    var id = req.query.id || '';

    Content.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/content'
        });
    });
});
module.exports = router;