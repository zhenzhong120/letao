$(function(){
    $('#form').bootstrapValidator({
        /*默认不去校验的表单元素（包含隐藏）*/
        excluded: [],
        //3）配置校验的不同状态下显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //4）需要校验的表单元素，通过名称 name
        fields: {
            //对应表单元素的name
            second: {
                Validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }

            },
            categoryId: {
                Validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandLogo: {
                Validators: {
                    notEmpty: {
                        message: "请上传二级分类图片"
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
                    // window.page = 1;
                    //解决追加渲染的问题
                    // render();
                    $('#CategoryAdd').modal('hide');
                }
            }
        });
    });
})