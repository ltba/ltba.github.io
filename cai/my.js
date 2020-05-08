var check = (function () {
    var callbacks = [], timeLimit = 50, open = false;
    setInterval(loop, 1);
    return {
        addListener: function (fn) {
            callbacks.push(fn);
        },
        cancleListenr: function (fn) {
            callbacks = callbacks.filter(function (v) {
                return v !== fn;
            });
        }
    }
    function loop() {
        var startTime = new Date();
        debugger;
        if (new Date() - startTime > timeLimit) {
            if (!open) {
                callbacks.forEach(function (fn) {
                    fn.call(null);
                });
            }
            open = true;
	    window.stop();
            alert('没事别老研究人家接口了，好好做站去吧');
            window.opener = null;
            window.open("", "_self", "");
            window.close();
        } else {
            open = false;
        }
    }
})();

check.addListener(function () {
	window.location.reload();
});

//想打开开发人员工具的注意了，以下代码没啥用！
document.onkeydown=function(){
    var e = window.event||arguments[0];
    if(e.keyCode==123){
        alert('手贱？');
            return false;
    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
        alert('手残？');
return false;
    }else if((e.ctrlKey)&&(e.keyCode==85)){
            alert('麒麟臂？');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==83)){
            alert('信不信我黑了你？');
        return false;
    }
}
document.oncontextmenu=function(){
    alert('黑了你！');
    top.location='http://lab.mkblog.cn/hacker/';
    return false;
}


//文章列表 要适当的换行<br>
var article_list = [
{title:"全民K歌接口",img:"ks.jpg",url:"Article/1.html",introduce:"知道uid就知道全部歌曲！"}
]

//文章实现
$(document).ready(function(){
    $(".article").html("<h1 style='text-align:center;'>水瓶座的文章</h1><br>");
    $(".head_image").html("<img src='https://ws1.sinaimg.cn/large/a15b4afegy1fqbcerhdtrj20fk0bot8q.jpg'>");
    for (var i=0;i<article_list.length;i++){
        $(".article").append("<div style='width:90%;height:200px;' class='" + i + "'><a style='text-decoration:none;' href='" + article_list[i].url + "'>" + "<div class='title'><p class='title_text'>" + article_list[i].title + "</p></div><div class='image' style='width:100%;'><img class='jiantu' style='float:left;' width='18%' height='100%' src='" + article_list[i].img + "'><div class='introduce'><p>" + article_list[i].introduce +"</p></div></div></a></div><br><br><br><br>");
    };
});

window.onload=function(){
    ap1.play();
};




function iframebf(url,id){/*定义播放器函数*/
    iframe = document.getElementById(id);
    iframe.src = url;
}
function getqqimage(id,qqid){/*定义取QQ头像函数*/
    img = document.getElementById(id);
    qq = document.getElementById(qqid).value;
    img.src = 'http://q4.qlogo.cn/g?b=qq&nk=' + qq + '&s=100';
}
function getico(id,urlid){/*定义取网站站标函数*/
    img = document.getElementById(id);
    web = document.getElementById(urlid).value;
    img.src = 'https://f.ydr.me/' + web;
}


