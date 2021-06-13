// 浏览器标题切换  
var OriginTitile = document.title;    // 保存之前页面标题  
var titleTime;  
document.addEventListener('visibilitychange', function(){  
    if (document.hidden){  
        document.title = '页面崩溃了！(⊙_⊙)';  
        clearTimeout(titleTime);  
    }else{  
        document.title = '又好了！O(∩_∩)O~ ';  
        titleTime = setTimeout(function() {  
            document.title = OriginTitile;  
        }, 2000); // 2秒后恢复原标题  
    }  
});  