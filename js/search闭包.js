
//1、搜索历史功能的实现
$(function () {
    let max_history = 5;

    // localStorage.clear();
    var data = localStorage.getItem('data');
    if (!data) {
        $('.history').css('display', 'none');
        $('#historydetails').css('display', 'none');
        $('.historynone').css('display', 'block');
    } else {
        $('.history').css('display', 'block');
        $('#historydetails').css('display', 'block');
        $('.historynone').css('display', 'none');
        historydata(JSON.parse(data));
    }

    var oA = document.getElementById("search");
    oA.onclick = function () {
        // $('#text').on('focus',function(){
        //   $('#text').val = '';
        if (!data) {
            $('.history').css('display', 'none');
            $('#historydetails').css('display', 'none');
            $('.historynone').css('display', 'block');
        } else {
            $('.history').css('display', 'block');
            $('#historydetails').css('display', 'block');
            $('.historynone').css('display', 'none');
            historydata(JSON.parse(data));
        }
    }
    // $('#text').on('blur',function(){

    //     $('.history').css('display','none');
    //     $('#historydetails').css('display','none');
    //     init_history();
    // })

    var oA = document.getElementById("search");
    oA.onclick = function () {

        var str = $('#text').val();
        var data = localStorage.getItem('data');
        if (data) {
            var arr = JSON.parse(data);
        } else {
            var arr = [];
        }

        arr.push(str);
        removalDuplicate(arr);
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
    function removalDuplicate(arr) {
        for (let i = 0; i < arr.length; i++) {
            var arritem = arr[i].trim();
            if (arritem == '') {
                arr.splice(i, 1);
            }
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

    function historydata(searchArr) {
        searchArr.reverse();
        var list = [];
        if (searchArr.length <= max_history) {
            for (let i = 0; i < searchArr.length; i++) {
                $('#history').append(`<li><a href="">${searchArr[i]}</a><a  id="clear1" href="javascript:;" class="iconfont icon-chahao"></a></li>`);
                var oHistory = document.getElementById("history");
                var oAclear = document.getElementById("clear1");
                var oLi = document.getElementsByTagName("li");
                list.push(oAclear);
            }
        } else {
            for (let i = 0; i < max_history; i++) {
                $('#history').append(`<li><a href="">${searchArr[i]}</a><a  id="clear1" href="javascript:;" class="iconfont icon-chahao"></a></li>`);
                var oHistory = document.getElementById("history");
                var oAclear = document.getElementById("clear1");
                var oLi = document.getElementsByTagName("li");
                list.push(oAclear);
            }
        }
      function fn(){
        var arr = [];
        for (var m = 0; m < list.length; m ++) {
            arr[m] = function(){
                return m;
            }();
        }   
        return arr;
    }
    (function(){
       var list = fn();
       for(var i = 0;i < list.length;i ++ ){
             //2、点击叉号，如果给list[m]绑定事件，结果是只有最后一个叉号绑定上了事件---解决办法：事件委托，将叉号按钮的点击事件委托给父元素ul
             console.log(i);

             oHistory.onclick = function (event) {
                
                var e = event || window.event;
                var target = e.target || e.srcElement;
            
               console.log(i);
                // oLi[m].remove();
               
                // oLi :nth-of-type(m).remove();
                //3、for里面声明变量m，如果用let,点击每一个叉号，此处输出的m值都是list.length-1;
                //如果是var声明变量m，点击每一个叉号，此处输出的m值都是list.lenght;
            
            // }
        }
   
       }
    })()
            //2、点击叉号，如果给list[m]绑定事件，结果是只有最后一个叉号绑定上了事件---解决办法：事件委托，将叉号按钮的点击事件委托给父元素ul
            // oHistory.onclick = function (event) {
                
            //     var e = event || window.event;
            //     var target = e.target || e.srcElement;
            
            //    console.log(m);
            //     oLi[m].remove();
               
                // oLi :nth-of-type(m).remove();
                //3、for里面声明变量m，如果用let,点击每一个叉号，此处输出的m值都是list.length-1;
                //如果是var声明变量m，点击每一个叉号，此处输出的m值都是list.lenght;
            
            // }
        // }
   
        // function Delete(m){
        //        oHistory.onclick = function (event) {
                
        //         var e = event || window.event;
        //         var target = e.target || e.srcElement;
            
        //        console.log(m);
        //         oLi[m].remove();
               
        // }
        // }
    }

    // 思考：为什么jquery方法没有绑定成功事件
    // $('clear1').on('onclick',function(){
    //     $(this).parentNode.remove();

    // })

    function init_history() {
        $('#history').html('');
    }
    // // var str = localStorage.historyItems;
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
})
