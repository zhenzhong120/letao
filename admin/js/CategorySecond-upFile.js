
$(function () {

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
        $('#tbody').html('');
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
        $('#save').modal('show');
        // $('selector').find('option[disabled]').attr('selected',true);
        // $('option[disabled]').attr('selected','true');
        // $('option[disabled]').attr('selected','true');
        //改变option的值为请选择，再次刷新时
        //解决点击添加分类，后台数据渲染累加的问题  
        $('ul li').remove();
        //清空上一次输入的内容
        $("input[type='text']").val('');
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
                <li onclick="javascript:add(${item.id});"id="${item.id}"><a href="#">${item.firstCategory}</a></li>
                 `;
                    $('.dropdown-menu').append(str);

                })
            }
        })

    })

    add = function (n) {
        var firstContent = $('#' + n).find('a').html();
        //显示选中的分类名称
        $('.categoryName').html(firstContent);
        //创建隐藏的input表单，是为了取到一级分类的id值，点击确认按钮时，发送给后台，不这样做，由于作用域的原因取不到id
        $('[name=categoryId]').val(n);
        //！！！！！自己创建的用于校验的input标签需要手动改变校验状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    }


    //8、图片上传功能
    //初始化上传插件
    initFileUpLoad();
    //点击上传组件，异步上传
    function initFileUpLoad() {
        $('[name="pic1"]').fileupload({
            //上传地址-----后台接口
            url: './json/addCategorySecond.json',
            //返回格式
            dataType: 'json',
            //上传成功, 把后台传过来的图片地址放到图片显示的位置
            done: function (e, data) {

                $('#uploadImage').attr('src', data.result.picAddr);
                $('[name="brandLogo"]').val(data.result.picAddr);
                  //！！！！！自己创建的用于校验的input标签需要手动改变校验状态
                $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
            }

        });
    }

    //9、校验插件
    //初始化校验插件
    //1)是form表单结构，并且有一个提交按钮
    //2）该插件就是jQuery插件，样式和bootstrap风格一致

//     $('#form').bootstrapValidator({
   
//         /*默认不去校验的表单元素（包含隐藏）
//         excluded为空，表示所有的都去校验，包含默认的隐藏表单元素；
// 里面如果添加条件，说明指定条件的不去校验*/
//         excluded: [],
//         //3）配置校验的不同状态下显示的图标
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         //4）需要校验的表单元素，通过名称 name
//         fields: {
//             //对应表单元素的name
//             brandName: {
//                 validators: {
//                     notEmpty: {
//                         message: '请输入二级分类名称'
//                     }
//                 }

//             },
//             categoryId: {
//                 validators: {
//                     notEmpty: {
//                         message: '请选择一级分类'
//                     }
//                 }
//             },
//             brandLogo: {
//                 validators: {
//                     notEmpty: {
//                         message: '请上传二级分类图片'
//                     }
//                 }
//             }
//         }


//     }).on('success.form.bv', function (e) {
//         alert(0);
//         //阻止表单的默认提交，使用ajax提交
//         e.preventDefault();
        
//     })

    $('#form').bootstrapValidator({
        message: 'This value is not valid',
        /*默认不去校验的表单元素（包含隐藏）*/
        excluded:[],
        /*配置校验的不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*需要校验的表单元素 通过名称 name*/
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
     
        e.preventDefault();

        var $form = $(e.target);

        $.ajax({
            type:'post',
            url:' ./json/first.json',
            data:$form.serialize(),
            dataType:'json',
           
            success:function (data) {
                if(data.success == true){
                    $('#save').modal('hide');
                    window.page = 1;
                    //添加完之后重新渲染页面
                    render();
                  
                }
            }
        });
    });
 
   
})