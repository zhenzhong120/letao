
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


//5、模态框的调用:----第二种方法：通过js代码调用，前面第一种是给触发的按钮绑定属性
$('#quit').on('click', function () {
    $('#myModal').modal('show');
    $('#confirm').click(function () {
        location.href = "./login.html"
    })
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
        url: './json/CategoryFirst.json',
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

