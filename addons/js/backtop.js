//回到顶部和用户反馈
function backTotop() {
    $(".floatBox").attr("style", " position: fixed; _position: absolute; left: 50%; bottom: 0px; margin-left: 520px;");
    $(".floatBox").find(".backTop").attr("title", "返回顶部");
    $(".floatBox").find(".feedback").attr("title", "用户反馈");

    //返回顶部功能实现
    $(".backTop").bind("click", function () {
        $("html, body").animate({
            scrollTop: 0
        }, 200);
        backTop();
    });
    $(".backTop").bind("mouseover", function () {
        $(this).addClass("active");
    });
    $(".backTop").bind("mouseout", function () {
        $(this).removeClass("active");
    });
    window.onscroll = backTop;

    function backTop() {
        var bodyScrollTop = "";
        if (document.documentElement && document.documentElement.scrollTop) {
            bodyScrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }

        var st = $(document).scrollTop(),
            winh = $(window).height();
        if (!window.XMLHttpRequest) {
            $(".floatBox").css("top", st + winh - 66 - 168);
        }
        if (bodyScrollTop == 0) {
            $(".backTop").css("display", "none");
        } else {
            $(".backTop").css("display", "block");
        }
    }
}
$(document).ready(function () {
    backTotop();    
});