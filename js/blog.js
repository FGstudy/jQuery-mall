$(function() {
    // 加载共同头部和底部
    $('#header').load('common/header.html');
    $('#footer').load('common/footer.html');
    $.getScript("./js/common.js", function() {
        console.log("成功");
    });


});