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