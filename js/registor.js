//做正则检验，限定用姓名和密码的格式
//设置密码的可见性
//点击登录，调用ajax请求，判断如果输入正确，则跳转到加入购物车时的详情页

// var oInputname = document.getElementById('name');
// var oInputpssword = document.getElementById('password');
// var oInputlogin = document.getElementById('login');
// var oHidden = document.getElementById('img');
// var oAregister = document.getElementById('reg');
//此处用赋值给一个变量的方法不能获取
// var str = oInputname.value;
// var Str = $('#name').val();
var re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
var re1 = /^[\u4e00-\u9fa5]{2,4}$/;
var re2 = /^[a-zA-Z]\w{5,17}$/;
// var str1 = oInputpssword.value;


//注意逻辑的顺序，先理清思路再写代码
// 先判断用户是否输入了用户名和密码，如果为空，提示进行输入，如果输入了进行正则校验，输入一项进行一项验证
// var re1 = /^[a-zA-Z]\w{5,17}$/;
$('#login').click(function () {

    if (!($('#password').val())) {
        var oPrompt = document.getElementById('prompt');
        var oPromptLogin = document.getElementById('promptLogin');
        oPrompt.style.display = "block";
        oPromptLogin.innerHTML = "用户名和密码不能为空";
        setTimeout(() => {
            oPrompt.style.display = "none";
        }, 3000)


    } else {
        password();

    }
    if (!($('#name').val())) {
        var oPrompt = document.getElementById('prompt');
        var oPromptLogin = document.getElementById('promptLogin');
        oPrompt.style.display = "block";
        oPromptLogin.innerHTML = "用户名和密码不能为空";
        setTimeout(() => {
            oPrompt.style.display = "none";
        }, 3000)

    } else {
        name();
       
    }


    function password() {

        if (!re2.test($('#password').val())) {
            var oPrompt = document.getElementById('prompt');
            var oPromptLogin = document.getElementById('promptLogin');
            oPrompt.style.display = "block";
            oPromptLogin.innerHTML = "请重新输入密码";
            setTimeout(() => {
                oPrompt.style.display = "none";
            }, 3000)
        }
    }
    function name() {
        if (!(re.test($('#name').val())) && !(re1.test($('#name').val()))) {
            var oPrompt = document.getElementById('prompt');
            var oPromptLogin = document.getElementById('promptLogin');
            oPrompt.style.display = "block";
            oPromptLogin.innerHTML = "请重新输入姓名或者手机号";
            setTimeout(() => {
                oPrompt.style.display = "none";
            }, 3000)
        }
    }
    var strName = $('#name').val();
    var strPassword = $('#password').val();

    ajax('./json/registor.json?name=strName&&password=strPassword',function(data){
        var strLogin = (new Function('return' + data))();
        //判断两个值是否相等，用==，=是赋值
   if((strName == strLogin.name )&& (strPassword == strLogin.password)){
  location.href = "./login.html";
   }
    })



})
var oSpan = document.getElementById('img');
var Stop = true;

//遗留问题：如何将密码框的小黑点变成星号？？？？
// var oInput = document.getElementById('password');
// oInput.onchange = function () {
//     var oInput = document.getElementById('password');
//     oInput.type = "text";

//     //设置密码的可见与隐藏
//     var str = $('#password').val();
//     //将字符串转为数组
//     var arr = str.split('');
//     for (var i = 0; i < arr.length; i++) {
//         arr.splice(i, 1, '*');
//     }
//     //将数组转为字符串
//     var str2 = arr.join('');
//     $('#password').val(str2);

// }
oSpan.onclick = function () {

    if (Stop) {
        var oInput = document.getElementById('password');
        oInput.type = "text";


    } else {

        var oInput = document.getElementById('password');
        oInput.type = "password";
    }
    Stop = !Stop;
}

