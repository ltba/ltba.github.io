// build time:Mon Feb 01 2021 11:45:26 GMT+0800 (GMT+08:00)
String.prototype.render=function(e){var t=/(\\)?\{([^\{\}\\]+)(\\)?\}/g;return this.replace(t,function(t,o,i,n){if(o||n){return t.replace("\\","")}var s=i.replace(/\s/g,"").split(".");var a=e;var r,l,d;for(r=0,l=s.length;r<l;++r){d=s[r];a=a[d];if(a===undefined||a===null)return""}return a})};var re=/x/;console.log(re);re.toString=function(){showMessage("哈哈，你打开了控制台，是想要看看我的秘密吗？",5e3,true);return""};$(document).on("copy",function(){showMessage("你都复制了些什么呀，转载要记得加上出处哦",5e3,true)});$("#hitokoto").mouseover(function(){var e='这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{author}</span> 在 {date} 时投稿的！';var t=JSON.parse($(this)[0].dataset.raw);e=e.render({source:t.source,author:t.author,date:t.date});showMessage(e,3e3)});$(".waifu-tool .fui-home").click(function(){window.location="https://yked.gitee.io/"});$(".waifu-tool .fui-eye").click(function(){change_model();showMessage("你会做眼保健操吗？",3e3,true)});$(".waifu-tool .fui-chat").click(function(){showHitokoto()});var Nep=new Array("/live2d/api/HyperdimensionNeptunia/blanc_classic/index.json","/live2d/api/HyperdimensionNeptunia/blanc_normal/index.json","/live2d/api/HyperdimensionNeptunia/blanc_swimwear/index.json","/live2d/api/HyperdimensionNeptunia/histoire/index.json","/live2d/api/HyperdimensionNeptunia/histoirenohover/index.json","/live2d/api/HyperdimensionNeptunia/nepgear/index.json","/live2d/api/HyperdimensionNeptunia/nepgear_extra/index.json","/live2d/api/HyperdimensionNeptunia/nepgearswim/index.json","/live2d/api/HyperdimensionNeptunia/nepmaid/index.json","/live2d/api/HyperdimensionNeptunia/nepnep/index.json","/live2d/api/HyperdimensionNeptunia/nepswim/index.json","/live2d/api/HyperdimensionNeptunia/neptune_classic/index.json","/live2d/api/HyperdimensionNeptunia/neptune_santa/index.json","/live2d/api/HyperdimensionNeptunia/noir/index.json","/live2d/api/HyperdimensionNeptunia/noir_classic/index.json","/live2d/api/HyperdimensionNeptunia/noir_santa/index.json","/live2d/api/HyperdimensionNeptunia/noireswim/index.json","/live2d/api/HyperdimensionNeptunia/vert_classic/index.json","/live2d/api/HyperdimensionNeptunia/vert_normal/index.json","/live2d/api/HyperdimensionNeptunia/vert_swimwear/index.json");var 计次=1;$(".waifu-tool .fui-user").click(function(){if(window.num===3){if(计次!=Nep.length-1){计次=计次+1;loadlive2d("live2d",Nep[计次])}else{计次=1;loadlive2d("live2d",Nep[计次])}showMessage("我的新衣服好看嘛？",3e3,true)}else{showMessage("人家没衣服换啦！你要干嘛？",3e3,true)}});$(".waifu-tool .fui-info-circle").click(function(){if(navigator.userAgent.match(/IEMobile|BlackBerry|Android|iPod|iPhone|iPad/i)){$(".site-navigation").addClass("active");return}$("#sidebar").css("width","250px")});$(".waifu-tool .fui-cross").click(function(){sessionStorage.setItem("waifu-dsiplay","none");showMessage("我们还能再见面的吧…",1300,true);window.setTimeout(function(){$(".waifu").hide()},1300)});$(".waifu-tool .fui-photo").click(function(){showMessage("照好了嘛，是不是很可爱呢？",5e3,true);window.Live2D.captureName="Kesshouban.png";window.Live2D.captureFrame=true});$(".closetoc").click(function(){$("#sidebar").css("width","0")});$(".waifu-tool .fui-home").hover(function(){showMessage("我家，你要来看看吗？",3e3,true)});$(".waifu-tool .fui-eye").hover(function(){showMessage("随机换一个人！",3e3,true)});$(".waifu-tool .fui-chat").hover(function(){showMessage("来，讲句话给你听",3e3,true)});$(".waifu-tool .fui-user").hover(function(){showMessage("换装play",3e3,true)});$(".waifu-tool .fui-info-circle").hover(function(){showMessage("开启文章目录",3e3,true)});$(".waifu-tool .fui-cross").hover(function(){showMessage("你想要我走吗？",3e3,true)});$(".waifu-tool .fui-photo").hover(function(){showMessage("要给我照张相吗？",3e3,true)});$.ajax({cache:true,url:"/js/waifu-tips.json",dataType:"json",success:function(e){$.each(e.mouseover,function(e,t){$(document).on("mouseover",t.selector,function(){var e=t.text;if(Array.isArray(t.text))e=t.text[Math.floor(Math.random()*t.text.length+1)-1];e=e.render({text:$(this).text()});showMessage(e,3e3)})});$.each(e.click,function(e,t){$(document).on("click",t.selector,function(){var e=t.text;if(Array.isArray(t.text))e=t.text[Math.floor(Math.random()*t.text.length+1)-1];e=e.render({text:$(this).text()});showMessage(e,3e3,true)})});$.each(e.seasons,function(e,t){var o=new Date;var i=t.date.split("-")[0];var n=t.date.split("-")[1]||i;if(i.split("/")[0]<=o.getMonth()+1&&o.getMonth()+1<=n.split("/")[0]&&(i.split("/")[1]<=o.getDate()&&o.getDate()<=n.split("/")[1])){var s=t.text;if(Array.isArray(t.text))s=t.text[Math.floor(Math.random()*t.text.length+1)-1];s=s.render({year:o.getFullYear()});showMessage(s,6e3,true)}})}});(function(){var e;var t=document.createElement("a");if(document.referrer!==""){t.href=document.referrer}if(t.href!==""&&t.hostname!="imjad.cn"){var t=document.createElement("a");t.href=document.referrer;e='Hello! 来自 <span style="color:#0099cc;">'+t.hostname+"</span> 的朋友";var o=t.hostname.split(".")[1];if(o=="baidu"){e='Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+t.search.split("&wd=")[1].split("&")[0]+"</span> 找到的我吗？"}else if(o=="so"){e='Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+t.search.split("&q=")[1].split("&")[0]+"</span> 找到的我吗？"}else if(o=="google"){e='Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>"}}else{if(window.location.href=="https://yked.gitee.io/"){var i=(new Date).getHours();if(i>23||i<=5){e="你是夜猫子呀？这么晚还不睡觉，明天起的来嘛"}else if(i>5&&i<=7){e="早上好！一日之计在于晨，美好的一天就要开始了"}else if(i>7&&i<=11){e="上午好！工作顺利嘛，不要久坐，多起来走动走动哦！"}else if(i>11&&i<=14){e="中午了，工作了一个上午，现在是午餐时间！"}else if(i>14&&i<=17){e="午后很容易犯困呢，今天的运动目标完成了吗？"}else if(i>17&&i<=19){e="傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~"}else if(i>19&&i<=21){e="晚上好，今天过得怎么样？"}else if(i>21&&i<=23){e="已经这么晚了呀，早点休息吧，晚安~"}else{e="嗨~ 快来逗我玩吧！"}}else{$.getJSON("https://api.imjad.cn/interface/lastactivity/",function(t){var o=t.now;var i=t.ts;var n=o-i;if(n>=60*60*24*30){e="我家主人已经出门一个月了，可是到现在也没回来，不会是出什么事了吧，好担心啊"}else if(n>=60*60*24*7){e="我家主人已经出门一周了，到现在还没回来，你知道他去哪里了吗？"}else if(n>=60*30){e="我家主人"+formatSeconds(n)+'前来过，先看看<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>吧，有想法可以在评论里留言哦~"}else if(n>=60*2){e='真是不巧，我家主人刚才还在，先看看<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>吧，有想法可以在评论里留言哦~"}else{e='太巧了！我家主人正好在家，对<span style="color:#0099cc;">『'+document.title.split(" - ")[0]+"』</span>有什么想法吗？在评论里留言吧，相信很快就会有回复的说~"}showMessage(e,1e4)})}}showMessage(e,6e3)})();window.hitokotoTimer=window.setInterval(showHitokoto,3e4);function showHitokoto(){$.getJSON("https://v1.hitokoto.cn/",function(e){showMessage(e.hitokoto,5e3)})}function showMessage(e,t,o){if(o||sessionStorage.getItem("waifu-text")===""||sessionStorage.getItem("waifu-text")===null){if(Array.isArray(e))e=e[Math.floor(Math.random()*e.length+1)-1];if(o)sessionStorage.setItem("waifu-text",e);$(".waifu-tips").stop();$(".waifu-tips").html(e).fadeTo(200,1);if(t===null)t=5e3;hideMessage(t)}}function hideMessage(e){$(".waifu-tips").stop().css("opacity",1);if(e===null)e=5e3;window.setTimeout(function(){sessionStorage.removeItem("waifu-text")},e);$(".waifu-tips").delay(e).fadeTo(200,0)}function loadRandModel(){var e="//yked.gitee.io/live2d/kesshouban_v2/model.json";localStorage.setItem("modelJSON",e);loadlive2d("live2d",e,console.log("live2d","模型加载完成"))}function formatSeconds(e){var t=parseInt(e);var o=0;var i=0;var n=0;if(t>60){o=parseInt(t/60);t=parseInt(t%60);if(o>60){i=parseInt(o/60);o=parseInt(o%60);if(i>24){n=parseInt(i/24);i=parseInt(i%24)}}}var s="";if(o>0)s=""+parseInt(o)+"分";if(i>0&&i<=24)s=""+parseInt(i)+"小时"+s;if(n>0)s=""+parseInt(n)+"天"+s;return s}(function(){if(!localStorage.getItem("access")){localStorage.setItem("access",(new Date).getTime())}var e=new Date(parseInt(localStorage.getItem("access")));var t=e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日";var o=/x/;var i=0;if(!localStorage.getItem("hit")){localStorage.setItem("hit",0)}else{i=parseInt(localStorage.getItem("hit"))}console.log(o);o.toString=function(){localStorage.setItem("hit",++i);return"这是你自 "+t+" 以来第 "+i+" 次在本站打开控制台"}})();(function(){window.end=performance.now();if(window.end>window.start){console.clear();console.log("%c      ",'background: url(\'data:image/svg+xml;utf8,<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#3498db" text-shadow="0 0 1px #3498db" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-1.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#f39c12" text-shadow="0 0 1px #f39c12" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-3s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#e74c3c" text-shadow="0 0 1px #e74c3c" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-4.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#9b59b6" text-shadow="0 0 1px #9b59b6" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-6s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text></g></svg>\') left top no-repeat; font-size: 48px;');console.log("%c页面加载完毕消耗了"+Math.round((window.end-window.start)*100)/100+"ms","background: #fff;color: #333;text-shadow: 0 0 2px #eee, 0 0 3px #eee, 0 0 3px #eee, 0 0 2px #eee, 0 0 3px #eee;")}})();window.onload=function(){var e=(new Date).getTime();var t=e-performance.timing.navigationStart;console.log("%c      ",'background: url(\'data:image/svg+xml;utf8,<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#3498db" text-shadow="0 0 1px #3498db" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-1.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#f39c12" text-shadow="0 0 1px #f39c12" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-3s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#e74c3c" text-shadow="0 0 1px #e74c3c" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-4.5s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text><text font-size="32" text-anchor="middle" x="50%" y="50%" text-transform="uppercase" fill="none" stroke="#9b59b6" text-shadow="0 0 1px #9b59b6" stroke-width="1px" stroke-dasharray="90 310">水瓶座博客<animate attributeName="stroke-dashoffset" begin="-6s" dur="6s" from="0" to="-400" repeatCount="indefinite"/></text></g></svg>\') left top no-repeat; font-size: 48px;');console.log("%c页面加载完毕消耗了"+Math.round(performance.now()*100)/100+"ms","background: #fff;color: #333;text-shadow: 0 0 2px #eee, 0 0 3px #eee, 0 0 3px #eee, 0 0 2px #eee, 0 0 3px #eee;")};
//rebuild by neat 