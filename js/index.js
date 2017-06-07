/**
 * Created by wangbiaozy on 17/6/6.
 */
(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);
$(function () {
    //查询转赠记录
    $('.topBtn').click(function () {
        window.location.href = 'queryList.html';
    });

    //用户填写验证
    //手机号码验证
    var flagPhoneNum = 0,
        flagCount = 0;
    $('#phoneInput').on('input',function () {
        var $phoneInputVal = $('#phoneInput').val();
        if($phoneInputVal==""){
            $('.phoneNumberPrompt').fadeIn();
        }
        //134-139 150-152 158 159 182 187 188
        var $reg = /^1((3[4-9])||(5[0-2])||(5[8-9])||(8[8-9])||(82))\d{8}$/g;
        if(isNaN($phoneInputVal) || $phoneInputVal.length != 11||!($reg.test($phoneInputVal))){
            $('.phoneNumberPrompt').fadeIn();

        }else {
            $('.phoneNumberPrompt').fadeOut();
            flagPhoneNum = 1;
        }
    });
    //流量输入验证
    $('#countInput').on('input',function () {
       var $countInputVal = $('#countInput').val();
        if($countInputVal==""){
            $('.countPrompt').fadeIn();
        }
        var $reg =/^[0-9]*[1-9][0-9]*$/;
        if(isNaN($countInputVal)||!($reg.test($countInputVal))){
            $('.countPrompt').fadeIn();

        }else if($countInputVal<100){
            $('.countPrompt').fadeIn();
        }else{
            $('.countPrompt').fadeOut();
            flagCount = 1;
        }
    });

    //首页tab切换
    function tab($selector) {
        $selector.on('touchend','li',function () {
            console.log();
            var $index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active').end().parent().parent().nextAll().children().children().eq($index).addClass('act').siblings().removeClass('act');
        });
    }
    $.each($('#firstTab'),function (){
        tab($(this));
    });
    //转赠记录页TAB切换
    $('#giveTabTitle').on('touchend','li',function () {
        var $index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active').end().parent().nextAll('div').eq($index).addClass('act').siblings().removeClass('act');
    });


    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
        $('#mask').on('touchend',function () {
            showMask();
        });
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
    }
    //成功弹窗查看转赠记录
    $('.success').find('span').on('touchend',function () {
        window.location.href = 'queryList.html';
    });
    //失败弹窗确定按钮
    $('.lose').find('span').on('touchend',function () {
        $('.lose').fadeOut();
        hideMask();
    });
    //信息填写成功提交
    $('.submit').on('touchend',function () {
        if(flagPhoneNum == 1 && flagCount ==1){
            $('.success').fadeIn();
            showMask();
        }else if(flagPhoneNum != 1 && flagCount == 1){
            $('.phoneWron').fadeIn();
            showMask();
        }else if(flagPhoneNum == 1 && flagCount !=1){
            $('.countWron').fadeIn();
            showMask();
        }else if($('#phoneInput').val() == '' && $('#countInput').val() == ''){
            $('.phoneNumberPrompt').fadeIn();
            $('.countPrompt').fadeIn();
        }
    });
});