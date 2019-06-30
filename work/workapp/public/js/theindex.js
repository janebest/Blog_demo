
//图片右移
var list = document.getElementById("list");
var lis = list.getElementsByTagName("li");
for (var i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function () {
        this.getElementsByClassName("mask")[0].style = "left:0px;transition-duration: 2s;";
    }
    lis[i].onmouseout = function () {
        this.getElementsByClassName("mask")[0].style = "left:-329px;transition-duration: 2s;";
    }
}
//数字递增
var num = 0;
var t = setInterval(function () {
    num++;
    var count = document.getElementById("count");
    count.innerText = num;
    if (num == 1862690) {
        clearInterval(t);
    }
}, 0.1);
//换一换
var change = document.querySelector(".change a"),
    clist = document.querySelector(".clist"),
    div = document.querySelectorAll(".clist div"),
    index = 0;
change.onclick = function () {
    for (var i = 0, len = div.length; i < len; i++) {
        div[i].className = "";
    }
    index++;
    if (index == len) index = 0;
    div[index].className = "item active";

}
//图片css3
var imgup = document.getElementById("imgup");
imgup.onmouseenter = function () {
    imgup.className = "up";
}
imgup.onmouseleave = function () {
    imgup.className = "down";
}
var scaleup = document.getElementById("scaleup");
scaleup.onmouseenter = function () {
    scaleup.className = "scaleup";
}
scaleup.onmouseleave = function () {
    scaleup.className = "scaledown";
}
//banner轮播
var bannerlist = [{
    linkhref: "http://www.baidu.com",
    imgsrc: "/public/images/banner1.jpg"
}, {
    linkhref: "http://www.baidu.com",
    imgsrc: "/public/images/banner2.jpg"
}, {
    linkhref: "http://www.baidu.com",
    imgsrc: "/public/images/banner3.jpg"
}, {
    linkhref: "http://www.baidu.com",
    imgsrc: "/public/images/banner4.jpg"
}, {
    linkhref: "http://www.baidu.com",
    imgsrc: "/public/images/banner5.jpg"
}]
var point = document.getElementById("point");
var linodes = point.getElementsByTagName("li");
var bigimg = document.getElementById("bigimg");
var biglink = document.getElementById("biglink");
var index = 0;
var intervalId = setInterval(changeImg, 3000)

function changeImg() {
    index = index + 1;
    if (index == 5) {
        index = 0;
    }
    bigimg.src = bannerlist[index].imgsrc;
    for (var i = 0; i < linodes.length; i++) {
        if (i == index) {
            linodes[i].className = "move";
        } else {
            linodes[i].className = "dot";
        }
    }
    biglink.href = bannerlist[index].linkhref;
}
var picArr = new Array("/public/images/banner1.jpg", "/public/images/banner2.jpg", "/public/images/banner3.jpg", "/public/images/banner4.jpg", "/public/images/banner5.jpg");
var index = 0;

function next() {
    index++;
    if (index == picArr.length) {
        index = 0;
    }
    document.getElementById("bigimg").src = picArr[index];
}

function pre() {
    index--;
    if (index < 0) {
        index = picArr.length - 1;
    }
    document.getElementById("bigimg").src = picArr[index];
}
