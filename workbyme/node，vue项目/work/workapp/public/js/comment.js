//提交评论
$('#messageBtn').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),
            content: $('#messageContent').val()
        },
        success: function (responseData) {
            $('#messageContent').val('');
            renderComment(responseData.data.comments.reverse());
        }
    })
});
//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    success: function (responseData) {
        renderComment(responseData.data.reverse());

    }
});
function renderComment(comments) {
    $('#messageCount').html(comments.length);
    if (comments.length == 0) {
        $('.messageList').html('<div class="messageBox"><p>还没有评论</p></div>');
    } else {
        var html = '';
        for (var i = 0; i < comments.length; i++) {
            html += '<div class="messageBox">' +
                '<p class="name clear"><span class="fl">' + '用户：' + comments[i].username + '</span><span class="fr">' + formatDate(comments[i].postTime) + '</span></p><p>' + '评论：' + comments[i].content + '</p>' +
                '</div>';
        }
        $('.messageList').html(html);
    }
}
function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '/' + (date1.getMonth() + 1) + '/' + date1.getDate() + '/ ' + date1.getHours() + ':' + date1.getMinutes();
}