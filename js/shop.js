// 购物车页需要登录=>点击购物车页，调用ajax请求，需要判断当前用户是否登录：
// 1、没有登录的情况需要跳转到登录页进行登录；
// 跳到登录页后输入账号信息，点击登录调用ajax请求，判断当前用户是否存在，存在的话登录成功返回到购物车页；
// 输入的账户信息不存在的话需要在登录页点击免费注册跳转到注册页进行注册，注册成功后返回登录页登录，登录成功后返回购物车页
// 2、登录的情况下，点击购物车直接进行ajax请求，渲染数据 

//点击刷新按钮，刷新购物车页
var oA = document.getElementById('new');
oA.onclick = function () {
	// history.go(0);
	location.reload([true]);
}

ajax.get('./json/shop.json?page=1&&pageSize=100', function (data) {
	var str = (new Function('return' + data))();
	var arr = str.data;
	//缓存第一次加载购物车页时后台传过来的数据，不用再次发送ajax请求
	window.cartData = arr;
	xuanRan(arr);
	// str.data.forEach(function(value,index){

})

function xuanRan(arr) {
	$("#cart_box").html('');
	if (arr.length) {
		for (let i = 0; i < arr.length; i++) {
			// ES6字符串模板方法，样式布局直接在css中写，数据改成动态，ES5动态创建元素，动态设置样式
			let str1 = `
		<div data-product="${arr[i].id}" class="mui-table-view-cell">
			<div class="mui-slider-right mui-disabled">
	
				<a data-id="${arr[i].id}" class="mui-btn mui-btn-blue" data-target="#modalShop"  onClick="javascript:update(${arr[i].id});">编辑</a>
			
				<a data-id="${arr[i].id}" class="mui-btn mui-btn-red" id="${arr[i].id}" onClick="javascript:remove(${arr[i].id});">删除</a>
			</div>
			<a href="javascript:;" class="mui-navigate-right mui-slider-handle">
				<div id="cartShop">
					<div class="cart">
						<div class="left">	
							<img src="img/images/${arr[i].img}" />
							<input type="checkbox" id="check${arr[i].id}" onClick="javascript:Order();"/>
						</div>
						<div class="right">
							<p class="font">${arr[i].font}</p>
	
							<p id="price"> <span class="nowPrice" id="now${arr[i].id}">${arr[i].nowPrice}</span><span class="oldPrice" id="old${arr[i].id}">${arr[i].oldPrice}</span><span class="num" id="num${arr[i].id}">${arr[i].num}</span>
								<span class="iconfont icon-jiantou row"></span>
							</p>
						
							<p id="sizeNum"><span id="size">${arr[i].size}</span></p>
						</div>
					</div>	
				</div>
			</a>
		</div>
	`
			//只能用jQuery选择器追加，不能用原生dom获取，然后$('oDiv')的写法
			$("#cart_box").append(str1);

		}
	} else {
		$("#cart_box").html('您的购物车空空如也');
	}

}

//点击滑块中的编辑按钮，弹出模态块，模态块中的尺码和数量从第一次请求购物车数据中提取，渲染到模态框中
//编辑模态框，选择尺码和加号按钮事件
update = function (n) {
	var oUl = document.getElementById('n1');
	//清除商品尺码累加渲染的问题,注意写法，以下三种都可以
	// $(oUl).html('');
	// $('#n1').html('');
	oUl.innerHTML = '';

	//第一次点击的商品，尺寸渲染一遍，第二次点击的商品，尺寸渲染二遍，第三次点击的商品，尺寸信息渲染三遍，一次递增；连续点击同一个商品，每点击一次，尺码信息增加一次	
	var arrData = window.cartData;
	for (var m = 0; m < arrData.length; m++) {
		var item = arrData[m];

		if (item.id == n) {
			for (var a = 0; a < item.sizedetails.length; a++) {
				var oLi = document.createElement('li');
				oLi.innerHTML = item.sizedetails[a];
				oLi.setAttribute("onclick", "Click" + "(" + a + ")");
				oUl.appendChild(oLi);
			}

			// 用正则将字符串中的数字提取出来
			var oSpan = document.getElementById('number');
			var numArr = item.num.match(/\d+/g);
			var numStr = numArr.join('');
			oSpan.innerHTML = numStr;

			//给数量框的加号按钮绑定事件，因购物车中商品的数量上限为库存数，用到后台数据中的stock,所以需要在此处添加点击事件，否则取不到item
			var oInput1 = document.getElementById('add');
			var oSpan = document.getElementById('number');
			oInput1.onclick = function () {
				if (oSpan.innerHTML < item.stock) {
					oSpan.innerHTML++;
				} else {
					oSpan.innerHTML = item.stock;
					var oDivreduce = document.getElementById('numf');
					var oDivpronum = document.getElementById('pronum');
					oDivreduce.style.display = "block";
					oDivpronum.innerHTML = "亲亲，没有库存啦";
					setTimeout(() => {
						oDivreduce.style.display = "none";
					}, 3000)
				}
			}

		}

	}
	var arr = $(".mui-btn-blue");
	// oInput.setAttribute('data-toggle','modal');
	// oInput.setAttribute('data-target','.wq-add');

	arr[n].setAttribute('data-toggle', 'modal');
	arr[n].setAttribute('data-target', '.wq-add');
	var inputYes = document.getElementById('input1');
	var inputNo = document.getElementById('input2');

	inputNo.onclick = function () {
		//这种方法会影响下次模态框的访问
		// var oShop = document.getElementById('modalShop');
		// oShop.style.display = "none";
		//手动关闭模态框的方法
		$('#modalShop').modal('hide');
	}

	inputYes.setAttribute("onclick", "Modify" + "(" + n + ")");

}

var arrColor = [];
//设置开关，点击切换尺码选项的颜色,但是再点击其它尺码时，需要取消当前尺码的颜色，再点击其它按钮才会变色，或者点击其它按钮两次，体验不好
var Stop = true;
var oUl = document.getElementById('n1');
//注意函数名的写法，不能用关键字保留字，大驼峰命名法，首字母大写，否则无法实现点击事件
//尺码选择事件
Click = function (i) {
	if (Stop) {
		$(oUl.children[i]).siblings().css('background', 'transparent');
		oUl.children[i].style.background = "orange";
		arrColor.push(oUl.children[i]);

	} else {
		oUl.children[i].style.background = "transparent";
		arrColor.splice(i, 1);
	}

	Stop = !Stop;
}

//给数量框添加点击事件
var oInput = document.getElementById('reduce');
var oSpan = document.getElementById('number');
//减号
oInput.onclick = function () {
	if (oSpan.innerHTML > 1) {
		oSpan.innerHTML--;

	} else {
		oSpan.innerHTML = 1;
		var oDivreduce = document.getElementById('numf');
		var oDivpronum = document.getElementById('pronum');
		oDivreduce.style.display = "block";
		oDivpronum.innerHTML = "最少选择一件商品";
		setTimeout(() => {
			oDivreduce.style.display = "none";
		}, 3000)
	}
}

//编辑模态框修改商品信息，发送请求，修改商品页面信息
Modify = function (n) {
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
	ajax.get('./json/update.json?productId=n&&size=(arrColor[arrColor.length - 1]).innerHTML&&num=oSpan.innerHTML', function (data) {
		var str = (new Function('return' + data))();
		//编辑框修改完调用ajax，请求成功，根据修改后的信息修改缓存的数据window.cartData,然后根据window.cartData重新渲染页面
		if (str.success == true) {
			var arrUpdate = window.cartData;

			for (var m = 0; m < arrUpdate.length; m++) {
				var itemUpdate = arrUpdate[m];
				if (itemUpdate.id == n) {
					var oSpan = document.getElementById('number');
					itemUpdate.num = "X" + oSpan.innerHTML + "双";
					itemUpdate.size = "鞋码 : " + (arrColor[arrColor.length - 1]).innerHTML;
					$('#modalShop').modal('hide');
					xuanRan(arrUpdate);
					var oSpanTotal = document.getElementById('total');
					oSpanTotal.innerHTML = "￥0.00元";
					//!!!!问题：页面刷新之后，更改后的数据失效----使用cookie?
				}
			}
		}
	})



}
//删除模态框事件，删除成功发送请求，重新渲染页面
remove = function (n) {
	//取值方式改为id,根据class获取的出问题 debug,console.log排查
	// var Arr1 = $('.mui-btn-red');
	// var OspanRemove = Arr1[n];
	var OspanRemove = document.getElementById(n);
	OspanRemove.setAttribute('data-toggle', 'modal');
	OspanRemove.setAttribute('data-target', '.remove');
	var inputRemove = document.getElementById('input3');
	var inputCancel = document.getElementById('input4');

	inputCancel.onclick = function () {
		//手动关闭模态框的方法
		$('#modalRemove').modal('hide');
	}
	inputRemove.onclick = function () {
		ajax.get('./json/remove.json?productId=n', function (data) {
			var str = (new Function('return' + data))();
			if (str.success) {
				//jQuery属性选择器删除元素
				// $("div[data-product=" + n + "]").remove();
				$(OspanRemove).parent().parent().remove();
				$('#modalRemove').modal('hide');
				//删除之后调用订单金额合计函数，减去当前删除商品的金额合计
				Order();
			}
		})

	}

}

//商品复选框点击时的订单金额合计事件
//给元素设置点击属性绑定函数的形式，定义该函数时不能用funciton Order(){}的方法
Order = function () {

	var amountSum = 0;
	//获取所有选中的复选框，遍历，求出每一个对应的商品金额
	var $checkedBox = $('[type=checkbox]:checked');
	// $checkedBox.each(function (i, item) {
	if ($checkedBox.length) {
		for (var i = 0; i < $checkedBox.length; i++) {
			//取出当前复选框的id值
			var InputArr = $checkedBox[i].id.match(/\d+/g);
			var InputStr = InputArr.join('');
			//根据当前复选框的id值获取商品数据的单价和数量元素
			var oSpannow = document.getElementById("now" + InputStr);
			var oSpannum = document.getElementById("num" + InputStr);
			//取出当前复选框的id值对应的商品数据的单价数字
			var nowArr = oSpannow.innerHTML.match(/\d+\.\d+/g);
			var nowStr = nowArr.join('');
			//取出当前复选框的id值对应的商品数据的数量
			var numArr = oSpannum.innerHTML.match(/\d+/g);
			var numStr = numArr.join('');
			//都是string类型
			// console.log(typeof(nowArr[0]),typeof(numArr[0]));
			// console.log(typeof(nowStr),typeof(numStr));
			//计算当前点击的复选框对应的商品金额合计
			var amount = nowStr * numStr;
			//求出所有选中的复选框对应的商品金额合计
			amountSum += amount;


			// })
		}
		var oAmountSum = Math.floor(amountSum * 100) / 100;
		var Fetch = Math.floor(amountSum * 100);
		var oSpanTotal = document.getElementById('total');
		//金额乘以100向下取整，如果个位有数字不需要补0，没有数字不需要补0。
		//但是金额本身就是整数，乘以100之后，个位和百位都没有数字，也不需要补0；
		if (Fetch % 10 || Fetch % 100 == 0) {
			oSpanTotal.innerHTML = "￥" + oAmountSum + "元";
		} else {
			oSpanTotal.innerHTML = "￥" + oAmountSum + "0元";
		}
	} else {
		var oSpanTotal = document.getElementById('total');
		oSpanTotal.innerHTML = "￥0.00元";
	}



}

//全选
var oAllChecked = document.getElementById('allChecked');
var stop = true;

oAllChecked.onclick = function () {
	if (stop) {
		//获取所有input复选框，将其设置为选中状态，调用订单合计函数
		var $checkedBox = $('[type=checkbox]');
		$checkedBox.attr('checked', true);
		Order();


	} else {

		//获取所有input复选框，将其设置为选中状态，调用订单合计函数
		var $checkedBox = $('[type=checkbox]');
		$checkedBox.attr('checked', false);
		Order();


	}
	stop = !stop;

}

//批量删除
var oAllRemove = document.getElementById('compile');

oAllRemove.onclick = function () {
	this.innerHTML = "完成";
	var oP = document.getElementById('Fatotal');
	oP.style.display = "none";
	var oA = document.getElementById('payment');
	oA.innerHTML = "删除";
	oA.style.background = "white";
	oA.style.color = "red";
	oA.style.border = "1px solid black";
	oAllChecked.onclick = function () {
		if (stop) {

			var $checkedBox = $('[type=checkbox]');
			$checkedBox.attr('checked', true);
			Order();

		} else {
			var $checkedBox = $('[type=checkbox]');
			$checkedBox.attr('checked', false);
			Order();
		}
		stop = !stop;

	}
	oA.onclick = function () {
		var checkedBox = $('[type=checkbox]:checked');
		if (checkedBox.length) {
			for (var n = 0; n < checkedBox.length; n++) {
				//jQuery删除元素的方法
				$(checkedBox[n]).parent().parent().parent().parent().parent().remove();

			}

		}
	}
	oAllRemove.onclick = function () {
		this.innerHTML = "编辑";
		var oP = document.getElementById('Fatotal');
		oP.style.display = "block";

		var oA = document.getElementById('payment');
		oA.innerHTML = "生成订单";
		oA.style.background = "orangered";
		oA.style.color = "white";
		oA.style.border = "none";
		Order();
	}

}






//1、下拉刷新；默认有一个加载过程，将当前购物车页的内容加载出来
// 2、点击右侧箭头，侧滑效果，滑块内容编辑和删除；编辑和删除这块都需要判断是否登录

// 点击编辑，出现编辑模态框，编辑完之后发请求给后台，修改完商品尺码和数量之后购物车页也会更改；
// 编辑框中的商品信息获取不用再发一次ajax请求，第一次加载购物车的数据之后，商品里面的信息里有这些数据，存储起来，根据id获取该按钮对应的商品数据，提取出来，渲染编辑框，
// 更改商品尺码时，当前选中的尺码变为橘色；更改商品数量，提示限制库存数，这些信息都从缓存中的数据提取，编辑框的选择功能和商品详情页加入购物车的选择功能相似


// 点击删除，出现删除模态框，点击删除购物车页面当前商品删掉
// 删除商品也要发送ajax请求，成功之后删除该商品

// 3、选中图片下的按钮，生成订单处有价格的计算；
// 点击编辑，删除按钮的时候，也会计算金额，封装方法，多处调用

// 4、批量删除和全选