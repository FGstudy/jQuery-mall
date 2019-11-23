$(function() {
    //头部导航栏，鼠标悬停时效果
    $(".nav>li").hover(
        function() {
            // $(this).children(".submenu").addClass("show")
            $(this)
                .children(".submenu")
                .stop()
                .animate({
                        zIndex: "10",
                        top: "160px",
                        opacity: " 1"
                    },
                    300
                );
        },
        function() {
            $(this)
                .children(".submenu")
                .stop()
                .animate({
                        opacity: " 0",
                        top: "180px",
                        zIndex: "8"
                    },
                    300
                );
        }
    );

    $(".submenu>li").hover(
        function() {
            $(this)
                .children(".sub-menu-2")
                .addClass("show");
        },
        function() {
            $(this)
                .children(".sub-menu-2")
                .removeClass("show");
        }
    );

    var searchFlag = false;
    //头部导航栏，点击搜素图标出现搜索框
    $(".search-logo").click(function() {
        $(".nav-bar").fadeToggle();
        console.log("1111");
        if (!searchFlag) {
            $(".search-input").animate({
                    left: "-400%",
                    width: "430%",
                    // display: "block"
                    opacity: 1
                },
                500
            );

            searchFlag = true;
        } else {
            $(".search-input").animate({
                    left: "-10%",
                    width: "30%",
                    // display: "block"
                    opacity: "0"
                },
                500
            );

            searchFlag = false;
        }
    });

    //头部导航栏，点击出现购物车详情
    var cartFlag = false;
    $(".cart-area").click(function() {
        if (!cartFlag) {
            $(this).css({
                background: "rgba(0,0,0,0.5)"
            });
            cartFlag = true;
        } else {
            $(this).css({
                background: "#fff"
            });
            cartFlag = false;
        }

        $(".cart-list").fadeToggle();
    });

    //品牌轮播
    var currentLeft = 0;
    $(".brand .brand-slider .pre").click(function() {
        carousel(true, 178, -534, $("#brand-list-con"), 500)
    });

    $(".brand .brand-slider .next").click(function() {
        carousel(false, 178, -712, $("#brand-list-con"), 500)
    });

    //记一次略有瑕疵的封装
    function carousel(flag, length, targetLength, ele, ms) {
        //前一张
        if (flag) {
            if (currentLeft < targetLength) {
                currentLeft = 0;
                ele.stop().animate({
                        left: currentLeft
                    },
                    0
                );
            }
            currentLeft -= length;
            ele.stop().animate({
                    left: currentLeft
                },
                ms
            );
        } else {
            // 后一张
            if (currentLeft >= 0) {
                currentLeft = targetLength;
                ele.stop().animate({
                        left: currentLeft
                    },
                    0
                );
            }
            currentLeft += length;
            ele.stop().animate({
                    left: currentLeft
                },
                ms
            );
        }
    }




    //回到顶部
    var height = $(window).height();

    //scroll() 方法为滚动事件  

    $(window).scroll(function() {
        if ($(window).scrollTop() > height) {

            $(".back-top").fadeIn(500);
        } else {
            $(".back-top").fadeOut(500);
        }

    });

    $(".back-top").click(function() {

        $('body,html').animate({ scrollTop: 0 }, 100);


    });
})