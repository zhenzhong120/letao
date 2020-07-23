
//1、下拉菜单的显示隐藏的动画效果
var oDiv = document.getElementById('menu');
var oUl = document.getElementById('category-detail');
var stop = true;
oDiv.onclick = function () {
    if (stop) {
        // oUl.style.display = "block";
        $(oUl).slideDown();
    } else {
        // oUl.style.display = "none";
        $(oUl).slideUp();
    }
    stop = !stop;
}

// $(oDiv).click(function () {
//     $(oUl).slideToggle();
// })
//4、点击侧栏按钮，左边导航栏的显隐切换，以下两种写法
// $('#side').click(function(){
//     $('#aside').toggle();
// })

var stop = true;
$('#side').click(function () {
    if (stop) {
        $('#aside').hide();
    } else {
        $('#aside').show();
    }
    stop = !stop;
})



//创建模态框三种方法：
//1、HTML中创建
//2、js利用字符串模板方法创建模态框，追加到body中，因为多个页面都用到模态框的调用，可以写在一个公共js文件里，提高复用性，减少各个页面的代码量
var modal = `
 <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog" role="document" id="modalContent">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">温馨提示</h4>
                </div>
                <div class="modal-body">
                    <p>您确定要退出后台管理系统吗？</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>
    </div> 
`;
//方法3：将模态框的HTML代码转换为js字符串追加到到$('body')中，借助www.css88.com在线转换工具
$('body').append(modal);

//5、模态框的调用:----第二种方法：通过js代码调用，前面第一种是给触发的按钮绑定属性
$('#quit').on('click', function () {
    $('#myModal').modal('show');
})

//6、点击菜单选项，ajax进度条
//进度条方法1：bootstrap进度条的使用，有缺陷 
// var oLiFirst  = document.getElementById('first');
// var oLiTwo   = document.getElementById('second');
// oLiFirst.onclick = function(){
//ajax请求成功时开启进度条，利用计时器，到100%停止进度条的显示
//可以设置进度条的百分比的显示与隐藏，在HTML里可以修改进度条和百分比文本的颜色
// $.ajax({
//     type: "GET",
//     url: "./json/first.json",
//     dataType: "json",
//     success: function (data) {

//         var i = 0;
//         var mDiv = setInterval(function () {
//             if (i >= 100) {
//                 clearInterval(mDiv);
//             }
//             var myDiv = document.getElementById("progressBar");
//             myDiv.style.width = i + "%";
//             myDiv.innerText = "";

//             // myDiv.innerText = i + "%";
//             i ++;
//         }, 20)

//     }
// })


// }

//7、动态渲染数据表格及分页插件的创建！！！！！
//一级分类页面表格数据的动态渲染；分页插件的动态创建
window.page = 1;

//进度条方法2： nprogress进度条插件  
//ajax请求，渲染一级分类数据
var render = function () {
    //调用一级分类数据函数
    getCateFirstData(function (str) {
        //先渲染表格数据
        var arr = str.data;
        arr.forEach(function (item, index) {
            var str = `
            <tr>
            <td>${item.id}</td> 
            <td>${item.firstCategory}</td>
            <td>${item.secondCategory}</td> 
            <td><img src="./img/${item.logoImg}"></td>
            </tr>
        `;
            $('#tbody').append(str);
        })

        //配置参数，动态创建分页插件
        $('.pagination').bootstrapPaginator({
            //对应的bootstrap版本，2.x的分页必须使用div元素；3.x的分页必须使用ul元素
            bootstrapMajorVersion: 3,
            //设置分页插件的大小
            size: 'small',
            //当前页
            currentPage: str.page,
            //总页数
            totalPages: Math.ceil(str.total / str.size),
            //分页插件显示的页码数
            numberOfPages: 3,
            //给分页插件的每个页码绑定事件
            onPageClicked: function (event, originalEvent, type, page) {
                window.page = page;
                //清空上一次表格中的内容，避免重复
                $('#tbody').html('');
                //点击页码，再次调用ajax数据请求，渲染表格数据，动态创建分页插件
                render();

            }
        })
    });
}
render();

//给后台发送请求，当前页数page，和每页显示的数据条数pagesize；
// 后台根据前端发送的请求数据，返回对应的当前点击页码，每页显示条数，以及数据总条数
//每页表格的数据显示依据后台

function getCateFirstData(callback) {
    $.ajax({
        type: 'get',
        url: './json/CategorySecond.json',
        dataType: 'json',
        data: {
            page: window.page || 1,
            pagesize: 3

        },
        success: function (str) {
            //     var arr = str.data;
            //     arr.forEach(function (item, index) {
            //     var str = `
            //     <tr>
            //     <td>${item.id}</td> 
            //     <td>${item.firstCategory}</td>
            //     </tr>
            // `;
            //     $('#tbody').append(str);             
            //     })
            callback && callback(str);

        }
    })
}

//点击添加分类，弹出模态框，利用文件上传插件
$('#addCategory').click(function () {
    $('#CategoryAdd').modal('show');
    // $('#dropDown li').remove();
    $.ajax({
        type: "get",
        url: "./json/addCategory.json",
        datatype: "json",
        data:
        {
            page: 1,
            size: 100

        },
        success: function (data) {
            var dataArr = data.data;
            dataArr.forEach(function (item, index) {
                var str = `
                <li id="${item.id}"><a href="#">${item.firstCategory}</a></li>
                 `;
                $('.dropdown-menu').append(str);

            })


        }
    })
    
    //选中之后更改文本框中的内容？？？？？
    $('#dropDown li').click(function(){
        var firstContent = $(this).find('a').html();
      $('.categoryName').html(firstContent);

})

//一级分类调用后台接口，请求数据，传递参数page，和pagesize,和表格渲染时一样
//bootstrap表单，表单校验插件，文件上传插件
//选择后台传过来的一级分类数据后，获取一级分类数据的id，添加二级分类，上传图片logo
// 进行ajax请求，将id和二级分类名称及图片logo发送给后台，当后台返回success，二级分类表格里就有了当前分类名称

})