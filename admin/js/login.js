
$(function () {

    $('#denglu').bootstrapValidator({
        /*配置校验的不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*需要校验的表单元素 通过名称 name*/
        fields: {
            /*对应表单元素的name*/
            username: {
                /*校验规则 多个校验规则*/
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    /*配置一个校验规则*/
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码必须是6-18个字符'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码需要由数字，字母或者_ .组成'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {

        /*校验成功的时候出发*/
        /*阻止表单的默认提交  使用ajax提交*/
        e.preventDefault();
        /*后台校验用户名和密码*/
        var $form = $(e.target);
        var userNameValue = $("#inputUserName3").val();//取前台用户名的值
        var passwordValue = $("#inputPassword3").val();//取前台密码的值

        $.ajax({

            type: 'post',
            url: './json/first.json',
            data:
                [
                    //获取表单的序列化数据
                    $form.serialize(),
                    userNameValue,
                    passwordValue
                ],
            dataType: 'json',
            success: function (data) {
                /*业务成功*/
                if (data.success == true) {
                    //业务成功的情况下，如果有返回地址，根据返回地址跳转，没有返回地址，直接跳转到登录页
                    // var returnUrl = location.search.replace('?returnUrl=', '');
                    // if (returnUrl) {
                    //     location.href = returnUrl;
                    // } else {
                    CreateCookie("userName", $("#inputUserName3").val(), 24, "/");//缓存用户名userName=$("userName").value,过期时间24,Path/
                    CreateCookie("password", $("#inputPassword3").val(), 24, "/");//缓存用户密码,过期时间,Path
                    /*跳转后台的首页*/
                    location.href = './index.html';

                }
                /*业务失败*/
                else {
                    if (data.error == 1000) {
                        /*用户名错误*/
                        /*设置用户名这个表单元素的校验状态为失败*/
                        /*NOT_VALIDATED 还没校验, VALIDATING 校验中, INVALID 失败 or VALID 成功*/
                        /*1.获取校验组件*/
                        /*2.调研更改状态的函数*/
                        /*3.校验的表单，改成什么状态，使用哪个校验规则*/
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    } else if (data.error == 1001) {
                        /*密码错误*/
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }
                // removeCookie("userName");

            }
            
        });

    });


    function manlogincook() {
        var userNameValue = cookie("userName");
        var passwordValue = cookie("password");
        if (userNameValue.length != 0) {
            // cookie验证成功直接跳转到登录页面
            //  location.href="./manage.html"
            // 检测已经登录的时候 自动填充用户名与密码
            $("#inputUserName3").val(userNameValue);
            $("#inputPassword3").val(passwordValue);
        }
    }

    manlogincook();
  

});

