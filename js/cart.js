$(function() {
    // 加载共同头部和底部
    $('#header').load('common/header.html');
    $('#footer').load('common/footer.html');
    $('#contact').load('common/contact.html');
    $.getScript("./js/common.js", function() {
        console.log("成功");
    });

    // 点击标签效果
    $(".cartgoods-title li").click(function() {
        $(this).addClass("show-active");
        $(this)
            .siblings()
            .removeClass("show-active");
        $(this)
            .prevAll()
            .addClass("show-active");
        $(this)
            .children(".cartgoods-line")
            .removeClass("line-active");
        $(this)
            .siblings()
            .children(".cartgoods-line")
            .removeClass("line-active");
        $(this)
            .prevAll()
            .children(".cartgoods-line")
            .addClass("line-active");

        showOrder();
        console.log(productItemList);
    });

    //购物车的加减商品按钮

    $(".shopcart-pane .subtract").click(function() {
        // 输入框的值减1
        $(this)
            .next()
            .val(function(index, value) {
                if (value == 0) {
                    $(this)
                        .prev()
                        .children()
                        .attr("disabled", "ture");
                } else {
                    $(this)
                        .prev()
                        .removeAttr("disabled", "false");
                    value = parseInt(value) - 1;
                }

                return value;
            });
        // 单项金额随着变化
        sum($(this), $(this).next());
        // 总金额的变化
        total($("#subtotal"));
        total($("#grand-total"));
    });

    $(".shopcart-pane .add").click(function() {
        $(this)
            .prev()
            .val(function(index, value) {
                value = parseInt(value) + 1;
                return value;
            });

        // 单项金额随着变化
        sum($(this), $(this).prev());
        // 总金额的变化
        total($("#subtotal"));
        total($("#grand-total"));
    });

    total($("#subtotal"));
    total($("#grand-total"));

    // $(".to-settle").click(function() {
    //     $(this).addClass("active");
    //     // $("#settle").tab("show")
    //     console.log("show");
    // });

    // 结算页的显示
    $(".settle-pane .checkbox").click(function() {
        $(this)
            .find(".redbox")
            .toggle();
        $(this).parents(".pay-check").siblings(".pay-check").find(".redbox").hide()
    });
    $(".add-confirm .checkbox").click(function() {
        $(this)
            .next()
            .slideToggle(200);
    });

    // productItem.name =

    $(".cart-item")
        .find(".sum")
        .map(function(index, value) {
            return value.innerHTML;
        })
        .get();

    var productItemList = [];

    //待收货页面展示

    $(".rece-total").html(function() {
        return totalNum();
    });

    // 生成订单内容
    function showOrder() {
        saveData();

        var orderList = productItemList.map(function(item, index) {
            return `<p class="clearfix "><span class="fl">${item.name}X${item.num}</span><span class="fr">${item.sum}</span></p>`;
        });

        var str = orderList.join("");

        $(".order-title")
            .next()
            .html(orderList);

        $(".order-total")
            .find(".total-num")
            .html(function(index, value) {
                return $("#grand-total").html();
            });

        $(".overall")
            .find(".overall-num")
            .html(function(index, value) {
                return totalNum();
            });
    }

    //将购物车的信息存入对象中
    function saveData() {
        $(".cart-item").each(function(index, item) {
            var productItem = {};
            productItem.id = index;
            productItem.name = $(this)
                .find("h2")
                .html();
            productItem.num = $(this)
                .find("input")
                .val();
            productItem.sum = $(this)
                .find(".sum")
                .html();

            productItemList.push(productItem);
        });
        //对对象数组进行去重处理,如果id相同，则用新值替换旧值
        productItemList = productItemList.reduce((pre, cur) => {
            const idLists = pre.map(item => item.id);
            if (idLists.includes(cur.id)) {
                pre[cur.id] = cur;
            } else {
                return [...pre, cur];
            }
        }, []);
    }

    // 单项金额的变化
    function sum(targetEle, amoutEle) {
        var price = strToNum(
            targetEle
            .parents(".amount")
            .prev()
            .html()
        );

        var amount = amoutEle.val();

        targetEle
            .parents(".amount")
            .next()
            .html(function(index, value) {
                value = amount * price;
                return "$" + value.toFixed(2);
            });
    }

    // 总金额的变化
    function total(ele) {
        ele.html(function() {
            var arr = $(".sum")
                .map(function(index, ele) {
                    return strToNum($(this).html());
                })
                .get();
            var total = arr.reduce(function(pre, cur) {
                return pre + cur;
            }, 0);

            return "$" + total.toFixed(2);
        });
    }

    //总计金额的计算
    function totalNum() {
        var total = strToNum($("#grand-total").html());
        var tax = strToNum($(".tax-num").html());
        var sum = total + tax;
        return "$" + sum.toFixed(2);
    }

    //传入一个$100 返回 100
    function strToNum(str) {
        return parseFloat(str.slice(1));
    }
});