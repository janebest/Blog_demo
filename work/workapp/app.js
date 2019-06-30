var express = require('express')
var swig = require('swig')
var path = require('path')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser')
var Cookies = require('cookies')
var cookieSession = require('cookie-session')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var User = require('./models/User')


var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
//cookieSession 必须放在cookieParser后面
app.use(cookieSession({
    //session的秘钥，防止session劫持。 这个秘钥会被循环使用，秘钥越长，数量越多，破解难度越高。
    keys: ['aaa', 'bbb', 'ccc'],
    //session过期时间，不易太长。php默认20分钟
    maxAge: 60 * 60,
    //可以改变浏览器cookie的名字
    name: 'session'
}));

app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    //用户的cookie保存
    req.userInfo = {}
    if (req.cookies.get('userInfo')) {
        req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        User.findById(req.userInfo._id).then(function (userInfo) {
            req.userInfo.isAdmin = true;
            next()
        })
    } else {
        next();
    }
})
//模块
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))
app.use('/Useradmin', require('./routers/useradmin'))
//模板引擎
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
swig.setDefaults({ cache: false });

//用户请求
app.get('/', function (req, res, next) {
    res.render('index')
})
app.get('/theindex', function (req, res, next) {
    res.render('main/theindex')
})
app.get('/list', function (req, res, next) {
    res.render('main/search')
})

// var uri = 'mongodb://localhost:27017/workapp';
// // Use bluebird
// var options = { promiseLibrary: require('bluebird') };
// var db = mongoose.createConnection(uri, options);
// Band = db.model('band-promises', { name: String });
// db.on('open', function () {
//     assert.equal(Band.collection.findOne().constructor, require('bluebird'));
// });
// const Promise = require('bluebird');
// class Connection {
//     query() {
//         return Promise.resolve('query');
//     }
//     close() {
//         console.log('close');
//     }
// }
// class DB {
//     connect() {
//         return Promise.resolve(new Connection());
//     }
// }
// const disposer = new DB().connect().disposer(connection => connection.close());
// Promise.using(disposer, connection => connection.query())
//     .then(console.log).catch(console.error);
// Promise.reject(new TypeError('type error'))
//     .catchReturn('default value')
//     .then(console.log);
//数据库
mongoose.connect("mongodb://localhost:27017/workapp", {
    useNewUrlParser: true,
    useFindAndModify: false
});
var con = mongoose.connection;
con.on("error", function (err) {
    console.log("数据库连接失败");
});
con.on("open", function () {
    console.log("数据库连接成功");
});
app.listen(5000);
module.exports = app;