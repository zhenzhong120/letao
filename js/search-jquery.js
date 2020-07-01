$(function(){   
let max_history = 10;
var data = localStorage.getItem('data');
if(!data){   
    $('.history').css('display','none');
    $('#historydetails').css('display','none');
    $('.historynone').css('display','block');
}else{
  $('.history').css('display','block');
  $('#historydetails').css('display','block');
  $('.historynone').css('display','none');
  historydata(JSON.parse(data));
}

$('#text').on('focus',function(){
  $('#text').val = '';
  if(!data){   
      $('.history').css('display','none');
      $('#historydetails').css('display','none');
      $('.historynone').css('display','block');
  }else{
    $('.history').css('display','block');
    $('#historydetails').css('display','block');
    $('.historynone').css('display','none');
    historydata(JSON.parse(data));
  }

})
$('#text').on('blur',function(){
  
    $('.history').css('display','none');
    $('#historydetails').css('display','none');
    init_history();
})

var oA  = document.getElementById("search");
oA.onclick = function(){
    
    var str = $('#text').val();
    var data = localStorage.getItem('data');
    if(data){
        var arr = JSON.parse(data);
    }else{
        var arr = [];
    }

 arr.push(str);
 removalDuplicate(arr);
 localStorage.setItem('data',JSON.stringify(arr));
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
function removalDuplicate(arr){
    for(let i = 0;i < arr.length;i ++){
        var arritem = arr[i].trim();
        if(arritem == ''){
            arr.splice(i,1);
        }
        if(arritem !== ""){
            for(let j = i + 1;j < arr.length; j ++){
                if(arr[i] == arr[j]){
                    arr.splice(i,1);
                }
            }
        }
    }
    return arr;
}

function historydata(searchArr){
    searchArr.reverse();
    if(searchArr.length <= max_history){
        for(let i = 0;i < searchArr.length;i ++){
            $('#history').append(`<li><a href="">${searchArr[i]}</a><a href="javascript:;" class="iconfont icon-chahao"></a></li>`);
        }
    }else{
        for(let i = 0; i < max_history; i ++){
            $('#history').append(`<li><a href="">${searchArr[i]}</a><a href="javascript:;" class="iconfont icon-chahao"></a></li>`);
        }
    }
}



function init_history(){
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
