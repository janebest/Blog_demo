var mongoose = require('mongoose');
var Mongoose = {
    url: 'mongodb://localhost:27017/some',
    connect() {
        mongoose.connect(this.url, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库连接成功');
        })
    }
}

var Head = {
    baseUrl: 'http://localhost:3000/uploads',
}

module.exports = {
    Mongoose,
    Head
}