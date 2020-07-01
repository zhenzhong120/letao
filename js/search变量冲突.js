
//1、搜索历史功能的实现
$(function () {
    let max_history = 10;

   
    var data = localStorage.getItem('data');
    if (!data) {
        $('.history').css('display', 'none');
        $('#historydetails').css('display', 'none');
        $('.historynone').css('display', 'block');
    } else {
        $('.history').css('display', 'block');
        $('#historydetails').css('display', 'block');
        $('.historynone').css('display', 'none');
        //如果历史搜索记录中有数据，则调用搜索记录渲染方法
        historydata(JSON.parse(data));
    }

    var oA = document.getElementById("search");
    oA.onclick = function () {
        //jquery方法中的得焦事件
        // $('#text').on('focus',function(){  
        //   $('#text').val = '';    
        if (!data) {
            $('.history').css('display', 'none');
            $('#historydetails').css('display', 'none');
            $('.historynone').css('display', 'block');
        } 
        else {
            $('.history').css('display', 'block');
            $('#historydetails').css('display', 'block');
            $('.historynone').css('display', 'none');
            //如果历史搜索记录中有数据，则调用搜索记录渲染方法
            historydata(JSON.parse(data));
        }
    }
    //jQuery方法中的失焦事件
    // $('#text').on('blur',function(){
    //     $('.history').css('display','none');
    //     $('#historydetails').css('display','none');
    //     init_history();
    // })

    var oA = document.getElementById("search");
    oA.onclick = function () {
        var str = $('#text').val();
        //判断有无历史搜索记录
        //取出来历史搜索记录 取出来是json对象
        var data = localStorage.getItem('data');
        if (data) {
            var arr = JSON.parse(data);   
        } else {
            var arr = [];
        }
        //将最新搜索的内容添加到历史搜索记录中
        arr.push(str);
        //去除空串和重复搜索记录
        removalDuplicate(arr);
        //将用户输入的搜索记录json对象改为json字符串存放到历史记录data中，存进去是json字符串
        localStorage.setItem('data', JSON.stringify(arr));
    }
    // $('#search').on('onclick',function(){
    //     console.log(0);
    //     var str = $('#text').value;
    //     var data = localStorage.getItem('data');
    //     if(data){
    //         var arr = JSON.parse(data);
    //     }else{
    //         var arr = [];
    //     }
    //  arr.push(str);
    //  removalDuplicate(arr);
    //  localStorage.setItem('data',JSON.stringify(arr));
    // })

    //去除空串和重复搜索记录
    function removalDuplicate(arr) {
        for (let i = 0; i < arr.length; i++) {
            //去除搜索记录左右两边的空格
            var arritem = arr[i].trim();
            if (arritem == '') {
                //如果历史搜素记录数组中的元素去除空格之后为空串，即没有输入搜索内容，空的情况下，则在历史搜索记录中删除该条记录
                //从历史搜索记录数组中的当前元素下标开始删，删掉一条记录
                arr.splice(i, 1);
            }
            //如果历史搜素记录数组中的每个元素去除空格之后不是空串，即用户输入了搜索内容，判断用户输入的搜索记录是否重复
            //如果用户输入重复的搜索内容，则删除第一条，只保留重复记录中的第二条
            if (arritem !== "") {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] == arr[j]) {
                        arr.splice(i, 1);
                    }
                }
            }
        }
        return arr;
    }

    //每条搜索记录对应的叉号的点击事件。因为是嵌套在$(function(){})函数中写的方法，需要加window.提升为全局事件
    // window.clearOnclick = function (i) {
    //     console.log(i);
    // }
    
    //渲染历史搜索记录
    function historydata(searchArr) {
       // 逆序存放原数组中的元素：
        //1）数组的方法；
        //2）也可以在渲染数组时，按照i=arr.length-1;i>=0;i -- 的思想渲染历史记录数据
        // searchArr.reverse();
        // var list = [];

        //优化代码：用if选择判断历史搜索记录是否大于历史搜索记录限定的最大条数；如果小于，则max等于输入的条数；大于，则max等于限定条数
        // var max = 0;
        // if (searchArr.length <= max_history) {
        //     max = searchArr.length;
        // } else {
        //     max = max_history;
        // }

        //优化代码：用三元法判断历史搜索记录是否大于历史搜索记录限定的最大条数；如果小于，则max等于输入的条数；大于，则max等于限定条数
        var max = searchArr.length <= max_history ? searchArr.length : max_history;
        //循环遍历，渲染数据，循环中就要创建元素，并且绑定事件，否则在当前局部作用域外无法获取i的值，只能取到length-1的i值
        //整个循环从页面加载开始执行，只遍历一次，从i=0遍历到i=length-1,在此循环的过程中就绑定上了事件，但只有在点击的时候才会触发该方法
        //并且在循环过程中绑定事件，就要传值变量i出去，这样外面才可以取到遍历过程中每一个i的值
        //id值具有唯一性，所以在创建元素并且给每一个元素添加绑定事件时，需要给每一元素添加一个不一样的id值，否则id值一样，无法判断获取到的是哪一个元素
        for (let i = 0; i < max; i++) {
            //给每一个创建出来的叉号按钮绑定事件的方法1----行内引入js,需要传值，将每一次遍历的变量i传出去
            // $('#history').append(`<li><a href="">${searchArr[i]}</a><a  id="clear${i}"  onClick="javascript:clearOnclick('${i}');"  class="iconfont icon-chahao"></a></li>`);
            $('#history').append(`<li><a href="">${searchArr[i]}</a><a  id="clear${i}" class="iconfont icon-chahao"></a></li>`);
 
            //给每一个创建出来的叉号绑定事件的方法2：在循环过程中添加事件，每一次循环都要创建该元素，并且给该元素绑定事件，也要传值i
            // oAclear.onclick = Function("clearOnclick('" + i + "');");
            // li.onclick = Function("showSecond('" + i + "');"); //给li绑定事件，并且传参
          var a = document.getElementById(`clear${i}`);
           a.onclick = function(){
               console.log(localStorage);
            
            this.parentNode.remove();
            //刷新页面
            location.reload([true]);
//             var data = localStorage.getItem('data');
               f(i);
               function f(i){
                var list = JSON.parse(localStorage.getItem('data'));
                list.splice(i, 1);
                localStorage.setItem('data', JSON.stringify(list));
                // localStorage.removeItem(data); 删除历史搜索记录，只能通过key来删除，历史记录中存放的数据是键值对的形式
                // 但是此处如果用key，data的形式删除的话，相当于数组中存放的所有历史记录都删除了，所以先将历史记录取出来转成对象数组，
                // 然后删除数组中指定下标的元素，最后再将删完之后的数组以字符串的形式存入历史记录的data属性中
                // 自动刷新页面
                history.go(0);
            }
            
           }
          
      
        }
    }
//jQuery选择器绑定方法：click事件,不是onclick事件驱动
    $('#clear').on('click',function(){
        $('#history').html('');
         localStorage.clear();
         //自动刷新页面
       history.go(0);
        
    })
    //清空所有历史记录
    //原生DOM元素绑定事件方法：onclick 事件驱动
// var oClear = document.getElementById('clear');
// oClear.onclick = function(){
//     $('#history').html('');
//    localStorage.clear();
//    //自动刷新页面
//    history.go(0);
// }
    // function init_history() {
    //     $('#history').html('');
    // }
})



    //给每一个li中的叉号绑定事件的另外一种笨重的方法---方法3：
      //  在循环遍历历史搜索记录时，在外面提前创建一个空数组list,每一次下标i循环时，都将每一次创建的叉号按钮添加至数组中，
      //循环遍历完在外面在遍历一次存放好每一个叉号按钮的数据list,然后再给每一个叉号list[m]绑定事件，繁琐
//这种在循环遍历史搜索记录的过程中，将每一次创建的叉号按钮存放至新数组的方法，前提需要注意，每一个叉号的id不能写死，即每一个都要具有唯一性
//否则绑定事件时，每一个叉号的id值都一样，无法判断是给哪一个添加的事件，实现效果是只有一个叉号绑定上了事件
            // var oAclear = document.getElementById(`clear${i}`);
            // list.push(oAclear);
        // for (let m = 0; m < list.length; m++) {
        //1.找出每一个叉子
        //     var ocha = list[m];
        //     console.log(ocha);
        //     2.给每一个叉子绑定事件
        //     ocha.onclick = function () {
        //         alert(m);
        //     }


             // 2、点击叉号，如果给list[m]绑定事件，结果是只有最后一个叉号绑定上了事件，但其实是因为id值不唯一，无法判断点击的哪一个叉号
            //  ---解决办法：事件委托，将叉号按钮的点击事件委托给父元素ul
            // oHistory.onclick = function (event) {
           //     for(var n = 0;n < list1.length; n ++){
           //     var e = event || window.event;
          //     var target = e.target || e.srcElement;
            //     console.log(oLi);
           //     oLi[m].remove();
          // }

            // oLi :nth-of-type(m).remove();
          // 3、for里面声明变量m，如果用let,点击每一个叉号，此处输出的m值都是list.length-1;
           // 如果是var声明变量m，点击每一个叉号，此处输出的m值都是list.lenght;


    // 思考：为什么jquery方法没有绑定成功事件
    // $('clear1').on('onclick',function(){
    //     $(this).parentNode.remove();
    // })

    //留言板效果，不具有历史搜索记录缓存功能
    //  var str = localStorage.historyItems;
    // var oTxt = document.getElementById("text");
    // // oTxt.value = "";
    // var oBtn = document.getElementById("search");
    // var oUl = document.getElementById("history");
    // oBtn.onclick = function(){
    //     // var str = oTxt.Value;
    //     // var oSpan = document.createTextNode(str);
    //     var oLi = document.createElement('li');
    //     // var txt = document.createTextNode(str);
    //     var oAs = document.createElement("a");
    //     oAs.innerHTML = oTxt.value;
    //      oLi.appendChild(oAs);
    //      var oA = document.createElement("a");
    //      oA.className = "iconfont icon-chahao";
    //      oLi.appendChild(oA);  
    //     oA.onclick = function(){
    //              this.parentNode.remove();
    //     }
    //      if(oUl.firstElementChild){
    //          oUl.insertBefore(oLi,oUl.firstElementChild);
    //      }else{
    //          oUl.appendChild(oLi);
    //      }
    // }
    // var oSpanclear = document.getElementById("clear");
    // oSpanclear.onclick = function(){
    //     oUl.remove();
    // }

