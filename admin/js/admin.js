//后台管里系统的公共js文件
//6、进度显示
//当ajax发生请求显示进度条；ajax请求中没响应过来，显示进度加载；ajax请求结束，进度条走完

//进度条的配置，禁用进度环,否则会和退出按钮重叠
NProgress.configure({showSpinner:false});
//进行ajax请求的都会执行这个方法 -----开启进度条
$(window).ajaxStart(function(){
    NProgress.start();
})

//请求成功，结束进度条
$(window).ajaxComplete(function(){
    NProgress.done();
})