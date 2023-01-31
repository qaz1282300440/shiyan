$(function(){
    // 切换登入和注册的页面
    $('.dengru a').on('click' , function(){
        $('.dengru').hide();
        $('.zhucea').show();
    })
    $('.zhucea a').on('click' , function(){
        $('.zhucea').hide();
        $('.dengru').show();
    })
    // 定义密码的输入规则
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // 判断密码是否在6-12位之间
        pass:[/^[\S]{6,12}$/,'密码必须在6-12位之间！'],
        // 判断密码和确定密码是否相同
        panduan:function(res){
            let r1 = $('.mima1 [name=password]').val()
            if(r1!==res){
                return '两次密码不一致'
            }
        }
    })
    // 注册模块请求服务
    // http://www.liulongbin.top:3007
    axios. defaults. baseURL='http://www.liulongbin.top:3007'
    $('#zhucea').on('submit' , async function(e){
        e.preventDefault()
        let r1 = $(this).serializeArray();
        let r2 = {}
        $.each(r1,function(xiaobiao,neiron){
            r2[neiron.name]=neiron.value
        })
        $.post('http://www.liulongbin.top:3007/api/reguser',r2).then((res) => {
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('.zhucea a').click();
            $('#zhucea [name=username]').val('')
            $('#zhucea [name=password]').val('')
        })
    })
    // 登入模块
    $('#zhuce').on('submit' , function(e){
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/login',
        $(this).serialize()).then((res) => {
            console.log(res);
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            localStorage.setItem('token',res.token)
            location.href='/index.html'
        })
    })
})
