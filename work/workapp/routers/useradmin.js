var express = require('express');
var Users = require('../models/Users')
var Category = require('../models/Category')
var Content = require('../models/Content')

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('useradmin/index', {
        userInfo: req.userInfo
    })
})
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
        res.render('useradmin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('useradmin/error', {
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
        res.render('useradmin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/useradmin'
        })
    });
})
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
            res.render('useradmin/categoryindex', {
                userInfo: req.userInfo,
                categories: categories,
                count: count,
                page: page,

            })
        })
    })

})
router.get('/category', function (req, res) {
    res.render('useradmin/categoryindex', {
        userInfo: res.userInfo
    })
})
//分类的添加
router.get('/category/add', function (req, res) {
    res.render('useradmin/categoryadd', {
        userInfo: res.userInfo
    })
})
//分类的保存
router.post('/category/add', function (req, res) {
    var name = req.body.name || "";
    if (name == "") {
        res.render('useradmin/error', {
            userInfo: res.userInfo,
            message: "名称不能为空！"
        })
        return;
    }
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            res.render('useradmin/error', {
                userInfo: req.userInfo,
                message: "分类已经存在"
            })
            // return Promise.reject();
        } else {
            return new Category({
                name: name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('useradmin/success', {
            userInfo: req.userInfo,
            message: "分类保存成功",
            url: "/useradmin/category"
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
            res.render('useradmin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            res.render('useradmin/categoryedit', {
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
            res.render('useradmin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            if (name == category.name) {
                res.render('useradmin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/useradmin/category'
                });
                // return Promise.reject()
            } else {
                Category.findOne({
                    id: { $ne: id },
                    name: name
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            res.render('useradmin/error', {
                userInfo: req.userInfo,
                message: '数据库中存在同名分类',
            });
            // return Promise.reject()
        } else {
            return Category.update({
                _id: id
            }, {
                    name: name
                });
        }
    }).then(function () {
        res.render('useradmin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/useradmin/category'
        });
    })

})
//分类删除
router.get('/category/delete', function (req, res) {
    var id = req.query.id || '';
    Category.remove({
        _id: id
    }).then(function () {
        res.render('useradmin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/useradmin/category'
        });
    });

});

module.exports = router;