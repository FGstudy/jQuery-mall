$(function() {
    // 加载共同头部和底部
    $('#header').load('common/header.html');
    $('#footer').load('common/footer.html');
    $('#contact').load('common/contact.html');
    $.getScript("./js/common.js", function() {
        console.log("成功");
    })

    //banner图动效

    var bannerTimer = null;

    bannerAnimate();

    bannerTimer = setInterval(function() {
        bannerAnimate();
    }, 7000);

    function bannerAnimate() {
        $(".banner .banner-bg .bg1")
            .delay(500)
            .fadeIn(500)
            .delay(3500)
            .fadeOut(500)
            .delay(2000);
        $(".banner .banner-bg .bg2")
            .delay(1000)
            .fadeIn(500)
            .delay(3000)
            .fadeOut(500)
            .delay(2000);
        $(".banner .banner-bg .bg3")
            .delay(1500)
            .fadeIn(500)
            .delay(2500)
            .fadeOut(500)
            .delay(2000);
        $(".banner .banner-bg .bg4")
            .delay(2000)
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500)
            .delay(2000);
        $(".banner .banner-bg .banner-text")
            .delay(2500)
            .fadeIn(500)
            .delay(1500)
            .fadeOut(500)
            .delay(2000);
        $(".banner .banner-bg .bg0")
            .delay(6000)
            .fadeToggle(1000);
        $(".banner .banner-bg .bg0-1")
            .delay(6000)
            .fadeToggle(1000);
    }

    // 鞋类展示动效
    $(".shoes-info .shoes-container").hover(
        function() {
            $(this).css({
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                transform: "translateY(-15px)"
            });

            $(this)
                .children("img")
                .css({
                    filter: "blur(2px)"
                });

            $(this)
                .children(".shoes-border-top")
                .css({
                    width: "50%"
                });
            $(this)
                .children(".shoes-border-bot")
                .css({
                    width: "79%"
                });
            $(this)
                .children(".shoes-border-left")
                .css({
                    height: "25%"
                });
            $(this)
                .children(".shoes-border-right")
                .css({
                    height: "60%"
                });
        },
        function() {
            $(this).css({
                boxShadow: "none",
                transform: "translateY(15px)"
            });

            $(this)
                .children("img")
                .css({
                    filter: "blur(0px)"
                });

            $(this)
                .children(".shoes-border-top")
                .css({
                    width: "0"
                });
            $(this)
                .children(".shoes-border-bot")
                .css({
                    width: "0"
                });
            $(this)
                .children(".shoes-border-left")
                .css({
                    height: "0"
                });
            $(this)
                .children(".shoes-border-right")
                .css({
                    height: "0"
                });
        }
    );

    //新品上市动效

    $(".tab-item").hover(
        function() {
            $(this).css({
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
            });
            $(this)
                .find(".new-detail")
                .stop()
                .animate({
                        bottom: "0"
                    },
                    500
                );
            $(this)
                .find(".show-icon")
                .stop()
                .animate({
                        top: "50%"
                    },
                    300
                )
                .animate({
                        top: "40%"
                    },
                    300
                )
                .animate({
                        top: "50%"
                    },
                    300
                );
        },
        function() {
            $(this).css({
                boxShadow: "none"
            });
            $(this)
                .find(".new-detail")
                .stop()
                .animate({
                        bottom: "-50%"
                    },
                    500
                );
            $(this)
                .find(".show-icon")
                .stop()
                .animate({
                        top: "-50%"
                    },
                    0
                );
        }
    );

    //点击小眼睛图标展示详情
    $(".show-icon .glyphicon-eye-open").click(function() {
        $(".detail-show").toggle()
    })

    //点击详情页的关闭按钮，关闭详情页
    $(".detail-show .remove").click(function() {
        $(".detail-show").hide()
    })

    //点击详情页的数量增减按钮，改变数量
    var quantityNum = $(".quantity .handle").val()
    $(".detail-show .add").click(function() {
        quantityNum++
        $(".quantity .handle").val(quantityNum)

    })
    $(".detail-show .reduce").click(function() {
        if (quantityNum <= 1) {
            return
        } else {
            quantityNum--
            $(".quantity .handle").val(quantityNum)
        }
    })

    //详情页右侧，点击小图，大图随着变化
    $(".photo-list li").click(function() {
        $(this).css({
            border: "2px solid #272727"
        })
        $(this).siblings().css({
            border: "none"
        })

        var childSrc = $(this).children("img").attr("src")
        var imgIndex = childSrc.slice(16, 17)
        console.log(imgIndex);

        $(".detail-show .right-col>img").attr("src", "img/pro-details/big-" + imgIndex + ".jpg")


    })


    //广告展示动效
    $(".col-item").hover(
        function() {
            $(this).css({
                    boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                    transform: "translateY(-15px)"
                },
                500
            );
        },
        function() {
            $(this).css({
                    boxShadow: "none",
                    transform: "translateY(15px)"
                },
                500
            );
        }
    );

    //博客轮播
    var blogLeft = 0
    $(".blog .blog-slider .pre").click(function() {
        carouselMargin(true, 630, -630, $(".blog .blog-container"), 500)
    })
    $(".blog .blog-slider .next").click(function() {
        carouselMargin(false, 630, -1260, $(".blog .blog-container"), 500)
    })



    function carouselMargin(flag, length, targetLength, ele, ms) {
        //前一张
        if (flag) {
            if (blogLeft < targetLength) {
                blogLeft = 0;
                ele.stop().animate({
                        marginLeft: blogLeft
                    },
                    0
                );
            }
            blogLeft -= length;
            ele.stop().animate({
                    marginLeft: blogLeft
                },
                ms
            );
        } else {
            // 后一张
            if (blogLeft >= 0) {
                blogLeft = targetLength;
                ele.stop().animate({
                        marginLeft: blogLeft
                    },
                    0
                );
            }
            blogLeft += length;
            ele.stop().animate({
                    marginLeft: blogLeft
                },
                ms
            );
        }
    }




});