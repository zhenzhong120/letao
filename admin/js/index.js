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



//2、eCharts柱状图的使用
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('histogram'));

// 指定图表的配置项和数据
var option = {
    //图表的标题
    title: {
        text: '2017年注册人数'
    },
    //鼠标移动上去的提示框组件
    tooltip: {},
    //图例说明，需要和下面鼠标指针的提示框中的name信息保持一致，否则无法显示
    legend: {
        data: ['人数']
    },
    //X轴数据选项，类目名称列表
    xAxis: {
        // data: ["1月", "2月", "3月", "4月", "5月", "6月"] 数据需要动态获取
        data: []
    },
    //y轴
    yAxis: {},
    //手指针信息 系列列表
    series: [{
        //系列名称
        name: '人数',
        type: 'bar',
        // data: [1000, 2000, 3600, 1400, 1200, 2220]  数据需要动态获取
        data: []
    }]
};

//图表中的数据需要从后台动态获取回来
var BarData = [
    {
        "name": "1月",
        "value": 3000
    },
    {
        "name": "2月",
        "value": 2000
    },
    {
        "name": "3月",
        "value": 3600
    },
    {
        "name": "4月",
        "value": 1400
    },
    {
        "name": "5月",
        "value": 1200
    },
    {
        "name": "6月",
        "value": 2220
    },

]
var xData = [];
var yData = [];
BarData.forEach(function (item, i) {
    xData.push(item.name);
    yData.push(item.value);
})
//这些数据是option这个对象的属性
option.series[0].data = yData;
option.xAxis.data = xData;

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);




//  3、echarts饼图
var lineChart = echarts.init(document.getElementById('line'));
optionLine = {
    //折线图标题
    title: {
        text: '热门品牌销售',
        subtext: '2017年6月',
        left: 'center'
    },
    //鼠标移动上去的提示框组件
    tooltip: {
        trigger: 'item',
        //提示框组件内容显示格式
        //a series的name；b series的data的name； c series的data的value ； d 占比
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    //图例说明
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克', '阿迪', '新百伦', '李宁', '安踏']
    },
    //系列相关的配置项。
    series: [
        {
            name: "销售情况",
            //pie饼图，bar柱状图
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            //饼图数据详情
            data: [
                { value: 335, name: '耐克' },
                { value: 310, name: '阿迪' },
                { value: 234, name: '新百伦' },
                { value: 135, name: '安踏' },
                { value: 1548, name: '李宁' }
            ],

            //高亮状态下的多边形和标签样式。
            emphasis: {
                //地图区域的多边形 图形样式。
                itemStyle: {
                    //图形阴影的模糊大小
                    shadowBlur: 10,
                    //阴影水平方向上的偏移距离。
                    shadowOffsetX: 0,
                    //阴影颜色
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

lineChart.setOption(optionLine);

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


// 进度条方法2： nprogress进度条插件
// var oLiFirst = document.getElementById('first');
// var oLiTwo = document.getElementById('second');
// 一级分类页面跳转,同时进行数据请求，渲染一级分类页面
// oLiFirst.onclick = function () {
//     location.href = "CategoryFirst.html";
//     $.ajax({
//         type: "GET",
//         url: "./json/first.json",
//         dataType: "json",
//         success: function (data) {
//             var str = (new Function('return' + data))();
//             if (str.success) {              
//             }

//         }
//     })
// }

