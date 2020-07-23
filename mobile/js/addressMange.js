//MUI组件需要初始化
mui.init();

//通过new mui.PopPicker()初始化popPicker组件；layer设置列数三级联动；buttons显示控制按钮
var picker = new mui.PopPicker({
    layer: 3,
    buttons: ['cancle', 'ok']
});

//填充三级联动数据
picker.setData([{
    value: '110000',
    text: '北京市',
    children: [{
        value: "110101",
        text: "北京市",
        children: [{
            value: "110101",
            text: "东城区"
        }, {
            value: "110102",
            text: "西城区"
        }, {
            value: "110103",
            text: "崇文区"
        }, {
            value: "110104",
            text: "宣武区"
        }, {
            value: "110105",
            text: "朝阳区"
        }, {
            value: "110106",
            text: "丰台区"
        }, {
            value: "110107",
            text: "石景山区"
        }, {
            value: "110108",
            text: "海淀区"
        }]
    }]
}, {
    value: '120000',
    text: '天津市',
    children: [{
        value: "120100",
        text: "天津市",
        children: [{
            value: "120101",
            text: "和平区"
        }, {
            value: "120102",
            text: "河东区"
        }, {
            value: "120103",
            text: "河西区"
        }, {
            value: "120104",
            text: "南开区"
        }, {
            value: "120105",
            text: "河北区"
        }, {
            value: "120106",
            text: "红桥区"
        }, {
            value: "120107",
            text: "塘沽区"
        }, {
            value: "120108",
            text: "汉沽区"
        }, {
            value: "120109",
            text: "大港区"
        }, {
            value: "120110",
            text: "东丽区"
        }, {
            value: "120111",
            text: "西青区"
        }]
    }]
}, {
    value: '130000',
    text: '河北省',
    children: [{
        value: "130100",
        text: "石家庄市",
        children: [{
            value: "130102",
            text: "长安区"
        }, {
            value: "130103",
            text: "桥东区"
        }, {
            value: "130104",
            text: "桥西区"
        }, {
            value: "130105",
            text: "新华区"
        }, {
            value: "130185",
            text: "鹿泉市"
        }, {
            value: "130186",
            text: "其它区"
        }]
    }, {
        value: "130200",
        text: "唐山市",
        children: [{
            value: "130202",
            text: "路南区"
        }, {
            value: "130203",
            text: "路北区"
        }, {
            value: "130204",
            text: "古冶区"
        }, {
            value: "130205",
            text: "开平区"
        }, {
            value: "130207",
            text: "丰南区"
        }]
    }, {
        value: "130300",
        text: "秦皇岛市",
        children: [{
            value: "130302",
            text: "海港区"
        }, {
            value: "130303",
            text: "山海关区"
        }, {
            value: "130304",
            text: "北戴河区"
        }, {
            value: "130321",
            text: "青龙满族自治县"
        }, {
            value: "130322",
            text: "昌黎县"
        }]
    }, {
        value: "130600",
        text: "保定市",
        children: [{
            value: "130602",
            text: "新市区"
        }, {
            value: "130603",
            text: "北市区"
        }, {
            value: "130604",
            text: "南市区"
        }, {
            value: "130621",
            text: "满城县"
        }, {
            value: "130622",
            text: "清苑县"
        }, {
            value: "130623",
            text: "涞水县"
        }, {
            value: "130624",
            text: "阜平县"
        }, {
            value: "130625",
            text: "徐水县"
        }, {
            value: "130626",
            text: "定兴县"
        }, {
            value: "130627",
            text: "唐县"
        }, {
            value: "130628",
            text: "高阳县"
        }, {
            value: "130629",
            text: "容城县"
        }, {
            value: "130630",
            text: "涞源县"
        }, {
            value: "130631",
            text: "望都县"
        }, {
            value: "130632",
            text: "安新县"
        }, {
            value: "130633",
            text: "易县"
        }, {
            value: "130634",
            text: "曲阳县"
        }, {
            value: "130635",
            text: "蠡县"
        }, {
            value: "130636",
            text: "顺平县"
        }]
    }, {
        value: "130700",
        text: "张家口市",
        children: [{
            value: "130702",
            text: "桥东区"
        }, {
            value: "130703",
            text: "桥西区"
        }, {
            value: "130705",
            text: "宣化区"
        }, {
            value: "130706",
            text: "下花园区"
        }, {
            value: "130721",
            text: "宣化县"
        }, {
            value: "130722",
            text: "张北县"
        }]
    }, {
        value: "131000",
        text: "廊坊市",
        children: [{
            value: "131002",
            text: "安次区"
        }, {
            value: "131003",
            text: "广阳区"
        }, {
            value: "131022",
            text: "固安县"
        }, {
            value: "131023",
            text: "永清县"
        }, {
            value: "131024",
            text: "香河县"
        }, {
            value: "131025",
            text: "大城县"
        }]
    }, {
        value: "141100",
        text: "吕梁市",
        children: [{
            value: "141102",
            text: "离石区"
        }, {
            value: "141121",
            text: "文水县"
        }, {
            value: "141122",
            text: "交城县"
        }, {
            value: "141123",
            text: "兴县"
        }, {
            value: "141124",
            text: "临县"
        }]
    }]
}])


//点击收货地址栏，触发三级联动事件
$('#city').click(function(){
    //pickers[2]中的index指定默认显示第几层级；
    // setSelectedIndex(2, 1000)中第一个数字代表指定默认显示层级中的第几条数据；第二个数据代表展示指定数据的过渡时间

    // picker.pickers[2].setSelectedIndex(2, 1000);

    //显示城市列表
    picker.show(function (items) {
        //如果城市的一级和二级一致，一级城市为空
        if (items[0].text == items[1].text) {
            items[0].text = '';
        }
        //城市栏一次显示一级，二级，三级城市的名称，三级城市如果没有为空
        $('#city').val(items[0].text + items[1].text + (items[2].text || ''));
        $('#city').css('color',"black");

    })

})


// //*return false; 可以阻止选择框的关闭
// //隐藏picker  如:picker.hide()

// var picker = new mui.PopPicker();
// picker.setData([{
//     value: "first",
//     text: "第一项",
// }, {
//     value: "second",
//     text: "第一项"
// }, {
//     value: "third",
//     text: "第三项"
// }, {
//     value: "fourth",
//     text: "第四项"
// }, {
//     value: "fifth",
//     text: "第五项"
// }])
//  4代表的显示当前数据选项数组中下标为4的数据，过渡时间用1秒
// picker.pickers[0].setSelectedIndex(4, 1000);
// //输出滚轮当前显示的内容
// picker.show(function(SelectedItem) {
//     console.log(SelectedItem);
// })
