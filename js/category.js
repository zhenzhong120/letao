//一级分类渲染
var str =  '{"first":[{"categoryName":"运动馆","id":1},{"categoryName":"女士馆","id":2},{"categoryName":"男士馆","id":3},{"categoryName":"帆布馆","id":4},{"categoryName":"户外馆","id":5},{"categoryName":"单加馆","id":6}]}'
var categorystr = (new Function("return" + str))();
var arr = categorystr.first;


var oUl = document.getElementById('left');
// 6、获取DOM元素，不需要加选择器符号#，直接写id的属性值

for(var i = 0,len = arr.length;i<len;i ++){
	console.log(arr[i].id);
   


	// var str1 = `
	// <li>${arr[i].categoryName}</li>
	// `;
    // arr[i].index = i;
	var li = document.createElement('li');

	// if(i == 0){
	// 	li.className = "now";
	// }
	i == 0 ?li.className = "now" : "";
	//5、 注意i的下标为0，需要加恒等号==，等号=不可以
     
	
	// li.className = i = 0? "now" : "";
	li.innerHTML = arr[i].categoryName;
	oUl.appendChild(li);

	
	   
	//7、字符串只能写在一行上
	//     var strSecond = '{"firstcategory":[{"id":1,"brandName":"耐克","categoryId":1,"brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","categoryId":1,"brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","categoryId":1,"brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"哥伦比亚","categoryId":1,"brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"匡威","categoryId":1,"brandLogo":"brand5.png","categoryName":"运动馆"}],"secondcategory":[{"id":6,"brandName":"艾萨拉","categoryId":2,"brandLogo":"brand6.png","categoryName":"女士馆"},{"id":7,"brandName":"匡与威","categoryId":2,"brandLogo":"brand7.png","categoryName":"女士馆"},{"id":8,"brandName":"匡儿童威","categoryId":2,"brandLogo":"brand8.png","categoryName":"女士馆"}]}'
	// 	var categorySecondstr =  (new Function("return" + strSecond))();
	// 	var secondFirstArr = categorySecondstr.firstcategory;
	// 	var firstId = arr[0].id;
		
		
			
	// 	var oUl = document.getElementById('right');
	// if(i  == 0){
    //     for(var m = 0; m < secondFirstArr.length; m ++){
	// 		if (firstId = secondFirstArr[m].categoryId){
	// 		var oLi = document.createElement('li');
	// 		var oA = document.createElement('a');
	// 		var oImg = document.createElement('img');
	// 		oImg.src = "img/images/" + secondFirstArr[m].brandLogo;
	// 		var oP = document.createElement('p');
	// 		oP.innerHTML = secondFirstArr[m].brandName;
	// 		oA.appendChild(oImg);
	// 		oA.appendChild(oP);
	// 		oLi.appendChild(oA);
	// 		// oUl.innerHTML = oLi;
	// 		oUl.appendChild(oLi);
	// 	   }
	// 	}
	// }
	
}		
// 渲染一级分类对应的二级分类
	    var strSecond = '{"firstcategory":[{"id":1,"brandName":"耐克","categoryId":1,"brandLogo":"brand1.png","categoryName":"运动馆"},{"id":2,"brandName":"阿迪","categoryId":1,"brandLogo":"brand2.png","categoryName":"运动馆"},{"id":3,"brandName":"新百伦","categoryId":1,"brandLogo":"brand3.png","categoryName":"运动馆"},{"id":4,"brandName":"哥伦比亚","categoryId":1,"brandLogo":"brand4.png","categoryName":"运动馆"},{"id":5,"brandName":"匡威","categoryId":1,"brandLogo":"brand5.png","categoryName":"运动馆"}],"secondcategory":[{"id":6,"brandName":"艾萨拉","categoryId":2,"brandLogo":"brand6.png","categoryName":"女士馆"},{"id":7,"brandName":"匡与威","categoryId":2,"brandLogo":"brand7.png","categoryName":"女士馆"},{"id":8,"brandName":"匡儿童威","categoryId":2,"brandLogo":"brand8.png","categoryName":"女士馆"}]}'
		var categorySecondstr =  (new Function("return" + strSecond))();
		var secondFirstArr = categorySecondstr.firstcategory;	
		var oUl = document.getElementById('right');
		for(var m = 0; m < secondFirstArr.length; m ++){
		var oLi = document.createElement('li');
		var oA = document.createElement('a');
		var oImg = document.createElement('img');
		oImg.src = "img/images/" + secondFirstArr[m].brandLogo;
		var oP = document.createElement('p');
		oP.innerHTML = secondFirstArr[m].brandName;
		oA.appendChild(oImg);
		oA.appendChild(oP);
		oLi.appendChild(oA);
			// oUl.innerHTML = oLi;
		oUl.appendChild(oLi);
		}
//点击一级分类，渲染对应的二级分类
    
	console.log($('#left li'));
	$('#left li').onclick = function(){


	}