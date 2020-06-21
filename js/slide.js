function Slider(id){
	//属性
	this.ele = $(id);
	
	this.oUllis = this.ele.children[0].children;

	this.num = this.oUllis.length;
	
	this.createEle = function(){
		//创建小圆点
		//创建ol
			let ol = $create('ol');
			//创建一个放li的数组
			let arr = [];
			for(let i = 0;i < this.num;i ++){
				let li = $create('li');
				ol.appendChild(li);
				arr.push(li);
			}
		this.ele.appendChild(ol);
			return arr;
		}//注意符号位置的书写
		
	        
    
	//创建页面所需元素并返回所有ol中的li
	this.oOllis = this.createEle();
	this.slide = function(){
		//大图轮播
	  for(let i = 0;i < this.num; i ++){
	 	//所有大图隐藏
		this.oUllis[i].style.display = "none";
	
				
		//所有小圆点灰色
	    this.oOllis[i].style.background = "gray";
				
	  }
	  this.oUllis[this.indexA].style.display = "block";
	  this.oOllis[this.indexA].style.background = "white";
	 
	}
	 	//设置当前轮播图片的下标
	 	this.indexA = 0;
	 	this.slide();
	 	//计时器返回值
	 	this.timer = null;
	 	
	this.autoPlay = function(){
		this.timer = setInterval(() => {
			this.indexA ++;
			if(this.indexA == this.num){
				this.indexA = 0;
			}
			this.slide();
		},3000)
	}
	this.autoPlay();
}


//tools
function $(id){
	return document.getElementById(id);
}
function $create(tagName){
	return document.createElement(tagName);
}