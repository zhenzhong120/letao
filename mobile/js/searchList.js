// 1、页面初始化的时候，将用户输入的关键字显示在搜索框内
// 2、页面初始化的时候根据上一个页面输入的关键字查询第一页数据n条，
// 3、当按照新的关键字进行搜索时，会从后台拉取商品数据回来进行页面渲染，重置排序功能
// 4、排序功能默认降序，用户点击排序时，会根据排序的选项去渲染数据
// 5、下拉刷新，根据当前条件渲染数据，上拉加载下一页功能重置
// 6、上拉加载下一页，没有数据就不去加载了

var params = {};
var search = location.search;
if (search) {
    search = search.replace('?', '');
    var arr = search.split("&");
    arr.forEach(function (item, i) {
        var itemArr = item.split("=");
        params[itemArr[0]] = itemArr[1];
    }
    )
}
//1、解码   页面初始化的时候，将用户输入的关键字显示在搜索框内
$('#text').val(decodeURIComponent(params.key));

// 2、页面初始化的时候就调用一次ajax请求，根据用户从上一个页面输入的关键字从后台查找到的商品信息渲染在页面上
ajax('./json/search.json?proName=decodeURIComponent(params.key)&&page=1&&pageSize=8', function (data) {
    let str = (new Function('return' + data))();
    var arr = str.data;
    
    var $div = $('#product');
    arr.forEach(function(value,index){
        // for (var i in arr) {
        //     var item = arr[i];
            var str1 = `
     <div class="details" id="${value.id}">
     <img src="./img/images/${value.img}"  >
     <span>${value.proName}</span> <br />
     <span>${value.money}</span><span>${value.dead_money}<br />
     <input id="${value.bt_id}" type="button" value="${value.bt_name}" />
 </div> 
     `;
//问题4：只有页面初始化和点击排序按钮之后，点击立即购买按钮才会跳转到商品详情页；另外，只有点击第一个商品明细中的立即购买按钮才会跳转
// 用户根据新的关键字点击搜索之后，再根据新渲染的页面中的立即购买按钮不会跳转；

            

            $('#product').append(str1);
            $(`#${value.bt_id}`).click(function () {
              
                location.href = "./details.html?productId=" + `${value.id}`;
            })
        })
       
    })

// var str = '{"page":1,"size":4,"data":[{"id":20,"proName":"adidas阿迪达斯 男式 场下休闲篮球鞋S83700","money":"￥560.00","dead_money":"￥888.00","img":"product.jpg","bt_name":"立即购买"},{"id":20,"proName":"adidas阿迪达斯 男式 场下休闲篮球鞋S83700","money":"￥560.00","dead_money":"￥888.00","img":"product.jpg","bt_name":"立即购买"},{"id":20,"proName":"adidas阿迪达斯 男式 场下休闲篮球鞋S83700","money":"￥560.00","dead_money":"￥888.00","img":"product.jpg","bt_name":"立即购买"},{"id":20,"proName":"adidas阿迪达斯 男式 场下休闲篮球鞋S83700","money":"￥560.00","dead_money":"￥888.00","img":"product.jpg","bt_name":"立即购买"}]}';
// var json = (new Function("return" + str))();


//3、点击搜索框，根据用户输入的新的关键字去后台请求数据，重新进行页面渲染,重置排序功能
$('#search').click(function () {
   

    //清除上一次的渲染的内容，不然点击一次，创建出来一次
    $('#product').html("");
    
    //ajax请求方法1：
    //  jquery这种方法${item.id}，不需要用加号连接字符串，它会自动当成变量解析
    //jquery中所有属性都方法化了，后面要加括号

    // 排序功能重置
    $('.order a').removeClass('selected').find('span').removeClass('iconfont icon-jiantoushang').addClass('iconfont icon-jiantouarrow483');

    var proname = $('#text').val();

    //问题3：如果用户没有输入关键字，return false，终止此次事件，此设置无法在线上运行，没改地址之前才会提示内容
    if (!proname) {
        
        $('#prompt').css('display', 'block');
        
       
         return false;
    }
    ajax('./json/search1.json?proName=proname&&page=1&&pageSize=8', function (data) {
        let str = (new Function('return' + data))();
        var arr = str.data;

        var $div = $('#product');
        arr.forEach(function(value,index){
        // for (var i in arr) {
        //     var item = arr[i];
            var str1 = `
     <div class="details" id="${value.id}">
     <img src="./img/images/${value.img}"  >
     <span>${value.proName}</span> <br />
     <span>${value.money}</span><span>${value.dead_money}<br />
     <input id="${value.bt_id}" type="button" value="${value.bt_name}" />
 </div> 
     `;
//问题4：只有点击排序按钮之后，点击立即购买按钮才会跳转到商品详情页；另外，只有点击第一个商品明细中的立即购买按钮才会跳转
//页面初始化时，点击立即购买按钮不会跳转； 用户根据新的关键字点击搜索之后，再根据新渲染的页面中的立即购买按钮不会跳转；

            

            $('#product').append(str1);
            $(`#${value.bt_id}`).click(function () {
              
                location.href = "./details.html?productId=" + `${value.id}`;
            })
        })
       
    })

    return false;
    // ajax请求方法2：jQuery方法
    // $.ajax({
    //     type: "GET",
    //     url: "./json/search.json",
    //     dataType: "json",
    //     data: {
    //         //给后台传递的数据，用get方法，以？号&&拼接参数的形式显示在url地址栏
    //         proName: decodeURIComponent(params.key),
    //         page: 1,
    //         pageSize: 4
    //     },
    //     success: function (data) {
    //         //上面约定的数据类型是json，此处就不用再转为json对象了
    //         console.log(data.page);
    //     }

    // })
   
})
// 4、排序功能默认降序，用户点击排序时，会根据排序的选项去渲染数据，
// 没选中的时候：黑色向下箭头，点击某个排序按钮，该按钮内容变成橘色,其他排序按钮恢复默认排序，变成灰色，箭头改为向下
// 选中的时候：当前按钮是橘色，判断该按钮当前是向上还是向下，点击该按钮，按钮方向反转
// 携带排序分类id和降序升序标识1/2发送ajax请求给后台，后台返回数据重新进行页面渲染

$('.order a').click(function () {
    //问题1：线上跑无法触发点击事件，打印输出内容，并且清空上一次ul????
    
    // $('#product').html("");
    var $this = $(this);
    if (!$this.hasClass('selected')) {
        
     
        $this.addClass('selected').siblings().removeClass('selected').find('span').removeClass('iconfont icon-jiantoushang').addClass('iconfont icon-jiantouarrow483');
    } else {
       
  
        if ($this.find('span').hasClass('iconfont icon-jiantouarrow483')) {
            $this.find('span').removeClass('iconfont icon-jiantouarrow483').addClass('iconfont icon-jiantoushang');

        } else {
            $this.find('span').removeClass('iconfont icon-jiantoushang').addClass('iconfont icon-jiantouarrow483');

        }
      
   //问题2:当排序按钮被选中，再次点击进行排序选择，可以进行ajax请求访问到json文件中的内容，但是无法改变箭头指向
      $('#product').html("");
        var proname = $('#text').val();
        ajax('./json/search2.json?proName=proname&&page=1&&pageSize=8', function (data) {
        
         
            let str = (new Function('return' + data))();
            var arr = str.data;

            var $div = $('#product');
            arr.forEach(function(value,index){
                // for (var i in arr) {
                //     var item = arr[i];
                    var str1 = `
             <div class="details" id="${value.id}">
             <img src="./img/images/${value.img}"  >
             <span>${value.proName}</span> <br />
             <span>${value.money}</span><span>${value.dead_money}<br />
             <input id="${value.bt_id}" type="button" value="${value.bt_name}" />
         </div> 
             `;
        //问题4：只有点击排序按钮之后，点击立即购买按钮才会跳转到商品详情页；另外，只有点击第一个商品明细中的立即购买按钮才会跳转
        //页面初始化时，点击立即购买按钮不会跳转； 用户根据新的关键字点击搜索之后，再根据新渲染的页面中的立即购买按钮不会跳转；
        //不能用for in 遍历数组，不能依次取值,不遵循下标依次递加的规律
                    
        
                    $('#product').append(str1);
                    $(`#${value.bt_id}`).click(function () {
                   
                        location.href = "./details.html?productId=" + `${value.id}`;
                    })
                })

        })

    }

})
 // history.go(0);


/* <div class="order">
		<!--当点击排序按钮时，span的class改为iconfont icon-jiantoushang，向上的箭头；给a添加class为selected-->
		<a id="time" href="#">上架时间<span class="iconfont icon-jiantouarrow483"></span></a>
		<a id="price" href="#">价格<span class="iconfont icon-jiantouarrow483"></span></a>
		<a id="sale" href="#">销量<span class="iconfont icon-jiantouarrow483"></span></a>
		<a id="discount" href="#">折扣<span class="iconfont icon-jiantouarrow483"></span></a>
	</div> */