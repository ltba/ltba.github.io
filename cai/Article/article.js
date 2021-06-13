/*
水瓶座自制
blog：https://yked.gitee.io/cai/
*/
$(document).ready(function(){
    $(".head").html("<a style='color:blue;text-decoration:none;' href='https://yked.gitee.io/cai/'>" + document.title + "</a>");//head
    $(".foot").html("Copyright &#169; <a href='https://yked.gitee.io/cai/'>水瓶座的博客</a>");//foot
    
    //加音乐盒
    $("head").append("<link rel='stylesheet' href='../Music_Box_New/APlayer.min.css'>");
    $("body").append("<script src='../Music_Box_New/APlayer.min.js'></script>");
    $("body").append("<div id='player1'></div>");
    $("body").append("<script src='../Music_Box_New/player.js'></script>");
});