// $(function(){
// let max_history = 5;
// $('text').on('focus',function(){
//   $('text').val = '';
//   let data = localStorage.getItem('data');
//   if(!data){
//       $('history').css('display','none');
//       $('historydetails').css('display','none');
//       $('historynone').css('display','block');
//   }else{
//     $('history').css('display','block');
//     $('historydetails').css('display','block');
//     $('historynone').css('display','none');
//     historydata(JSON.parse(data));
//   }

// })




// var str = localStorage.historyItems;
  
var oTxt = document.getElementById("text");
// oTxt.value = "";
var oBtn = document.getElementById("search");
// var oUl = document.querySelector("ul");
var oUl = document.getElementById("history");
// var list = [];
oBtn.onclick = function(){
  
    // var str = oTxt.Value;
    // var oSpan = document.createTextNode(str);
    var oLi = document.createElement('li');
    // var txt = document.createTextNode(str);
    var oAs = document.createElement("a");
    oAs.innerHTML = oTxt.value;
     oLi.appendChild(oAs);
     var oA = document.createElement("a");
     oA.className = "iconfont icon-chahao";
     oLi.appendChild(oA);
    //  list.push(oA);
    //  for(var i = 0;i < list.length; i ++){
    //  list[i].onclick = function(){
    //     this.parentNode.remove();
    //  }
    // }
   
    oA.onclick = function(){
            // var e = evt || window.evevt;
            // e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
             this.parentNode.remove();//删除oA的父元素li
    }
     if(oUl.firstElementChild){
         oUl.insertBefore(oLi,oUl.firstElementChild);
     }else{
         oUl.appendChild(oLi);
     }
}
var oSpanclear = document.getElementById("clear");
oSpanclear.onclick = function(){
    oUl.remove();
}
// })
