//图片滚动器
var playPic = {
    //按钮 滚动容器  每张图片宽度 
    initPicPlayer: function (btnObj, animteObjName, imgWidth) {
        var btns = btnObj;
        //选中的按钮
        var selectedBtn;
        //自动播放的id
        var playID;
        //选中图片的索引
        var selectedIndex;
        //选中的图片
        var selectedItem;
        //选中的按钮
        var selectedBtn;
        //自动播放的id
        var playID;
        //选中图片的索引
        var selectedIndex;
        for (var i = 0; i < btns.length; i++) {
            (function () {
                var index = i;
                btns[i].onclick = function () {
                    if (selectedBtn == this) {
                        return;
                    }
                    setSelectedItem(index);
                    return false;
                };
            })();
        }
        setSelectedItem(0);
        function setSelectedItem(index) {
            selectedIndex = index;
            clearInterval(playID);
            $("#" + animteObjName).animate({ left: -imgWidth * index }, 500, function () {
                //自动播放方法
                playID = setTimeout(function () {
                    var index = selectedIndex + 1;
                    if (index >= btns.length)
                        index = 0;
                    setSelectedItem(index);
                }, 5000);
            });
            if (selectedBtn) {
                selectedBtn.className = "";
            }
            selectedBtn = btns[parseInt(index)];
            btns.removeAttr('class');
            var that = btns[selectedIndex];
            $(that).attr('class', 'current');
        }
    }
}
$(document).ready(function () {
    playPic.initPicPlayer($('div[name="imgIndex"] a'), 'LoginAlbumConDiv', 655);
});