
//页面初始化，进行ajax请求，给后台传递参数，参数是搜索列表页点击购买按钮的商品的id；
//id从当前页面地址栏中上个页面跳转携带过来的参数取，调用location.search方法，地址栏后面的问号，多个参数需要用&分隔，然后再=切割
var params = {};
var search = location.search;

if (search) {
    var search = search.replace('?', '');
    var arr = search.split('&');

    arr.forEach(function (item, i) {
        var arritem = item.split('=');
        params[arritem[0]] = arritem[1];
    })
}

ajax('./json/details.json?productId=params.productId', function (data) {
    var str = (new Function('return' + data))();
    //轮播图
    //如果后台没有传过来图片，显示一张默认图：暂无图片
    var imgarr = str.img;
    var oUl = document.getElementById('slide');
    if (imgarr) {
        for (var i = 0; i < imgarr.length; i++) {
            var oLi = document.createElement('li');
            var img = document.createElement('img');
            img.src = "img/images/" + imgarr[i];
            oLi.appendChild(img);
            oUl.appendChild(oLi);

        }
    } else {
        var oLi = document.createElement('li');
        var img = document.createElement('img');
        img.src = "img/images/none01.jpg";
        oLi.appendChild(img);
        oUl.appendChild(oLi);
    }
    //商品文字信息介绍
    var oP = document.getElementById('font');
    oP.innerHTML = str.font;
    //商品价格
    var oSpan1 = document.getElementById('newPrice');
    oSpan1.innerHTML = str.newPrice;
    var oSpan2 = document.getElementById('oldPrice');
    oSpan2.innerHTML = str.oldPrice;
    //商品尺码
    var sizeArr = str.size;
    var oUl1 = document.getElementById('n1');
    for (var i = 0; i < sizeArr.length; i++) {
        var oLi1 = document.createElement('li');
        oLi1.innerHTML = sizeArr[i];
        oUl1.appendChild(oLi1);
        //给尺码添加点击事件
        oLi1.setAttribute("onclick", "Click" + "(" + i + ")");
        oLi1.setAttribute("style", "background:transparent");
    }


    //剩余库存
    var oSpan3 = document.getElementById('n2');
    oSpan3.innerHTML = str.stock;

})

var arrColor = [];

//设置开关，点击切换尺码选项的颜色,但是再点击其它尺码时，需要取消当前尺码的颜色，再点击其它按钮才会变色，或者点击其它按钮两次，体验不好
var Stop = true;
//注意函数名的写法，不能用关键字保留字，大驼峰命名法，首字母大写，否则无法实现点击事件
Click = function (i) {

    if (Stop) {
        // for (var m = 0; m < oUl1.children.length + 1; m ++) {
        // oUl1.children[i].style.background = "orange";
        $(oUl1.children[i]).siblings().css('background', 'transparent');
        oUl1.children[i].style.background = "orange";
        arrColor.push(oUl1.children[i]);

    } else {
        oUl1.children[i].style.background = "transparent";
        arrColor.splice(i, 1);

        // $(oUl1.children[i]).siblings().css('background','osrange');
    }
    // oUl1.children[m].style.background = "transparent";
    // }
    Stop = !Stop;

}

//给数量框添加点击事件
var oInput = document.getElementById('reduce');
var oInput1 = document.getElementById('add');
var oInput2 = document.getElementById('number');
//减号
oInput.onclick = function () {
    //注意判断条件的写法，如果写当数量=1时，数量为1，则会一下子减到1，中间没有 -- 的过程
    //所以改为当数量>1时，数量--，否则数量为1
    //   oInput2.value --;
    // if(oInput2.value = 1){
    //     oInput2.value = 1;

    // }

    // oInput2.value > 0? oInput2.value-- : oInput2.value = 0;

    if (oInput2.value > 0) {
        oInput2.value--;

    } else {
        // 当商品数量等于0时，提示用户请选择商品数量，并且提示框于2秒后消失
        oInput2.value = 0;
        var oDivreduce = document.getElementById('numf');
        var oDivpronum = document.getElementById('pronum');
        oDivreduce.style.display = "block";
        oDivpronum.innerHTML = "请选择商品数量";
        setTimeout(() => {
            oDivreduce.style.display = "none";
        }, 2000)
    }
}
//加号

oInput1.onclick = function () {

    var oSpan = document.getElementById('n2');

    //问题4：为什么从4直接加到了30,大于4的数字都会依次加到30？？？？？
    // oInput2.value < oSpan.innerHTML? oInput2.value ++ : oInput2.value = oSpan.innerHTML;
    if (oInput2.value < oSpan.innerHTML) {
        oInput2.value++;

    } else {
        // 当商品数量超出库存数时，提示用户没有库存了，并且提示框于2秒后消失
        oInput2.value = oSpan.innerHTML;
        var oDivreduce = document.getElementById('numf');
        var oDivpronum = document.getElementById('pronum');
        oDivreduce.style.display = "block";
        oDivpronum.innerHTML = "亲亲，没有库存啦";
        setTimeout(() => {
            oDivreduce.style.display = "none";
        }, 2000)
    }

}


//用户点击加入购物车时对商品数量和尺码进行校验
var oInput = document.getElementById('shop');
var oUl1 = document.getElementById('n1');
var arrSize = oUl1.children;
//当没有选中尺码时，提示信息，按钮不为黄色
oInput.onclick = function () {

    var oInput2 = document.getElementById('number');
    if (oInput2.value == 0) {


        var oDivreduce = document.getElementById('numf');
        var oDivpronum = document.getElementById('pronum');
        oDivreduce.style.display = "block";
        oDivpronum.innerHTML = "请选择商品数量";
        setTimeout(() => {
            oDivreduce.style.display = "none";
        }, 2000)
        return false;

    }
    // var arrColor = [];
    // for (var i = 0; i < arrSize.length; i ++) {

    // if (arrSize[i].style.background = "transparent") {
    //     arrSize[i].style.background = "transparent"
    //     var oDivreduce = document.getElementById('numf');
    //     var oDivpronum = document.getElementById('pronum');
    //     oDivreduce.style.display = "block";
    //     oDivpronum.innerHTML = "请选择商品尺码";
    //     setTimeout(() => {
    //         oDivreduce.style.display = "none";
    //     }, 2000)

    // }else{
    //     arrSize[i].style.background = "orange";

    // }
    //设置背景颜色要加引号 点击之后，会将所有的尺码选项颜色设置为if语句中的颜色

    // }
    //问题5：当尺码变为黄色之后，再点击变成透明，再点击加入购物车不会弹出提示框？？？？
    if (!arrColor.length) {

        var oDivreduce = document.getElementById('numf');
        var oDivpronum = document.getElementById('pronum');
        oDivreduce.style.display = "block";
        oDivpronum.innerHTML = "请选择商品尺码";
        setTimeout(() => {
            oDivreduce.style.display = "none";
        }, 2000)
        return false;

    }
    //1、用户登录的情况：添加购物车成功出现模态框提示
    //问题6：数量没有选择提示这一块，只有初始化点击第一次才会不触发模态框，之后再点击会同时触发二者
    //    if( arrColor.length && oInput2.value > 0){

    //     oInput.setAttribute('data-toggle','modal');
    //     oInput.setAttribute('data-target','.wq-add');

    //     var inputYes = document.getElementById('input1');
    //     var inputNo = document.getElementById('input2');

    //     inputNo.onclick = function(){
    //         //不能实现
    //         // oInput.removeAttribute('data-toggle');
    //         // oInput.removeAttribute('data-target');
    //         //这种方法会影响下次模态框的访问
    //         // var oShop = document.getElementById('modalShop');
    //         // oShop.style.display = "none";
    //         //手动关闭模态框的方法
    //         $('#modalShop').modal('hide');
    //     }
    //     inputYes.onclick  = function(){
    //         location.href="./shop.html";

    //     }
    // }

    //用户没登录的情况：拦截到登录页面
    //发送ajax请求给后台做登录拦截：传递参数商品尺码，商品数量，商品id(通过地址栏传递的参数的location.search方法取值)
    //如果用户未登录，点击加入购物车之后，会跳转到登录页，不会出现模态框；
    // 登录成功之后又会跳转回当前商品详情页,跳转时需要将当前商品详情页的地址传过去


    ajax("./json/login.json?productId=params.productId&&size=arrColor[arrColor.length-1]&&num=oInput2.value", function (data) {
        var str = (new Function('return' + data))();

        if (str.error == 400) {
            location.href = "./login.html?returnUrl=" + location.href;
            return false;
        }

    })


}


//当用户未加入购物车时，点击立即购买按钮，提示未实现
var oInputBuy = document.getElementById('buy');
var oDivreduce = document.getElementById('numf');
var oDivpronum = document.getElementById('pronum');
oInputBuy.onclick = function () {
    ajax("./json/login1.json?productId=params.productId&&size=arrColor[arrColor.length-1]&&num=oInput2.value", function (data) {
        var str1 = (new Function('return' + data))();
        if (str1.message = "该商未加入购物车！") {
           
            oDivreduce.style.display = "block";
            oDivpronum.innerHTML = "未实现";
            setTimeout(() => {
                oDivreduce.style.display = "none";
            }, 2000)
        }

    })
}









//业务逻辑：
//点击尺码按钮变为橘色；点击数量按钮的 + -号改变中间框中的值，数量加到剩余库存数时，提示没有库存了，数量最少减到0；
//用户校验，尺码和数量有没有选择，其中一项没有选择时点击加入购物车按钮就会弹出提示，请选择尺码/数量
//尺码和数量都选择之后，点击加入购物车，提示，添加成功，是否去购物车看看，点击是调转到购物车页，点击否取消弹框，留在当前页
//做登录拦截：如果用户未登录，点击加入购物车之后，会跳转到登录页，登录成功之后又会跳转回当前商品详情页，
//当用户未加入购物车时，点击立即购买按钮，提示未实现

//     var str1 = `
// <li style="z-index: 1 "><img src="img/images/${imgarr[i]}"/></li>
// `
//字符串模板和appendChild不能一起使用？？？采用jQuery的append方法，此处用oUl[0].appendChild(str1)行不通
//     $('.slide').append(str1);
//     var str2 = `
// <li onclick = "clearOnclick(${i})"><li>
// `
//     $('ol').append(str2);
// $('#banner').append($('ol'));





var oDiv = document.getElementById('banner');
var oUl = document.getElementById('slide');
var oLi = oUl.children;
//此处是创建ol时，控制台不会执行console.log
var oOl = document.getElementById('dot');
//思考3:控制台和页面console.log结果不一样，页面输出0，控制台输出5
// console.log(oLi.length);
for (var i = 0; i < 5; i++) {
    var li = document.createElement('li');
    // oOl.appendChild(li);
    oOl.appendChild(li);
    //    li.onclick = "clearOnclick" + "(" + i + ")"; 这种写法错误，这种是设置方法，不是属性，后面跟函数

    //思考1：给元素设置点击属性的方式有几种？？？？目前只有这种方式可行
    li.setAttribute("onclick", "clearOnclick" + "(" + i + ")");
    //   $("li").attr("onClick","javascript:clearOnclick;" + "(" + i + ")");    有版本的限制
    // $("ol").append(`<li  onClick="javascript:clearOnclick('${i}');" ></li>`);  !!!!为什么这种方法不行？？？!!!!
}
$('oDiv').append(oOl);
//点击小圆点，该小圆点背景颜色变为白色，其它小圆点的背景颜色变为灰色，该小圆点小标对应的图片显示在上面
clearOnclick = function (i) {
    //思考2：点击最后一个小圆点，背景颜色不会变为白色，解决办法+1，为什么？？？？
    // for (var m = 0; m < oOl.children.length + 1; m ++) {
    oOl.children[i].style.background = "white";
    //jquery方法设置元素所有同级兄弟节点（包括前后）的背景颜色
    $(oOl.children[i]).siblings().css('background', 'gray');
    // oOl.children[i].Sibling.style.background = "white";
    // ol.children[i].nextSibling.style.background = "gray";
    // ol.children[i].previousSibling.style.background = "gray";  
    //原生方法设置元素所有兄弟节点的背景颜色，此方法有缺陷，会报点击元素的所有兄弟节点未定义
    // oOl.children[m].style.background = "gray";
    oUl.children[i].style.zIndex = 9;
    //解决：点击小圆点切换图片只能正序执行，逆序不可以,正序执行一遍之后，图片显示最后一张的问题
    // oUl.children[m].style.zIndex = 5;
    $(oUl.children[i]).siblings().css('zIndex', '5');
    // }
}

