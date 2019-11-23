$(function() {
    // 加载共同头部和底部
    $('#header').load('common/header.html');
    $('#footer').load('common/footer.html');
    $('#contact').load('common/contact.html');
    $.getScript("./js/common.js", function() {
        console.log("成功");
    });


    //加载滚动条
    $(".brands-container").mCustomScrollbar();
    //商品目录手风琴效果
    $(".category-list .title").click(function() {
        $(this).children(".icon").toggle()
        $(this).children(".other-icon").toggle()
        $(this).next().stop().slideToggle(500)
        $(this).parent().siblings().children(".treeview").stop().slideUp(500)
    })


    // 初始化价格范围显示
    var radio = 0;
    priceRange(true)
        //价格进度条效果

    $(".progress-bar").mousedown(function(e) {

        if (e.button == 0) {
            var marginLeft = $(this).offset().left

            var offsetX = e.clientX - marginLeft

            var length = $(this).width()

            radio = offsetX / length
            var point = toPercent(radio)
            if (radio < 0.5) {
                $("#start-dot").css({
                    left: point
                })
                lineMove()
                priceRange(true)
            } else {
                $("#end-dot").css({
                    left: point
                }, 300)
                lineMove()
                priceRange(false)
            }
        }

    })



    // $(".start-dot").mousedown(function() {

    // })

    // $(".start-dot").mousemove(function() {
    //     lineMove()
    // })



    //商品展示动效

    $(".tab-item").hover(
        function() {
            $(this).css({
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
            });
            $(this)
                .find(".goods-detail")
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
                .find(".goods-detail")
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



    // 进度条跟随小圆点变化
    function lineMove() {
        var startPoint = $("#start-dot").css("left")
        var endPoint = $("#end-dot").css("left")

        var lineWidth = parseInt(endPoint) - parseInt(startPoint)

        $(".progress-line").animate({
            left: startPoint,
            width: lineWidth
        }, 300)

    }

    //设置价格范围文本
    function priceRange(flag) {
        if (flag) {
            $(".price-start").html(function() {
                var sprice = radio * 800
                return "$" + sprice.toFixed(2)
            })
        } else {
            $(".price-end").html(function() {
                var sprice = radio * 800
                return "$" + sprice.toFixed(2)
            })

        }
    }

    function toPercent(point) {
        var str = Number(point * 100).toFixed(2);
        str += "%";
        return str;
    }





})