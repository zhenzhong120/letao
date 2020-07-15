function Slide(id) {
    this.ele = document.getElementById(id);
    this.oUllis = document.getElementsByTagName('li');
    // this.oUllis = this.ele.children[0].children;

    this.num = this.oUllis.length;
    this.createEle = function () {
        //创建和获取元素的各种方法！！！
        var oL = document.createElement('ol');
        var arr = [];
        for (var i = 0; i < this.num; i ++) {
            var li = document.createElement('li');
            oL.appendChild(li);

            arr.push(li);
        }
      
        this.ele.appendChild(oL);
      
        return arr;
    }


    //创建小圆点
    this.oLlis = this.createEle();
    //大图轮播
    this.slide = function () {
        for (let i = 0; i < this.num; i ++) {
            this.oUllis[i].style.display = "none";
            this.oLlis[i].style.background = "gray";
        }
        this.oUllis[this.indexA].style.display = "block";
        this.oLlis[this.indexA].style.background = "white";
    }
    this.indexA = 0;
    this.slide();
    
    //自动轮播
    this.timer = null;
    this.autoPlay = function () {
     
        //注意字母的大小写
        this.timer = setInterval(() => {
     //此处计时器里用普通函数function(){}，this指向window,取不到this.slide()这个函数，提示未定义
    //箭头函数可以自动改变函数中的this指向，指向所在函数的父级作用域所绑定的对象this-----this.autoPlay ,此处只装轮播图的div
           
            this.slide();
            this.indexA ++;
            if (this.indexA == this.num) {
                this.indexA = 0;
            }
          
           
        }, 3000)
    }
    this.autoPlay();

}