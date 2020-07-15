
function ajax(url,fn){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//GET/POST/PUT
	xhr.open('GET',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			if(typeof fn === 'function'){
				fn(xhr.responseText);
			}
		}
	}
}
//面向对象思想
// var ajax = {};
// ajax.get = function(url,fn){
// 	var xhr = new XMLHttpRequest();
// 	xhr.open('get',url,true);
// 	xhr.send(null);
// 	xhr.onreadystatechange = function(){
// 		if(xhr.readyState === 4 && xhr.status === 200){
// 			if(typeof fn=== 'function'){
// 				fn(xhr.responseText);
// 			}
// 		}
// 	}
// }

// ajax.post = function(url,data,fn){ //data : 表示访问后端的参数
// 	var xhr = new XMLHttpRequest();
// 	xhr.open('POST',url,true);
// 	//设置http协议的请求头
// 	xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=utf-8');
// 	xhr.send(data);  //'key=value&key=value'
// 	xhr.onreadystatechange = function(){
// 		if(xhr.readyState === 4 && xhr.status === 200){
// 			if(typeof fn === 'function'){
// 				fn(xhr.responseText);
// 			}
// 		}
// 	}
	
// }