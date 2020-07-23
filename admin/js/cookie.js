//1、创建cookie

function CreateCookie(key, value, expires, path) {
    //   'key=value;path=/'
    var cookieText = encodeURIComponent(key) + '=' + encodeURIComponent(value) + ';path=/';
    if (typeof expires === 'number' && expires >= 0) {
        var date = new Date();
        date.setDate(date.getDate() + expires);
        //'key=value;path=/;expires=' + 日期对象;
        cookieText += ';expires=' + date;
    }
    document.cookie = cookieText;
}

//2、获取cookie
//方法1：截取
function cookie(key) {
    var cookieKey = encodeURIComponent(key) + '=';
    var start = document.cookie.indexOf(cookieKey);
    if (start != -1) {
        var end = document.cookie.indexOf(';', start);
        if (end === -1) {
            end = document.cookie.length;
        }

        var cookieValue = decodeURIComponent(document.cookie.substring(start + cookieKey.length, end));
        return cookieValue;
    }
}

//方法2：以分号和等号切割
function getCookie(key) {
   
    //cookie字符串以分号切割成数组
    var arr = document.cookie.split(';');
    for (var i = 0, len = arr.length; i < len; i ++) {
        //数组中的元素字符串以等号分隔成数组
        var list = arr[i].split('=');
        if (encodeURIComponent(key) === list[0]) {
            return decodeURIComponent(list[1]);
        }

    }
}


//3、删除cookie
//设置cookie的有效期为过期状态，
//另一种方法：删除创建cookie时expires>=0的条件，传一个负数进来，即为失效
function removeCookie(key){
    document.cookie = encodeURIComponent(key) + "=;expires=" + new Date(0) + ";path=/";

}
