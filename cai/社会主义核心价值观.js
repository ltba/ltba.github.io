//注：必须先引用jQuery
$(document).ready(function($) {   
    $("html,body").click(function(e){   
        var dfs=[ //先来默写一遍社会主义核心价值观
            "富强",  
            "民主",  
            "文明",  
            "和谐",  
            "自由",  
            "平等",  
            "公正",   
            "法治",   
            "爱国",   
            "敬业",   
            "诚信",   
            "友善"
        ];  
        var n=Math.floor(Math.random() * dfs.length + 1)-1;   //随机获取一条数据  
        var $i=$("<p/>").text(dfs[n]);      //新建一个b标签，并显示随机的话语  
        var x=e.pageX,y=e.pageY;            //获取鼠标点击的x，和y  
        $i.css({                            //为标签赋予css值  
            "z-index":99999,   
            "top":y-20,   
            "left":x,   
            "position":"absolute",   
            "color":"#E94F06",  
            "font-family":"微软雅黑",  
            "cursor":"default",  
            "-moz-user-select": "none",  
            "-webkit-user-select": "none",  
            "-ms-user-select": "none",  
            "-khtml-user-select": "none",  
            "user-select": "none",  
        });   
        $("body").append($i);               //在尾部插入  
        $i.animate( {"top":y-180,"opacity":0}, 1500, function(){$i.remove();});     //动画消除  
        e.stopPropagation();  
    });  
});   