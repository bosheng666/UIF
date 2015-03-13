//输入框列表
var inputList = {
    //用户列表 鼠标经过
    currentIndex: null,
    init: function () {
        $('#userName').unbind().bind({
            blur: function (e) { // 检测该用户名登录失败的次数
                if (this.value == "") {
                    $("label[name='userNameDefault']").html("请输入您的社区账户");
                    $("label[name='userNameDefault']").css("color", "#999");
                }
                else {
                    // 用户名检测成功后，清除错误信息
                    $('#userNameMsg').hide();
                    //var data = { 'uName': e.target.value };
                    //$.get('/userSignUp/isMustCaptcha', data, function (ErrCnt) {
                    //    if (ErrCnt) { // 如果登陆失败超过三次，则显示验证码
                    //        main.showCaptcha(true);
                    //    }
                    //});
                }
            },
            focus: function (e) {
                if (this.value != "") {
                    $("label[name='userNameDefault']").html("");
                }
                $("label[name='userNameDefault']").css("color", "#d5d5d5");
                $('#userName')[0].onkeydown = function () {
                    $("label[name='userNameDefault']").html("");
                }
                if ($('#email_tips').css('display') == 'none' && $("#email_tips li").length > 0) {
                    $('#email_tips').css('display', 'block');
                }
            },
            keydown: function (e) {
                switch (e.keyCode) {
                    // 向下键
                    case 40:
                        if (inputList.currentIndex == null || inputList.currentIndex >= $("#email_tips li").length - 1) {
                            inputList.currentIndex = -1;
                        };
                        inputList.currentIndex += 1;
                        inputList.focusCurrent(inputList.currentIndex);
                        break;
                        // 向上键
                    case 38:
                        if (inputList.currentIndex == null || inputList.currentIndex <= 0) {
                            inputList.currentIndex = $("#email_tips li").length;
                        };
                        inputList.currentIndex -= 1;
                        inputList.focusCurrent(inputList.currentIndex);
                        break;
                        // 回车键
                    case 13:
                        // 阻止回车提交事件
                        e.preventDefault();
                        $('#userNameMsg').hide();
                        inputList.userRender(inputList.currentIndex);
                        break;
                }
                if (e.keyCode == "9") {
                    $('#email_tips').css('display', 'none');
                }
            }
        });
        $("label[name='userNameDefault']").bind({
            click: function (e) {
                $('#userName')[0].focus();
            }
        });
        $('#email_tips li').unbind().bind({
            mouseover: function (e) {
                $("#email_tips li").attr('class', '');
                $(this).attr('class', 'active');
                inputList.currentIndex = inputList.getCurrentIndex($(this).find('span[name="spanUserName"]').html());
            },
            mouseout: function (e) {
                $(this).attr('class', '');
                inputList.currentIndex = inputList.getCurrentIndex($(this).find('span[name="spanUserName"]').html());
                return false;
            },
            click: function (e) {
                inputList.currentIndex = inputList.getCurrentIndex($(this).find('span[name="spanUserName"]').html());
                inputList.focusCurrent(inputList.currentIndex);
                inputList.userRender(inputList.currentIndex);
                return false;
            }
        }),
        $('#email_tips span[name="delUserName"]').unbind().bind({
            click: function (e) {
                inputList.currentIndex = inputList.getCurrentIndex($(this).parents('li').find('span[name="spanUserName"]').html());
                var val = $(this).parents('li').find('span[name="spanUserName"]').html();
                setUserList('success');
                //AjaxForJson(commonParams.dodoDevPath + '/userSignUp/clsCookie/uName/' + val, '', setUserList, null);
                function setUserList(data) {
                    if (data = "success") {
                        $($('#email_tips li')[inputList.currentIndex]).remove();
                        if ($('#email_tips li').length < 1) {
                            $('#email_tips').css('display', 'none');
                        }
                        if (val == $('#userName').val()) {
                            $('#userName').val('');
                        }
                    }
                }
                return false;
                return false;
            }
        }),
        //点击其他地方收起用户列表
        document.onclick = function (e) {
            e = e ? e : event;
            var srcEle = e.target || e.srcElement;
            if (srcEle.parentNode != undefined) { }
            if (srcEle.className == "email_tips" || srcEle.id == "userName" || srcEle.innerHTML == "请输入您的社区账户") {
                return;
            }
            else if (srcEle.parentNode && srcEle.parentNode.className == "email_tips") {
                return;
            }
            else {
                $("#email_tips").css('display', 'none');
            }
        };
    },
    getCurrentIndex: function (val) {
        for (var i = 0; i < $("#email_tips li").length; i++) {
            if (val == $($("#email_tips li")[i]).find('span[name="spanUserName"]').html()) {
                return i;
            }
        }
        return null;
    },
    focusCurrent: function (currentIndex) {
        $("#email_tips li").attr('class', '');
        $($("#email_tips li")[currentIndex]).attr('class', 'active');
    },
    userRender: function (currentIndex) {
        if (currentIndex != null) {
            $("label[name='userNameDefault']").html("");
            $('#userName').val($($("#email_tips li")[currentIndex]).find('span[name="spanUserName"]').html());
        }
        $('#email_tips').css('display', 'none');
    }
}

$(document).ready(function () {
    inputList.init();
});