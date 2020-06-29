//一级分类渲染
var str = '{"first":[{"categoryName":"运动馆","id":0},{"categoryName":"女士馆","id":1},{"categoryName":"男士馆","id":2},{"categoryName":"帆布馆","id":3},{"categoryName":"户外馆","id":4},{"categoryName":"单加馆","id":5},{"categoryName":"运动馆","id":6},{"categoryName":"女士馆","id":7},{"categoryName":"男士馆","id":8},{"categoryName":"帆布馆","id":9},{"categoryName":"户外馆","id":10},{"categoryName":"单加馆","id":11}],"cate":{"0":[{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"},{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"},{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"},{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"},{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"},{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"}],"1":[{"id":1,"brandName":"习克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"熊迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"哦百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"},{"id":6,"brandName":"哦百伦","brandLogo":"brand6.png","categoryName":"运动馆"},{"id":7,"brandName":"阿迪","brandLogo":"brand7.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand8.png","categoryName":"运动馆"}],"2":[{"id":1,"brandName":"耐克","brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"阿迪","brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"新百伦","brandLogo":"brand5.png","categoryName":"运动馆"}]}}'
var categorystr = (new Function("return" + str))();
var arr = categorystr.first;
// 6、获取DOM元素，不需要加选择器符号#，直接写id的属性值
var oUl = document.getElementById('left');
//默认渲染第一个一级分类品牌及其对应的二级分类品牌
secondCategory(0); 
var list = [];
for (var i = 0, len = arr.length; i < len; i++) {
    var li = document.createElement('li');
    li.innerHTML = arr[i].categoryName;
    oUl.appendChild(li);
    list.push(li);
    i == 0 ? li.className = "now" : "";
    // li.onclick = function showSecond(i){
        
    // }
    li.onclick = Function("showSecond('" + i + "');"); //给li绑定事件，并且传参
    // li.setAttribute("onclick", "javascript:showSecond('"+i+"');");
}

    //5、 注意i的下标为0，需要加恒等号==，等号=不可以
    // if(i == 0){
    // 	li.className = "now";
    // }
    // li.className = i == 0? "now" : "";

    //7、字符串只能写在一行上
    //  var strSecond = '{"firstcategory":[{"id":1,"brandName":"耐克","categoryId":1,"brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","categoryId":1,"brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","categoryId":1,"brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"哥伦比亚","categoryId":1,"brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"匡威","categoryId":1,"brandLogo":"brand5.png","categoryName":"运动馆"}],"secondcategory":[{"id":6,"brandName":"艾萨拉","categoryId":2,"brandLogo":"brand6.png","categoryName":"女士馆"},{"id":7,"brandName":"匡与威","categoryId":2,"brandLogo":"brand7.png","categoryName":"女士馆"},{"id":8,"brandName":"匡儿童威","categoryId":2,"brandLogo":"brand8.png","categoryName":"女士馆"}]}'
   
    


  
//思考：使用jQuery方法为什么不行？
// console.log($('#left li'));
// $('#left li').onclick = function () {

// }


//二级分类渲染
function secondCategory(i) {
    var strSecondCategory = (new Function("return" + str))();
    //此处的i为当前函数接收的点击的一级分类品牌的id,动态渲染对应该一级分类的二级品牌
    secondFirstArr = strSecondCategory.cate[i];
    if (secondFirstArr) {
   // 如果二级分类区域有对应一级分类品牌的id品牌，动态渲染
    var oUl1 = document.getElementById('right');
   // 清空上一次二级分类区域的内容
    oUl1.innerHTML = "";
    for (var m = 0; m < secondFirstArr.length; m ++) {
        
            var oLi = document.createElement('li');
            var oA = document.createElement('a');
            var oImg = document.createElement('img');
            oImg.src = "img/images/" + secondFirstArr[m].brandLogo;
            var oP = document.createElement('p');
            oP.innerHTML = secondFirstArr[m].brandName;
            oA.appendChild(oImg);
            oA.appendChild(oP);
            oLi.appendChild(oA);
            oUl1.appendChild(oLi);
      
        }   //如果没有对应一级分类品牌id的二级品牌，提示用户当前分类为空
    } else {
        var oLi = document.createElement('li');
        var oA = document.createElement('a');
        var oP= document.createElement('p');
        oP.innerHTML = "抱歉，当前分类暂无商品";
        oP.style.height = "25px";
        oP.style.width = "200px";
        oP.style.color = "red";
        // oUl.innerHTML = oLi;   //思考为什么这种方法不行？？？？
        oA.appendChild(oP);
        oLi.appendChild(oA);
        var oUl1 = document.getElementById('right');
        //清空上一次二级分类区域的展示内容
        oUl1.innerHTML = "";
        oUl1.appendChild(oLi);
    }
}
// li绑定的点击事件触发的函数
function showSecond(categoryId) {
  //  遍历存放在数组list中的每一个li
    for (var n = 0; n < list.length; n++) {
        // $("list[categoryId]").addClass("now"); //思考：添加addclass的方式为什么不行？？？？
        //给当前点击的li设置now的样式
        list[categoryId].style.borderRight = "none";
        list[categoryId].style.background = "white";
        list[categoryId].style.color = "orange";
        //清除上一个点击的li的样式
        list[n].style.background = "gainsboro";
        list[n].style.color = "black";
        list[n].style.borderRight = "1px solid gray";
    }
    //调用二级分类品牌渲染函数，传参数当前点击的一级分类品牌li的id
    secondCategory(categoryId);
}

