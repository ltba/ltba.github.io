/*
源自@猫与向日葵：https://imjad.cn
由水瓶座/ 改进
*/
String.prototype.render = function (context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
};

//NSFW
// $('#live2d').click(function (){
//     window.Live2D.clickCount |= 0;
//     window.Live2D.clickCount++;
    
//     if(window.Live2D.clickCount === 233 || (window.Live2D.clickCount >= 233 && window.Live2D.clickCount % 3 === 0)){
//         showMessage('是变态耶！', 5000, true);
//         loadlive2d('live2d', 'https://cdn.imjad.cn/usr/themes/Moricolor/assets/live2d/potionmaker/zenra.php?ts={ts}'.render({ts: Date.now()}));
//     }
// });

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000, true);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000, true);
});

$('#hitokoto').mouseover(function (){
    var text = '这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{author}</span> 在 {date} 时投稿的！'
    var hitokoto = JSON.parse($(this)[0].dataset.raw);
    text = text.render({source: hitokoto.source, author: hitokoto.author, date: hitokoto.date});
    showMessage(text, 3000);
});

$('.waifu-tool .fui-home').click(function (){
    window.location = 'https://yked.gitee.io/';
});

$('.waifu-tool .fui-eye').click(function (){
    //switchNightMode();
    change_model();
    showMessage('你会做眼保健操吗？', 3000, true);
});

$('.waifu-tool .fui-chat').click(function (){
    showHitokoto();
});

var Nep = new Array(
    "/live2d/api/HyperdimensionNeptunia/blanc_classic/index.json",
    "/live2d/api/HyperdimensionNeptunia/blanc_normal/index.json",
    "/live2d/api/HyperdimensionNeptunia/blanc_swimwear/index.json",
    "/live2d/api/HyperdimensionNeptunia/histoire/index.json",
    "/live2d/api/HyperdimensionNeptunia/histoirenohover/index.json",
    "/live2d/api/HyperdimensionNeptunia/nepgear/index.json",
    "/live2d/api/HyperdimensionNeptunia/nepgear_extra/index.json",
    "/live2d/api/HyperdimensionNeptunia/nepgearswim/index.json",
    "/live2d/api/HyperdimensionNeptunia/nepmaid/index.json",
    "/live2d/api/HyperdimensionNeptunia/nepnep/index.json",
    "/live2d/api/HyperdimensionNeptunia/nepswim/index.json",
    "/live2d/api/HyperdimensionNeptunia/neptune_classic/index.json",
    "/live2d/api/HyperdimensionNeptunia/neptune_santa/index.json",
    "/live2d/api/HyperdimensionNeptunia/noir/index.json",
    "/live2d/api/HyperdimensionNeptunia/noir_classic/index.json",
    "/live2d/api/HyperdimensionNeptunia/noir_santa/index.json",
    "/live2d/api/HyperdimensionNeptunia/noireswim/index.json",
    "/live2d/api/HyperdimensionNeptunia/vert_classic/index.json",
    "/live2d/api/HyperdimensionNeptunia/vert_normal/index.json",
    "/live2d/api/HyperdimensionNeptunia/vert_swimwear/index.json"
);
//var num = 1; num与window.num重复
var 计次 = 1;
$('.waifu-tool .fui-user').click(function (){
    //loadRandModel();
    if (window.num === 3){
        if (计次 != Nep.length-1){
            //console.log(计次);
            计次=计次+1;
            loadlive2d("live2d", Nep[计次]);
            }else{
                计次 = 1;
                loadlive2d("live2d", Nep[计次]);
                }
        showMessage('我的新衣服好看嘛？', 3000, true);
    }else{
        showMessage('人家没衣服换啦！你要干嘛？', 3000, true);
    }
});

$('.waifu-tool .fui-info-circle').click(function (){
    if (navigator.userAgent.match(/IEMobile|BlackBerry|Android|iPod|iPhone|iPad/i)) {
            //是移动设备
    //showMessage('移动设备暂时不提供目录服务！', 3000, true);
    $(".site-navigation").addClass("active");
    return ;
    }
    $('#sidebar').css("width","250px")
});

$('.waifu-tool .fui-cross').click(function (){
    sessionStorage.setItem('waifu-dsiplay', 'none');
    showMessage('我们还能再见面的吧…', 1300, true);
    window.setTimeout(function() {$('.waifu').hide();}, 1300);
});

$('.waifu-tool .fui-photo').click(function (){
    showMessage('照好了嘛，是不是很可爱呢？', 5000, true);
    window.Live2D.captureName = 'Kesshouban.png';
    window.Live2D.captureFrame = true;
});

$('.closetoc').click(function (){
    $('#sidebar').css("width","0")
});



//水瓶座加上的鼠标路过事件
$('.waifu-tool .fui-home').hover(function (){
    showMessage('我家，你要来看看吗？', 3000, true);
});

$('.waifu-tool .fui-eye').hover(function (){
    //switchNightMode();
    showMessage('随机换一个人！', 3000, true);
});

$('.waifu-tool .fui-chat').hover(function (){
    showMessage('来，讲句话给你听', 3000, true);
});

$('.waifu-tool .fui-user').hover(function (){
    showMessage('换装play', 3000, true);
});

$('.waifu-tool .fui-info-circle').hover(function (){
    showMessage('开启文章目录', 3000, true);
});

$('.waifu-tool .fui-cross').hover(function (){
    showMessage('你想要我走吗？', 3000, true);
});

$('.waifu-tool .fui-photo').hover(function (){
    showMessage('要给我照张相吗？', 3000, true);
});

//-------------------------------------------------------------------

$.ajax({
    cache: true,
    url: "/js/waifu-tips.json",
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(document).on("mouseover", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(document).on("click", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000, true);
            });
        });
        $.each(result.seasons, function (index, tips){
            var now = new Date();
            var after = tips.date.split('-')[0];
            var before = tips.date.split('-')[1] || after;
            
            if((after.split('/')[0] <= now.getMonth()+1 && now.getMonth()+1 <= before.split('/')[0]) && 
               (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({year: now.getFullYear()});
                showMessage(text, 6000, true);
            }
        });
    }
});

(function (){
    var text;
    var referrer = document.createElement('a');
    if(document.referrer !== ''){
        referrer.href = document.referrer;
    }
    
    if(referrer.href !== '' && referrer.hostname != 'imjad.cn'){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'so') {
            text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'google') {
            text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }else {
        if (window.location.href == 'https://yked.gitee.io/') { //如果是主页
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        }else {
            $.getJSON('https://api.imjad.cn/interface/lastactivity/',function(result){
                var now = result.now;
                var lastActivity = result.ts;
                var idle = now - lastActivity;
                
                if(idle >= 60 * 60 * 24 * 30){
                    text = '我家主人已经出门一个月了，可是到现在也没回来，不会是出什么事了吧，好担心啊';
                }else if(idle >= 60 * 60 * 24 * 7){
                    text = '我家主人已经出门一周了，到现在还没回来，你知道他去哪里了吗？';
                }else if(idle >= 60 * 30){
                    text = '我家主人' + formatSeconds(idle) + '前来过，先看看<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>吧，有想法可以在评论里留言哦~';
                }else if(idle >= 60 * 2){
                    text = '真是不巧，我家主人刚才还在，先看看<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>吧，有想法可以在评论里留言哦~';
                }else{
                    text = '太巧了！我家主人正好在家，对<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>有什么想法吗？在评论里留言吧，相信很快就会有回复的说~';
                }
                showMessage(text, 10000);
            });
        }
    }
    showMessage(text, 6000);
})();

window.hitokotoTimer = window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn/',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout, flag){
    if(flag || sessionStorage.getItem('waifu-text') === '' || sessionStorage.getItem('waifu-text') === null){
        if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
        //console.log(text);
        
        if(flag) sessionStorage.setItem('waifu-text', text);
        
        $('.waifu-tips').stop();
        $('.waifu-tips').html(text).fadeTo(200, 1);
        if (timeout === null) timeout = 5000;
        hideMessage(timeout);
    }
}
function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    window.setTimeout(function() {sessionStorage.removeItem('waifu-text')}, timeout);
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}

function loadRandModel(){
    var modelJSON = "//yked.gitee.io/live2d/kesshouban_v2/model.json";
    localStorage.setItem('modelJSON', modelJSON);
    
    loadlive2d("live2d", modelJSON, console.log('live2d','模型加载完成'));
}

function formatSeconds(value) {
    var seconds = parseInt(value);// 秒
    var minutes = 0;
    var hours = 0;
    var days = 0;
    if(seconds > 60) {
        minutes = parseInt(seconds/60);
        seconds = parseInt(seconds%60);
        if(minutes > 60) {
            hours = parseInt(minutes/60);
            minutes = parseInt(minutes%60);
            if(hours > 24) {
                days = parseInt(hours/24);
                hours = parseInt(hours%24);
            }
        }
    }
    var result = "";
    if(minutes > 0)
        result = ""+parseInt(minutes)+"分";
    if(hours > 0 && hours <= 24)
        result = ""+parseInt(hours)+"小时"+result;
    if(days > 0)
        result = ""+parseInt(days)+"天"+result;
    return result;
}
/////
(function() {
    if (!localStorage.getItem('access')) {
        localStorage.setItem('access', new Date().getTime());
    }
    var _access = new Date(parseInt(localStorage.getItem('access')));
    var access = _access.getFullYear() + '年' + (_access.getMonth() + 1) + '月' + _access.getDate() + '日';
    var re = /x/;
    var i = 0;
    if (!localStorage.getItem('hit')) {
        localStorage.setItem('hit', 0);
    } else {
        i = parseInt(localStorage.getItem('hit'));
    }
    console.log(re);
    re.toString = function() {
        localStorage.setItem('hit', ++i);
        return '这是你自 ' + access + ' 以来第 ' + i + ' 次在本站打开控制台';
    };
})(); (function() {
    window.end = performance.now();
    if (window.end > window.start) {
        console.clear();
        console.log('%c      ', 'background: url(\'data:image/svg+xml;utf8,<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#3498db" text-shadow="0 0 1px #3498db" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-1.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#f39c12" text-shadow="0 0 1px #f39c12" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-3s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#e74c3c" text-shadow="0 0 1px #e74c3c" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-4.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#9b59b6" text-shadow="0 0 1px #9b59b6" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-6s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text></g></svg>\') left top no-repeat; font-size: 48px;');
        console.log('%c页面加载完毕消耗了' + Math.round((window.end - window.start) * 100) / 100 + 'ms', 'background: #fff;color: #333;text-shadow: 0 0 2px #eee, 0 0 3px #eee, 0 0 3px #eee, 0 0 2px #eee, 0 0 3px #eee;');
    }
})();
window.onload = function() {
    var now = new Date().getTime();
    var page_load_time = now - performance.timing.navigationStart;
    console.log('%c      ', 'background: url(\'data:image/svg+xml;utf8,<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#3498db" text-shadow="0 0 1px #3498db" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-1.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#f39c12" text-shadow="0 0 1px #f39c12" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-3s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#e74c3c" text-shadow="0 0 1px #e74c3c" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-4.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#9b59b6" text-shadow="0 0 1px #9b59b6" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-6s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text></g></svg>\') left top no-repeat; font-size: 48px;');
    console.log('%c页面加载完毕消耗了' + Math.round(performance.now() * 100) / 100 + 'ms', 'background: #fff;color: #333;text-shadow: 0 0 2px #eee, 0 0 3px #eee, 0 0 3px #eee, 0 0 2px #eee, 0 0 3px #eee;');
};

//console.log("%c 水瓶座博客："+"%c https://yked.gitee.io","")